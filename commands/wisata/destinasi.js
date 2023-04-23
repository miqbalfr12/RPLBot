const { List } = require('whatsapp-web.js');

module.exports = {
    name: "destinasi",
    aliases: [],
    description: "Menampilkan List wisata destinasi",
    timeout: 5000,
    category: "info",
    run: async(client, message) => {
        let list = new List(
            "Silahkan pilih untuk keterangan lebih lanjut",
            "Lihat wisata destinasi",
            [
                {
                    title: "Kec. Cisurupan",
                    rows: [
                        { id: "Papandayan Camping Ground", title: "Papandayan Camping Ground" }
                    ],
                },
                {
                    title: "Kec. Leles",
                    rows: [
                        { id: "Candi Cangkuang", title: "Candi Cangkuang" }
                    ],
                },
                {
                    title: "Kec. Pasarwangi",
                    rows: [
                        { id: "Darajat Pass", title: "Darajat Pass" },
                        { id: "Sinar Alam Darajat", title: "Sinar Alam Darajat" }
                    ],
                },
                {
                    title: "Kec. Tarogong Kaler",
                    rows: [
                        { id: "Sabda Alam Water Park", title: "Sabda Alam Water Park" }
                    ],
                },
                {
                    title: "Kec. Tarogong Kaler",
                    rows: [
                        { id: "Sabda Alam Water Park", title: "Sabda Alam Water Park" }
                    ],
                },
            ],
            "Menampilkan List wisata destinasi di daerah Garut"
        )
        message.reply(list)
    }
}