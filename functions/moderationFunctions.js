const Discord = require('discord.js');
const config = require("../config.json");
const logFunctions = require("../functions/logFunctions.js")

module.exports = class moderationFunctions {
    async kickUser(user, target, channel) {
        if (user.hasPermission("KICK_MEMBERS")) {
            await new logFunctions().sendLog(config.oxince.logs.kick, ":warning: " + target.username + " was made by " + user.username + " banned !")
            target.kick().then((member) => {
                channel.send({
                    embed: {
                        "title": "GTA Roleplay - Moderation",
                        "description": ":warning: <@" + member.id + "> was made by <@" + user.id + "> kicked!",

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
                            "url": "https://i.imgur.com/QXT4S0K.png"
                        }
                    }
                })
            }).catch(() => {
                channel.send("I don't have kick rights!");
            });
        }
    }

    async banUser(user, target, channel) {
        if (user.hasPermission("BAN_MEMBERS")) {
            await new logFunctions().sendLog(config.oxince.logs.ban, ":warning: " + target.username + " was made by " + user.username + " banned !")
            target.ban().then((member) => {
                channel.send({
                    embed: {
                        "title": "GTA Roleplay - Moderation",
                        "description": ":warning: <@" + member.id + "> was made by <@" + user.id + "> banned !",

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
                            "url": "https://i.imgur.com/QXT4S0K.png"
                        }
                    }
                })
            }).catch(() => {
                channel.send("I don't have kick rights!");
            });
        }
    }
}