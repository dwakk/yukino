const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');

module.exports = {
	name: "invite",
	description: "Get Yukino's invitation link",
	fr: "Envoie le lien d'invitation de Yukino",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
	run: async (client, interaction, data) => {
		const url = "https://discord.com/api/oauth2/authorize?client_id=1009105412861210675&permissions=1376671247446&scope=bot";
		if (data.guild.language === "fr") {
			const embed = new EmbedBuilder()
			.setTitle('Invite moi!')
			.setDescription(`Invitez Yukino sur votre serveur [Cliquez ici](${url})`)
			.setColor("Aqua")
			.setTimestamp()
			.setThumbnail(client.user.displayAvatarURL())
			.setFooter({iconURL: client.user.avatarURL(), text: client.user.tag});

			const actionRow = new ActionRowBuilder()
			.addComponents([
				new ButtonBuilder()
				.setLabel('Invite')
				.setURL(url)
				.setStyle(ButtonStyle.Link)
			])
			return interaction.reply({ embeds: [embed], components: [actionRow] });
		} else {
			const embed = new EmbedBuilder()
			.setTitle('Invite me!')
			.setDescription(`Invite Yukino on your server [Click here](${url})`)
			.setColor("Aqua")
			.setTimestamp()
			.setThumbnail(client.user.displayAvatarURL())
			.setFooter({iconURL: client.user.avatarURL(), text: client.user.tag});

			const actionRow = new ActionRowBuilder()
			.addComponents([
				new ButtonBuilder()
				.setLabel('Invite')
				.setURL(url)
				.setStyle(ButtonStyle.Link)
			])
			return interaction.reply({ embeds: [embed], components: [actionRow] });
		}
	}
};