const { ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = {
	name: "ping",
	description: "Get Yukino's ping",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	run: async (client, interaction, data) => {
		if (data.guild.language === "en") {
			const embed = new EmbedBuilder()
            .setTitle('Ping')
			.setDescription(`🏓 Pong! Latency: **${Math.round(client.ws.ping)} ms**`)
			.setColor("Aqua")
			.setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
			.setTimestamp();
			return interaction.reply({embeds: [embed]});
		} else {
			const embed = new EmbedBuilder()
            .setTitle('Ping')
			.setDescription(`🏓 Pong! Latence: **${Math.round(client.ws.ping)} ms**`)
			.setColor("Aqua")
			.setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
			.setTimestamp();
			return interaction.reply({embeds: [embed]});
		};
	}
};