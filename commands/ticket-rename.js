const ticketFunctions = require('../functions/ticketFunctions.js')
const array = [];

module.exports = {
    name: 'rename',

    execute: async function (message, args, Discord, client) {
        const config = require("../config.json");
        if (message.channel.parentID === config.ticketCategories.allgemein ||
            message.channel.parentID === config.ticketCategories.entbannung ||
            message.channel.parentID === config.ticketCategories.fraktion ||
            message.channel.parentID === config.ticketCategories.spenden ||
            message.channel.parentID === config.ticketCategories.team ||
            message.channel.parentID === config.ticketCategories.community ||
            message.channel.parentID === config.ticketCategories.rueckerstattung) {

            if (args.length !== 0) {
                if (!array.includes(message.channel)) {
                    let name = "";
                    for (let i = 0; i < args.length; i++) {
                        name += args[i] + "-";
                    }

                    array.push(message.channel);

                    setTimeout(() => {
                        array.splice(array.indexOf(message.channel), 1);
                    }, 300000)

                    await new ticketFunctions().renameTicket(message, message.author.tag, name);
                } else {
                    await message.channel.send({
                        embed: {
                            "title": "GTA Roleplay - Ticket System",
                            "description": "Please wait 5 minutes after a channel rename, otherwise errors could occur!",

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
            } else {
                await message.channel.send({
                    embed: {
                        "title": "GTA Roleplay - Ticket System",
                        "description": "Please use `" + config.prefix + "rename NAME` to rename the channel!",

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
    }
}