import { convertKeys } from "../utils/convertKeys.ts";
import { Elysia } from 'elysia';
import { saveToJson, getDataById } from "../utils/saveTofile.ts";

const getChargingStation = (app: Elysia) => {
    app.get('/list-charging-station', async () => {
        try {
            const endpoint = Bun.env.OPEN_CHARGE_MAP_ENDPOINT || process.env.OPEN_CHARGE_MAP_ENDPOINT || '';
            const apiKey = Bun.env.OPEN_CHARGE_MAP_X_API_KEY || process.env.OPEN_CHARGE_MAP_X_API_KEY || '';

            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'x-api-key': apiKey,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            const filteredData = convertKeys(data);
            const mappedData = filteredData.map((item: any) => ({
                uuid: item.uuid,
                usageCost: item.usagecost,
                addressInfo: item.addressinfo,
                connections: item.connections,
            }));

            saveToJson(mappedData)

            return { message: 'Success get charging station list', code: 200, data: mappedData };
        } catch (error: any) {
            return { message: 'Failed get charging station list', code: 400, error: error.message };
        }
    });
};

export default getChargingStation;
