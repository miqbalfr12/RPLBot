const { Buttons, MessageMedia } = require('whatsapp-web.js');
const mime = require('mime-types');
const { pnf2 } = require('../helper/formatter');
const fs = require("fs");
const Timeout = new Map();

const logging = (nama, log) => {
    if (!fs.existsSync(`./chats`)) fs.mkdirSync(`./chats`)
    if (!fs.existsSync(`./chats/${nama}.txt`)){fs.writeFile(`./chats/${nama}.txt`, nama, (err)=>{if (err) console.log(err)})}
    fs.appendFile(`./chats/${nama}.txt`, `\n${log}`, (err)=>{if (err) console.log(err)});
}

module.exports = (client) => {
    client.on("message", async message => {
        
        if (message.from === 'status@broadcast') return

        const today = new Date().toLocaleString();
        const msg = message.body;
        const args = msg.split(/ +/g);
        const cmd = args.shift().toLowerCase();
        const fromGroup = message.from.includes("@g.us");
        const chat = fromGroup ? (await client.getChats()).find(chat => chat.id._serialized === message.from) : null;
        const identity = fromGroup ? `[Group ${chat.name}][${message._data.notifyName}][${message.author}]` : `[Personal Chat][${message._data.notifyName}][${message.from}]`;
        const log = `[${today}]${identity} ${message.body} `;
        logging(fromGroup ? chat.name : message._data.notifyName, log);
        console.log('\x1b[33m[Whatsapp Chat-log]\x1b[0m', log);

        if(message.hasMedia){
            message.downloadMedia().then(media => {
                if (media) {
                    const mediaPath = './download/';
                    if (!fs.existsSync(mediaPath)) {
                        fs.mkdirSync(mediaPath);
                    }
                    const extension = mime.extension(media.mimetype);
                    const timestamp = new Date().getTime();
                    let nama = fromGroup ? chat.name : message._data.notifyName;
                    let medfile = media.filename ? nama + '_' + media.filename : nama + '.' + extension;
                    const fullFilename = mediaPath + timestamp + '_' + medfile;
                    // Save to file
                    try {
                        fs.writeFileSync(fullFilename, media.data, { encoding: 'base64' });
                        console.log('File downloaded successfully!', fullFilename);
                    } catch (err) {
                        console.log('Failed to save the file:', err);
                    }
                }
            });
        }

        console.log(client.mode)
        const command = client.commands.get(cmd) || client.aliases.get(cmd);
        const feature = client.features.get(client.mode.get(message.from)?.mode);
        const dbcmd = client.dbcmd.get(msg)
        console.log(command || feature)

        const answer = (pull) => {
            const key = identity + pull.name;
            if(pull.timeout && Timeout.get(key)){
                return message.reply(`*${message._data.notifyName}*! Please wait ${pull.name} cooldown!`);
            } else {
                pull.run(client, message, args);
                if(pull.timeout){
                    Timeout.set(key, Date.now());
                    setTimeout(() => {
                        Timeout.delete(key);
                    }, pull.timeout);
                }
            }
        }

        if(feature) answer(feature);
        else if(command) answer(command);
        else if(dbcmd) {
            if (dbcmd.gambar){
                let media = await MessageMedia.fromUrl(`${dbcmd.gambar}`);
                client.sendMessage(message.from, media, {caption : `*${dbcmd.nama}*\n${dbcmd.deskripsi}\n\n🕓 : ${dbcmd.oprasional}\n\n💵 : ${dbcmd.harga}\n\n📍 : ${dbcmd.lokasi}\n\n${dbcmd.koordinat}`})
            } else {
                message.reply(`*${dbcmd.nama}*\n${dbcmd.deskripsi}\n\n🕓 : ${dbcmd.oprasional}\n\n💵 : ${dbcmd.harga}\n\n📍 : ${dbcmd.lokasi}\n\n${dbcmd.koordinat}`)
            }
        } else {
            if (fromGroup || client.ignore.includes(cmd) || client.mode.has(message.from)) return;
            let nama = client.data_akun.has(pnf2(message.from)) ? ` ${client.data_akun.get(pnf2(message.from)).nama}` : ` ${message._data.notifyName}`;
            let buttonwk = new Buttons(
                'Rancang Bangun Sistem Informasi Pariwisata Kabupaten Garut Berbasis WhatsApp Bot Dengan Menggunakan Metode Prototyping\n\n2106184 - Muhammad Iqbal Fathur Rohman\n2106071 - Sayyid Faruk Romdoni\n2106177 - Revina Zulianti Pratiwi\n2106013 - Jalaludin Malik\n\nklick/ketik "help" untuk layanan lebih lanjut.',
                [
                    { body: 'Help' },
                    { body: 'Pariwisata' },
                    { body: 'Thanks' }
                ],
                    `Hi${nama}!`,
                    'RPL Bot Kelompok 1!'
                );
            message.reply(buttonwk)
            client.mode.set(message.from, {'first': 'done'})
        }
    });
}