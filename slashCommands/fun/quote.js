const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');
const quote = require('../../ressources/quotes.json')

module.exports = {
	name: "quote",
	description: "en only | Get a random quote from Oregairu",
	fr: "Envoie une citation d'Oregairu | uniquement en anglais",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	run: async (client, interaction, data) => {
        const embed = new EmbedBuilder()
        .setDescription(quote[Math.round(Math.random()*quote.length)])
        .setColor("Blue");
        return interaction.reply({embeds: [embed]});
	}
};