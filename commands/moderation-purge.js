const config = require('../config.json')

module.exports = {
    name: 'purge',

    execute: async function (message, args, Discord, client) {
        if (message.member.hasPermission("MANAGE_MESSAGES") || message.member.id === "Token") {
            if (args.length === 0) {
                message.delete()
            } else {
                await message.channel.bulkDelete(args[0])
            }
        }
    }
}