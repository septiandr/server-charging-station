const fs = require('fs-extra');

export const saveToJson = (data : any) => {
  const filePath = 'stations.json';

  // Hapus file terlebih dahulu jika ada
  fs.remove(filePath)
    .then(() => {
      // Setelah file dihapus, simpan data baru ke dalam file JSON
      return fs.writeJson(filePath, data);
    })
    .then(() => {
      console.log('File lama dihapus, data baru berhasil disimpan ke stations.json');
    })
    .catch((err: any) => {
      console.error('Error saat menghapus atau menyimpan file:', err);
    });
};


export const getDataById = async (id : string) => {
    try {
      // Baca data dari file JSON
      const data = await fs.readJson('stations.json');
      console.log("🚀 ~ getDataById ~ data:", data)
  
      // Filter data berdasarkan id
      const result = data.find(item => item.uuid === id);
      console.log("🚀 ~ getDataById ~ result:", result)
  
      return result;
    } catch (err) {
      console.error('Error saat membaca file:', err);
      return null;
    }
  };

export const getData = async () => {
    try {
      // Baca data dari file JSON
      const data = await fs.readJson('stations.json');
    
      return data;
    } catch (err) {
      console.error('Error saat membaca file:', err);
      return null;
    }
  };
  