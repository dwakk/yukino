const { ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = {
	name: "botinfo",
	description: "Get informations about Yukino",
    fr: "Envoie des informations sur Yukino",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	run: async (client, interaction, data) => {
        if (data.guild.language === "fr") {
            const embed = new EmbedBuilder()
            .setAuthor({ iconURL: client.user.displayAvatarURL(), name: client.user.tag})
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: "Développeur", value: `<@790726156222857246>`, inline: true},
                { name: "Ping", value: `\`${Math.round(client.ws.ping)}ms\``, inline: true},
                { name: "Dernier redémarage", value: `<t:${Math.floor(client.readyTimestamp/1000)}:R>`, inline: true},
                { name: "Serveurs", value: `\`${client.guilds.cache.size}\``, inline: true},
                { name: "Utilisateurs", value: `\`${client.users.cache.size}\``, inline: true},
                { name: "Salons", value: `\`${client.channels.cache.size}\`` , inline: true}
            )
            .setColor("Aqua")
            .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
            .setTimestamp();
            return interaction.reply({ embeds: [embed]});
        } else {
            const embed = new EmbedBuilder()
            .setAuthor({ iconURL: client.user.displayAvatarURL(), name: client.user.tag})
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: "Developper", value: `<@790726156222857246>`, inline: true},
                { name: "Ping", value: `\`${Math.round(client.ws.ping)}ms\``, inline: true},
                { name: "Uptime", value: `<t:${Math.floor(client.readyTimestamp/1000)}:R>`, inline: true},
                { name: "Servers", value: `\`${client.guilds.cache.size}\``, inline: true},
                { name: "Users", value: `\`${client.users.cache.size}\``, inline: true},
                { name: "Channels", value: `\`${client.channels.cache.size}\`` , inline: true}
            )
            .setColor("Aqua")
            .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
            .setTimestamp();
            return interaction.reply({ embeds: [embed]});
        };
	}
};