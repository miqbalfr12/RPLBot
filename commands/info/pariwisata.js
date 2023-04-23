const { Buttons } = require('whatsapp-web.js');

module.exports = {
    name: "pariwisata",
    aliases: [],
    description: "Menampilkan List Pariwisata",
    timeout: 5000,
    category: "info",
    run: async(client, message) => {
        let buttonwk = new Buttons(
            'Silahkan pilih jenis wisata yang akan anda cari.',
            [
                { body: 'Destinasi' },
                { body: 'Kuliner' },
                { body: 'Belanja' }
            ],
                `Menampilkan jenis wisata yang ada di garut`,
                'RPL Bot Kelompok 1!'
            );
        message.reply(buttonwk);
    }
}