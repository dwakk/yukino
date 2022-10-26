const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const { Kawaii } = require('kawaii-api');
const api = new Kawaii("anonymous");
module.exports = {
	name: "kiss",
	description: "Kiss a member",
    fr: "Embrasse un membre",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            name: "user",
            description: "The user you want to kiss",
            type: 6,
            required: true,
        },
    ],
	run: async (client, interaction, data) => {
        const member = interaction.options.getUser("user");
        api.gif("kiss").then(res => {
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setDescription(`**${interaction.member.displayName}** embrasse **${member.username}**`)
                .setImage(res)
                .setColor("White")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                return interaction.reply({ embeds: [embed]});
            } else {
                const embed = new EmbedBuilder()
                .setDescription(`**${interaction.member.displayName}** kisses **${member.username}**`)
                .setImage(res)
                .setColor("White")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                return interaction.reply({ embeds: [embed]});
            };
        });
	}
};