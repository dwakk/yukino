const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

module.exports = {
	name: "antilink",
	description: "Manage the antilink system",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    userPerms: ["Administrator"],
    options: [
        {
            name: "enable",
            description: "Enable the antilink system",
            type: 1,
        },
        {
            name: "disable",
            description: "Disable the antilink system",
            type: 1,
        }
    ],
	run: async (client, interaction, data) => {

	}
};