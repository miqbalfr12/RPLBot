const { getDestinasi, getKuliner } = require("../models/cmdModel");

module.exports = (client) => {
    getDestinasi((data) => {
        Object.keys(data).map((key) => {
            client.dbcmd.set((data[key].nama),{
                nama : data[key].nama,
                deskripsi : data[key].deskripsi,
                lokasi : data[key].lokasi,
                oprasional : data[key].oprasional,
                harga : data[key].harga,
                gambar : data[key].gambar,
                koordinat : data[key].koordinat,
            })
        })
        console.log("\x1b[33m[Whatsapp]\x1b[0m Commands Firebase available : ", client.dbcmd)
    })
    getKuliner((data) => {
        Object.keys(data).map((key) => {
            client.dbcmd.set((data[key].nama),{
                nama : data[key].nama,
                deskripsi : data[key].deskripsi,
                lokasi : data[key].lokasi,
                oprasional : data[key].oprasional,
                harga : data[key].harga,
                gambar : data[key].gambar,
                koordinat : data[key].koordinat,
            })
        })
        console.log("\x1b[33m[Whatsapp]\x1b[0m Commands Firebase available : ", client.dbcmd)
    })
};