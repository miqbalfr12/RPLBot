const { List } = require('whatsapp-web.js');

module.exports = {
    name: "belanja",
    aliases: [],
    description: "Menampilkan List wisata belanja",
    timeout: 5000,
    category: "info",
    run: async(client, message) => {
        let list = new List(
            "Silahkan pilih untuk keterangan lebih lanjut",
            "Lihat wisata belanja",
            [
                {
                    title: "Kec. 1",
                    rows: [
                        { id: "Wisata 1", title: "Wisata 1" }
                    ],
                },
                {
                    title: "Kec. 2",
                    rows: [
                        { id: "Wisata 1", title: "Wisata 1" }
                    ],
                },
            ],
            "Menampilkan List wisata belanja di daerah Garut"
        )
        message.reply(list)
    }
}