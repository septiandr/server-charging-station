import { convertKeys } from "./utils/convertKeys";
import { saveToJson, getDataById } from "./utils/saveTofile";
import { Client } from 'node-appwrite';

// Fungsi utama handler untuk serverless Appwrite
export default async function handler({ req, res, log, error }: any) {
    // Mengambil environment variables yang dibutuhkan
    const endpoint = Bun.env.OPEN_CHARGE_MAP_ENDPOINT || process.env.OPEN_CHARGE_MAP_ENDPOINT || '';
    const apiKey = Bun.env.OPEN_CHARGE_MAP_X_API_KEY || process.env.OPEN_CHARGE_MAP_X_API_KEY || '';

    if (!endpoint || !apiKey) {
        return res.json({ message: 'Missing API endpoint or key', code: 500 });
    }

    try {
        // Mengambil data dari API Open Charge Map
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json',
            },
        });

        // Memproses data yang diterima
        const data = await response.json();
        const filteredData = convertKeys(data);
        const mappedData = filteredData.map((item: any) => ({
            uuid: item.uuid,
            usageCost: item.usagecost,
            addressInfo: item.addressinfo,
            connections: item.connections,
        }));

        // Menyimpan data ke file JSON (atau bisa juga ke Appwrite Database)
        saveToJson(mappedData);

        // Mengirim respon sukses
        return res.json({
            message: 'Success get charging station list',
            code: 200,
            data: mappedData,
        });
    } catch (err: any) {
        // Mengirim respon kesalahan
        error(`Error fetching charging station list: ${err.message}`);
        return res.json({ message: 'Failed to get charging station list', code: 400, error: err.message });
    }
}
