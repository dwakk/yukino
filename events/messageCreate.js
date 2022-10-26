const { EmbedBuilder, ComponentType, InteractionCollector, PermissionsBitField  } = require('discord.js');
const client = require('..');

client.on("messageCreate", async (message) => {

    if (message.channel.isDMBased()) return;
    if (!message) return;
    if (!message.member) return;
    if (message.member.id === client.application.id) return;

    member = await message.member.fetch();
    if (member.permissions.has(PermissionsBitField.Flags.Administrator)) return;
    
    const guildData = await client.database.fetchGuild(message.guildId);
    let data = {};
    data.guild = guildData;

    if ((data.guild.whitelist).includes(message.member.id)) return;
    if (!message.deletable) return;
    if (data.guild.addons.antilink.enabled === true) {
        if (message.content.includes("discord.gg")) {
            const embed = new EmbedBuilder()
            .setColor("Red");
            if (data.guild.language === "fr") {
                embed.setDescription(`💢  - <@${message.member.id}>, vous devez être whitelist pour envoyer des liens d'invitation`);
            } else {
                embed.setDescription(`💢 - <@${message.member.id}>, you must be whitelisted to send invitation links`);
            }
            message.delete().then(
                message.channel.send({embeds: [embed]})
            );
        };
    };
    if (data.guild.addons.wordfilter.enabled === true) {
        if ((data.guild.addons.wordfilter.words).includes(message.content.toLowerCase())) {
            const embed = new EmbedBuilder()
            .setColor("Red")
            if (data.guild.language === "fr") {
                embed.setDescription(`💢  - <@${message.author.id}>, vous utilisez des mots interdits`);
            } else {
                embed.setDescription(`💢 - <@${message.author.id}>, you are using forbidden words`);
            }
            message.delete().then(
                message.channel.send({embeds: [embed]})
            );
        };
    };
});