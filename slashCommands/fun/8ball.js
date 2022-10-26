const { ApplicationCommandType } = require('discord.js');
const answers = require("../../ressources/answers.json");

module.exports = {
	name: "8ball",
	description: "Ask the magic ball something",
    fr: "Demande quelque chose à la balle magique",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            name: "question",
            description: "The question you want to ask the magic ball",
            type: 3,
            required: true,
        },
    ],
	run: async (client, interaction, data) => {
        const question = interaction.options.getString("question");
        let msg;
        if (data.guild.language === "fr") {
            msg = `> **${interaction.member.displayName}:** ${question}\n\n🎱 ${answers.fr[Math.round(Math.random()*answers.fr.length)]}`;
        } else {
            msg = `> **${interaction.member.displayName}:** ${question}\n\n🎱 ${answers.en[Math.round(Math.random()*answers.en.length)]}`;
        }
        return interaction.reply(msg);
	}
};