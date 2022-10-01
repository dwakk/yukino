const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');

module.exports = {
	name: "clear",
	description: "Supprime un certain nombre de message",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
    userPerms: ["ManageChannels"],
    botPerms: ["ManageChannels"],
    options: [
        {
            name: "nombre",
            description: "Le nombre de messsages que vous souhaitez supprimer",
            type: 4,
            required: true,
            min_value: 1,
            max_value: 99,
        },
    ],
	run: async (client, interaction) => {
        let nombre =  interaction.options.getInteger('nombre')
        nombre = nombre+1
        interaction.channel.bulkDelete(nombre).then(() => {
            const embed = new EmbedBuilder()
            .setTitle("Messages supprimés")
            .setDescription(`${nombre} messages ont été supprimés`)
            .setColor('Green')
            .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
            .setTimestamp()
            return interaction.channel.send({embeds: [embed]})
        })
	}
};
