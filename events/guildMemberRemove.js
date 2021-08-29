const config = require("../config.json");

module.exports = {
    event: "guildMemberRemove",
    once: false,

    async run(member, server) {
        member.guild.channels.cache.get("Token").setName("Member: " + member.guild.memberCount)
    }
}