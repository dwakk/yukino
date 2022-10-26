const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const { Kawaii } = require('kawaii-api');
const api = new Kawaii("anonymous");
module.exports = {
	name: "hug",
	description: "Hug a member",
    fr: "Fait un câlin à un membre",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            name: "user",
            description: "The user you want to hug",
            type: 6,
            required: true,
        },
    ],
	run: async (client, interaction, data) => {
        const member = interaction.options.getUser("user");
        api.gif("hug").then(res => {
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setDescription(`**${interaction.member.displayName}** fait un câlin à **${member.username}**`)
                .setImage(res)
                .setColor("White")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                return interaction.reply({ embeds: [embed]});
            } else {
                const embed = new EmbedBuilder()
                .setDescription(`**${interaction.member.displayName}** hugs **${member.username}**`)
                .setImage(res)
                .setColor("White")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                return interaction.reply({ embeds: [embed]});
            };
        })
	}
};