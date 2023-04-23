module.exports = {
    name: "thanks",
    aliases: [],
    description: "Reply thanks",
    timeout: 5000,
    category: "info",
    run: async(client, message) => {
        message.reply('Your welcome :)')
    }
}