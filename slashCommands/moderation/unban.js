const { ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = {
	name: "unban",
	description: "Unban un membre",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    botPerms: ["BanMembers"],
    userPerms: ["BanMembers"],
    options: [
        {
            name: "id",
            description: "ID du membre à unban",
            type: 3,
            required: true,
        },
        {
            name: "raison",
            description: "Raison du unban",
            type: 3,
            required: false,
        },
    ],
	run: async (client, interaction) => {
        let id = parseFloat(interaction.options.getString('id'))
        var reg = /^\d+$/;
        if (id.match(reg) != true) {
            const embed = new EmbedBuilder()
            .setDescription(":x: - ID invalide")
            .setColor("Red")
            return interaction.reply({embeds: [embed], ephemeral: true})   
        }
        
        let raison =  interaction.options.getInteger('raison');
        if (!raison) {
            raison = 'N/A'
        };

        interaction.guild.bans.remove({user: id, reason: raison}).catch(() => {
            const embed = new EmbedBuilder()
            .setDescription(":x: - Une erreur est survenue, peut-être un ID invalide ?")
            .setColor("Red")
            return interaction.reply({embeds: [embed], ephemeral: true})
        })
        const embed = new EmbedBuilder()
        .setTitle("Membre unban")
        .setDescription(`<@${id}> a été unban`)
        .addFields(
            { name: "ID", value: `${id}`},
            { name: "Raison", value: `${raison}` },
            { name: "Modérateur", value: `<@${mod.id}>`}
        )
        .setThumbnail(target.displayAvatarURL({dynamic: true}))
        .setColor("Green")
        .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
        .setTimestamp()
        return interaction.reply({embeds: [embed]});
	}
};