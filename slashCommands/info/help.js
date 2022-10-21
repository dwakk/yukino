const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');

module.exports = {
	name: "help",
	description: "Donne la liste des commandes du serveur",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	run: async (client, interaction) => {
                const directories = [
                        ...new Set(client.commands.map((cmd) => cmd.directory))
                ];
                console.log(directories)
	}
};