const config = require('../config.json')
const moderationFunctions = require('../functions/moderationFunctions.js')

module.exports = {
    name: 'ban',

    execute: async function (message, args, Discord, client) {
        if (message.member.hasPermission("BAN_MEMBERS")) {
            if (args.length === 0) {
                await message.channel.send({
                    embed: {
                        "title": "GTA Roleplay - Moderation",
                        "description": "Please use `" + config.prefix + "ban user` to ban a user!",

                        "color": config.embeds.body.color,
                        "author": {
                            "name": config.embeds.author.name,
                            "url": config.embeds.author.url,
                            "icon_url": config.embeds.author.icon
                        },
                        "footer": {
                            "text": config.embeds.footer.text,
                            "icon_url": config.embeds.footer.icon
                        },
                        "timestamp": Date.now(),
                        "thumbnail": {
                            "url": config.embeds.body.thumbnail
                        }
                    }
                })
            } else {
                if (message.mentions.members.first()) {
                    await new moderationFunctions().banUser(message.member, message.mentions.members.first(), message.channel)
                }
            }
        }
    }
}