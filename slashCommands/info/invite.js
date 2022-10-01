const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');

module.exports = {
	name: "invite",
	description: "Donne le lien d'invitation du bot",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
	run: async (client, interaction) => {
		const url = "https://discord.com/api/oauth2/authorize?client_id=1009105412861210675&permissions=1376942943542&scope=bot"
		const embed = new EmbedBuilder()
		.setTitle('Invitez moi!')
		.setDescription(`Invitez le bot sur le serveur [Cliquez ici](${url})`)
		.setColor("Aqua")
		.setTimestamp()
		.setThumbnail(client.user.displayAvatarURL())
		.setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})

		const actionRow = new ActionRowBuilder()
		.addComponents([
			new ButtonBuilder()
			.setLabel('Invite')
			.setURL(url)
			.setStyle(ButtonStyle.Link)
		])
		return interaction.reply({ embeds: [embed], components: [actionRow] });
	}
};
