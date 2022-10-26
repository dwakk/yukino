const client = require('..');

client.on("guildMemberAdd", async (member) => {
    let guildData = await client.database.fetchGuild(member.guild.id);
    let data = {};
    data.guild = guildData;
    if (data.guild.addons.welcome.enabled === true) {
        let channel = client.channels.cache.get(data.guild.addons.welcome.channel);
        if (!channel) return;
        let message = data.guild.addons.welcome.message
        if (message.includes("<member>")) {
            message = message.replace("<member>", `<@${member.id}>`);
        }
        if (message.includes("<server>")) {
            message = message.replace("<server>", `${member.guild.name}`);
        }
        return channel.send(message);
    }
});