const Discord = require('discord.js');
const config = require("../config.json");

module.exports = class logFunctions {
    async sendLog(webhook, description) {
        const webhookIds = webhook.split('/');
        const webhookClient = new Discord.WebhookClient(webhookIds[0], webhookIds[1]);

        await webhookClient.send({
            embeds: [{
                "title": "GTA Roleplay - Logs",
                "description": description,

                "color": config.embeds.body.color,
                "author": {
                    "name": config.embeds.author.name,
                    "url": config.embeds.author.url,
                    "icon_url": config.embeds.author.icon
                },
                "timestamp": Date.now(),
            }]
        })
    }
}