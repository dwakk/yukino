const { ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = {
	name: "derank",
	description: "Supprime tous les rôles d'un membre",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    botPerms: ["ManageRoles"],
    userPerms: ["ManageRoles"],
    options: [
        {
            name: 'membre',
            description: 'Membre que vous souhaitez derank',
            type: 6,
            required: true,
        },
        {
            name: 'raison',
            description: 'Raison du dérank',
            type: 3,
            required: false,
        }
    ],
	run: async (client, interaction) => {
		let target =  interaction.options.getUser('membre');
        let raison = interaction.options.getString('raison');
        if (!raison) {
            raison = 'N/A'
        }

        target = interaction.guild.members.cache.get(target.id);

        if(interaction.member.roles.highest.comparePositionTo(interaction.guild.members.cache.get(target.id).roles.highest) >= 0) {
            const embed = new EmbedBuilder()
            .setDescription(":x: - Ce membre a un rôle plus élevé que le votre")
            .setColor("Red")
            return interaction.reply({embeds: [embed], ephemeral: true});
        }
 
        const embed = new EmbedBuilder()
        .setTitle("Membre dérank")
        .setDescription(`${target.user.tag} a été dérank`)
        .addFields(
            { name: "ID", value: `${target.id}`},
            { name: "Raison", value: `${raison}` },
            { name: "Modérateur", value: `<@${interaction.member.id}>`}
        )
        .setThumbnail(target.displayAvatarURL({dynamic: true}))
        .setColor("Red")
        .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
        .setTimestamp()
        target.roles.set([]);
        return interaction.reply({embeds: [embed]});
        
	}
};