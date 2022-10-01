const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
	name: "avatar",
	description: "Envoie la photo de profil d'un membre",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            name: 'membre',
            description: 'Membre dont vous souhaitez obtenir la photo de profil',
            type: 6,
            required: false
        }
    ],
	run: async (client, interaction) => {
        const user = interaction.options.get('membre')?.user || interaction.user;

        const embed = new EmbedBuilder()
        .setTitle(`Avatar de ${user.tag}`)
        .setImage(user.displayAvatarURL({ size: 4096 }))
        .setColor("Aqua")
        .setTimestamp();

        const formats = ['png', 'jpg', 'jpeg', 'gif'];
        const components = [];
        formats.forEach(format => {
            let imageOptions = { extension: format, forceStatic: format == 'gif' ? false : true };

            if (user.avatar == null && format !== 'png') return; 
            if (!user.avatar.startsWith('a_') && format === 'gif') return;
            components.push(
                new ButtonBuilder()
                .setLabel(format.toUpperCase())
                .setStyle('Link')
                .setURL(user.displayAvatarURL(imageOptions))
            )
        })

        const row = new ActionRowBuilder()
        .addComponents(components);

		return interaction.reply({ embeds: [embed], components: [row] });
	}
};
