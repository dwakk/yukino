const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');

module.exports = {
	name: "kick",
	description: "Permet d'expulser un membre",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
    botPerms: ["KickMembers"],
    userPerms: ["KickMembers"],
    options: [
        {
            name: 'membre',
            description: 'Membre que vous souhaitez expulser',
            type: 6,
            required: true
        },
        {
            name: 'raison',
            description: "Raison de l'expulsion",
            type: 3,
            required: false,
        }
    ],
	run: async (client, interaction) => {
        let target =  interaction.options.getUser('membre');
        let raison = interaction.options.getString('raison');
        let mod = interaction.member;

        target = interaction.guild.members.cache.get(target.id);

        if(!target.kickable || target.id === client.id) {
            const embed = new EmbedBuilder()
            .setDescription(":x: - Impossible d'expulser ce membre")
            .setColor("Red")
            return interaction.reply({embeds: [embed], ephemeral: true});
        }

        if(mod.roles.highest.comparePositionTo(interaction.guild.members.cache.get(target.id).roles.highest) >= 0) {
            const embed = new EmbedBuilder()
            .setDescription(":x: - Ce membre a un rôle plus élevé que le votre")
            .setColor("Red")
            return interaction.reply({embeds: [embed], ephemeral: true});
        }

        if (!raison) {
            raison = 'N/A'
        };

        const embed = new EmbedBuilder()
        .setTitle("Membre expulsé")
        .setDescription(`${target.user.tag} a été expulsé`)
        .addFields(
            { name: "ID", value: `${target.id}`},
            { name: "Raison", value: `${raison}` },
            { name: "Modérateur", value: `<@${mod.id}>`}
        )
        .setThumbnail(target.displayAvatarURL({dynamic: true}))
        .setColor("Red")
        .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
        .setTimestamp()

        interaction.reply({embeds: [embed]});

        return target.kick({reason: `${raison}`});

	}
};
