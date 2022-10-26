const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');

module.exports = {
	name: "support",
	description: "Get Yukino's support server invitation link",
	fr: "Envoie le lien d'invitation du serveur support de Yukino",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
	run: async (client, interaction, data) => {
        const url = "https://discord.gg/FJRJuaP5gK"
		if (data.guild.language === "fr") {
			const embed = new EmbedBuilder()
			.setTitle('Serveur support')
			.setDescription(`Rejoignez le serveur support [Cliquez ici](${url})`)
			.setColor("Aqua")
			.setTimestamp()
			.setThumbnail(client.user.displayAvatarURL())
			.setFooter({iconURL: client.user.avatarURL(), text: client.user.tag});

			const actionRow = new ActionRowBuilder()
			.addComponents([
				new ButtonBuilder()
				.setLabel('Support')
				.setURL(url)
				.setStyle(ButtonStyle.Link)
			])
			return interaction.reply({ embeds: [embed], components: [actionRow] });
		} else {
			const embed = new EmbedBuilder()
			.setTitle('Support server')
			.setDescription(`Join the support server [Click here](${url})`)
			.setColor("Aqua")
			.setTimestamp()
			.setThumbnail(client.user.displayAvatarURL())
			.setFooter({iconURL: client.user.avatarURL(), text: client.user.tag});

			const actionRow = new ActionRowBuilder()
			.addComponents([
				new ButtonBuilder()
				.setLabel('Support')
				.setURL(url)
				.setStyle(ButtonStyle.Link)
			])
			return interaction.reply({ embeds: [embed], components: [actionRow] });
		}
	}
};