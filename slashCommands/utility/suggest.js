const { ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = {
	name: "suggest",
	description: "Send a suggestion to the staff team",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            name: "suggestion",
            description: "Suggestion you want to send",
            type: 3,
            required: true,
        },
    ],
	run: async (client, interaction, data) => {
        let s = interaction.options.getString('suggestion');
        if (data.guild.addons.suggestions.enabled === false) {
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setDescription("💢 - Le système de suggestions est désactivé sur ce serveur")
                .setColor("Red");
                return interaction.reply({embeds: [embed], ephemeral: true});
            } else {
                const embed = new EmbedBuilder()
                .setDescription("💢 - Suggestions are disabled on this server")
                .setColor("Red");
                return interaction.reply({embeds: [embed], ephemeral: true});
            };
        };
        let channel = data.guild.addons.suggestions.channel;
        channel = interaction.guild.channels.cache.get(`${channel}`);
        const embed = new EmbedBuilder()
        .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
        .setDescription(s)
        .setColor("Aqua")
        .setFooter({iconURL: interaction.guild.iconURL(), text: interaction.guild.name})
        channel.send({embeds: [embed]})
        if (data.guild.language === "fr") {
            const embed = new EmbedBuilder()
            .setDescription("✅ - Suggestion envoyée")
            .setColor("Green");
            return interaction.reply({embeds: [embed], ephemeral: true});
        } else {
            const embed = new EmbedBuilder()
            .setDescription("✅ - Suggestion sent")
            .setColor("Green");
            return interaction.reply({embeds: [embed], ephemeral: true});
        };
	}
};