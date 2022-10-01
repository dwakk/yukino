const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');

module.exports = {
	name: "renew",
	description: "Permet de recréer le salon",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
    botPerms: ["ManageChannels"],
    userPerms: ["ManageChannels"],
    options: [
        {
            name: 'salon',
            description: 'Salon que vous voulez recréer',
            type: 7,
            required: false
        }
    ],
	run: async (client, interaction) => {
        let ch =  interaction.options.getChannel('salon');
        if (!ch) {
            ch = interaction.channel
        }
        ch.clone().then((channel) => {
            channel.setPosition(ch.position);
            const embed = new EmbedBuilder()
            .setTitle('Salon recréé')
            .setDescription(`Le salon <#${channel.id}> a été recréé par <@${interaction.user.id}>`)
            .setThumbnail('https://media.giphy.com/media/oe33xf3B50fsc/giphy.gif')
            .setColor("Red")
            .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
            .setTimestamp()
            return channel.send({embeds: [embed]});
        });
        ch.delete();
	}
};
