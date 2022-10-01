const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');

module.exports = {
	name: "ban",
	description: "Permet de bannir un membre",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
    botPerms: ["BanMembers"],
    userPerms: ["BanMembers"],
    options: [
        {
            name: 'membre',
            description: 'Membre que vous souhaitez bannir',
            type: 6,
            required: true
        },
        {
            name: 'raison',
            description: 'Raison du bannissement',
            type: 3,
            required: false,
        }
    ],
	run: async (client, interaction) => {
        let target =  interaction.options.getUser('membre');
        let raison = interaction.options.getString('raison');
        if (!raison) {
            raison = 'N/A'
        };
        let mod = interaction.member;

        target = interaction.guild.members.cache.get(target.id);

        if(!target.bannable || target.id === client.id) {
            const embed = new EmbedBuilder()
            .setDescription(":x: - Impossible de bannir ce membre")
            .setColor("Red")
            return interaction.reply({embeds: [embed], ephemeral: true});
        }

        if(mod.id === interaction.guild.ownerId) {
            const embed = new EmbedBuilder()
            .setTitle("Membre banni")
            .setDescription(`${target.user.tag} a été banni`)
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

            return target.ban({reason: `${raison}`});

        } else if(mod.roles.highest.comparePositionTo(interaction.guild.members.cache.get(target.id).roles.highest) >= 0) {
            const embed = new EmbedBuilder()
            .setDescription(":x: - Ce membre a un rôle plus élevé que le votre")
            .setColor("Red")
            return interaction.reply({embeds: [embed], ephemeral: true});
        }

        const embed = new EmbedBuilder()
        .setTitle("Membre banni")
        .setDescription(`${target.user.tag} a été banni`)
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

        return target.ban({reason: `${raison}`});

	}
};
