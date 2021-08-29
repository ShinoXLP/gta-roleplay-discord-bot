module.exports = {
    name: 'ticket',

    execute: async function (message, args, Discord, client) {
        const config = require("../config.json");

        if (args.length === 0) {
            if (message.member.hasPermission("ADMINISTRATOR") || message.member.id === "Token") {
                await message.channel.send({
                    embed: {
                        "title": "Reagiere mit ...",
                        "description": config.ticketReasons.allgemein + " to create a ticket for a general concern.\n" +
                            config.ticketReasons.entbannung + " to create a ticket for an unbanning issue.\n" +
                            config.ticketReasons.fraktion + " to create a ticket for a parliamentary group issue.\n" +
                            config.ticketReasons.spenden + " to create a ticket for a donation request.\n" +
                            config.ticketReasons.team + " to create a ticket for a team issue.\n" +
                            config.ticketReasons.community + " to create a ticket for a community issue.\n" +
                            config.ticketReasons.rueckerstattung + " to create a ticket for a refund request.\n",

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
                }).then(message => {
                    message.react(config.ticketReasons.allgemein);
                    message.react(config.ticketReasons.entbannung);
                    message.react(config.ticketReasons.fraktion);
                    message.react(config.ticketReasons.spenden);
                    message.react(config.ticketReasons.team);
                    message.react(config.ticketReasons.community);
                    message.react(config.ticketReasons.rueckerstattung);
                });
                message.delete();
            }
        }
    }
}