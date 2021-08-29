const config = require("../config.json");
const array = [];

module.exports = {
    event: "guildMemberAdd",
    once: false,

    async run(member, server) {
        let welcomeRole = member.guild.roles.cache.find(role => role.name === "➔ | User");
        member.roles.add(welcomeRole)
        member.guild.channels.cache.get("Token").setName("Member: " + member.guild.memberCount)
    }
}