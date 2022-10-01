const { ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = {
	name: "ping",
	description: "Donne le ping du bot",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	run: async (client, interaction) => {
		const embed = new EmbedBuilder()
            .setTitle('Ping')
			.setDescription(`🏓 Pong! Latence: **${Math.round(client.ws.ping)} ms**`)
		return interaction.reply({embeds: [embed]})
	}
};