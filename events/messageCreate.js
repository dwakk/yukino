const { EmbedBuilder } = require('discord.js');
const client = require('..');

client.on("messageCreate", async (message) => {
    if (message.author.id === client.application.id) return;
    if (message.member.permissions.has("Administrator")) return;
    if (!message.content.includes("discord.gg")) return;
    let guildData = await client.database.fetchGuild(message.guildId);
    let data = {};
    data.guild = guildData;
    if (data.guild.addons.antilink.enabled === true) {
        const ch = message.channel;
        if (!message.deletable) return;
        if ((data.guild.whitelist).includes(message.author.id)) return;
        const embed = new EmbedBuilder()
        .setColor("Red");
        if (data.guild.language === "fr") {
            embed.setDescription(`:x:  - <@${message.author.id}>, vous devez être whitelist pour envoyer des liens d'invitation`);
        } else {
            embed.setDescription(`:x: - <@${message.author.id}>, you must be whitelisted to send invitation links`);
        }
        message.delete().then(
            ch.send({embeds: [embed]})
        );
    };
});