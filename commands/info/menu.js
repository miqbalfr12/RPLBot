const { Buttons } = require('whatsapp-web.js');
const { pnf2 } = require("../../helper/formatter");

module.exports = {
    name: "menu",
    aliases: [],
    description: "Menampilkan Menu utama",
    timeout: 5000,
    category: "info",
    run: async(client, message) => {
        let nama = client.data_akun.has(pnf2(message.from)) ? ` ${client.data_akun.get(pnf2(message.from)).nama}` : ` ${message._data.notifyName}`;
        let buttonwk = new Buttons(
            'Rancang Bangun Sistem Informasi Pariwisata Kabupaten Garut Berbasis WhatsApp Bot Dengan Menggunakan Metode Prototyping\n\n2106184 - Muhammad Iqbal Fathur Rohman\n2106071 - Sayyid Faruk Romdoni\n2106177 - Revina Zulianti Pratiwi\n2106013 - Jalaludin Malik\n\nklick/ketik "info" untuk layanan lebih lanjut.',
            [
                { body: 'Info' },
                { body: 'Pariwisata' },
                { body: 'Thanks' }
            ],
                `Hi${nama}!`,
                'RPL Bot Kelompok 1!'
            );
        message.reply(buttonwk);
        client.mode.set(message.from, {'first': 'done'})
    }
}