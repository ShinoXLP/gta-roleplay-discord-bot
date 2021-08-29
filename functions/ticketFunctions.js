const array = [];
const config = require("../config.json");
const logFunctions = require("../functions/logFunctions.js");

module.exports = class ticketFunctions {
    async closeTicket(id, message, authorTag) {
        if (!array.includes(id)) {
            array.push(id);
            await new logFunctions().sendLog(config.oxince.logs.ticketclosed, "`" + authorTag + "` has the ticket `" + message.channel.name + "` closed!")
            await message.channel.send({
                embed: {
                    "title": "GTA Roleplay - Ticket System",
                    "description": "This ticket was bought by `" + authorTag + "` closed and will be deleted in 5 seconds!",

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

            setTimeout(() => {
                message.channel.delete();
                array.splice(array.indexOf(id), 1);
            }, 5000)
        }
    }

    async renameTicket(message, authorTag, name) {
        await message.channel.setName(name);
        await new logFunctions().sendLog(config.oxince.logs.ticketrenaming, "`" + authorTag + "` has a ticket to `" + name + "` renamed!")
        await message.channel.send({
            embed: {
                "title": "GTA Roleplay - Ticket System",
                "description": "This ticket was bought by `" + authorTag + "` to `" + name + "` renamed!",

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
    }
}