const ticketFunctions = require('../functions/ticketFunctions.js');
const config = require('../config.json')

module.exports = {
    name: 'close',

    execute: async function (message, args, Discord, client) {
        if (message.channel.parentID === config.ticketCategories.allgemein ||
            message.channel.parentID === config.ticketCategories.entbannung ||
            message.channel.parentID === config.ticketCategories.fraktion ||
            message.channel.parentID === config.ticketCategories.spenden ||
            message.channel.parentID === config.ticketCategories.team ||
            message.channel.parentID === config.ticketCategories.community ||
            message.channel.parentID === config.ticketCategories.rueckerstattung) {

            await new ticketFunctions().closeTicket(message.channel.id, message, message.author.tag);
            await message.delete();
        }
    }
}