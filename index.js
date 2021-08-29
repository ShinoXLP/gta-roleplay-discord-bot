process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err);
});

const Discord = require('discord.js');

const fs = require('fs');

const logFunctions = require('./functions/logFunctions.js');

const config = require('./config.json');
const client = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    console.log(file + " has been successfully loaded!");
    client.commands.set(command.name, command);
}

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const eventFunction = require(`./events/${file}`);
        if (eventFunction.disabled) return;

        const event = eventFunction.event || file.split('.')[0];
        const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client;
        const once = eventFunction.once;

        try {
            emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(...args));
            console.log(file + " successfully loaded!");
        } catch (error) {
            console.error(error.stack);
        }
    });
});

client.on('ready', () => {
    new logFunctions().sendLog(config.oxince.logs.start, "Bot started!")
    client.user.setUsername("[GTA-Roleplay] System")

    if (config.activity.type !== "STREAMING") {
        client.user.setActivity({
            type: config.activity.type,
            name: config.activity.name
        })
    } else {
        client.user.setActivity({
            type: config.activity.type,
            name: config.activity.name,
            url: config.activity.streamURL
        })

    }
})

client.on('message', message => {
    if (message.author.bot) return;

    if (message.channel.id === "Token" && !message.content.startsWith("!")) {
        message.channel.send("@everyone", {
            embed: {
                "title": "GTA Roleplay - Informationen",
                "description": message.content,

                "color": config.embeds.body.color,
                "author": {
                    "name": config.embeds.author.name,
                    "url": config.embeds.author.url,
                    "icon_url": config.embeds.author.icon
                },
                "footer": {
                    "text": "Sent by " + message.author.tag,
                    "icon_url": config.embeds.footer.icon
                },
                "timestamp": Date.now(),
                "thumbnail": {
                    "url": config.embeds.body.thumbnail
                }
            }
        })

        message.delete()
    }

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!message.content.startsWith(config.prefix)) return;

    if (command === 'ticket') {
        client.commands.get('ticket').execute(message, args, Discord, client);
        sendCommandLog(message.author, message.content);
    }

    if (command === 'close') {
        client.commands.get('close').execute(message, args, Discord, client);
        sendCommandLog(message.author, message.content);
    }

    if (command === 'delete') {
        client.commands.get('close').execute(message, args, Discord, client);
        sendCommandLog(message.author, message.content);
    }

    if (command === 'rename') {
        client.commands.get('rename').execute(message, args, Discord, client);
        sendCommandLog(message.author, message.content);
    }

    if (command === 'purge') {
        client.commands.get('purge').execute(message, args, Discord, client);
        sendCommandLog(message.author, message.content);
    }

    if (command === 'kick') {
        client.commands.get('kick').execute(message, args, Discord, client);
        sendCommandLog(message.author, message.content);
    }

    if (command === 'ban') {
        client.commands.get('ban').execute(message, args, Discord, client);
        sendCommandLog(message.author, message.content);
    }

    if (command === 'add') {
        client.commands.get('add').execute(message, args, Discord, client);
        sendCommandLog(message.author, message.content);
    }
})

function sendCommandLog(user, command) {
    new logFunctions().sendLog(config.oxince.logs.commands, "`" + user.tag + "` led the command `" + command + "` the end!")
}

client.login(config.token);