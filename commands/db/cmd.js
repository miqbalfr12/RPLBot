const getDestinasi = require("../../models/cmdModel")

module.exports = {
    name: "cmd",
    aliases: [],
    description: "Menampilkan seluruh CMD",
    timeout: 5000,
    category: "info",
    run: async(client, message) => {
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
        message.reply(`*Berikut kumpulan CMD RPL Bot Kelompok 1*\n\n*Commands* ${JSON.stringify(Object.fromEntries(client.commands), null, 4)}\n\n*Firebase Commands* ${JSON.stringify(Object.fromEntries(client.dbcmd), null, 4)}`)
    }
}