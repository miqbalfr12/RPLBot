const { List } = require('whatsapp-web.js');

module.exports = {
    name: "kuliner",
    aliases: [],
    description: "Menampilkan List wisata kuliner",
    timeout: 5000,
    category: "info",
    run: async(client, message) => {
        let list = new List(
            "Silahkan pilih untuk keterangan lebih lanjut",
            "Lihat wisata kuliner",
            [
                {
                    title: "Kec. Tarogong Kidul",
                    rows: [
                        { id: "Eatboss", title: "Eatboss" }
                    ],
                },
                {
                    title: "Kec. Tarogong Kaler",
                    rows: [
                        { id: "Rumah Makan Khas Sunda Cibiuk", title: "Rumah Makan Khas Sunda Cibiuk" },
                        { id: "Seputih Coffee and Resto", title: "Seputih Coffee and Resto" }
                    ],
                },
                {
                    title: "Kec. Garut Kota",
                    rows: [
                        { id: "Kampung Muara Sunda", title: "Kampung Muara Sunda" },
                        { id: "RM Saung Cikenceh Cikuray", title: "RM Saung Cikenceh Cikuray" }
                    ],
                },
            ],
            "Menampilkan List wisata kuliner di daerah Garut"
        )
        message.reply(list)
    }
}