const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

module.exports = {
	name: "derank",
	description: "Delete all the roles of a member",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    botPerms: ["ManageRoles"],
    userPerms: ["ManageRoles"],
    options: [
        {
            name: 'member',
            description: 'The member you want to derank',
            type: 6,
            required: true,
        },
        {
            name: 'reason',
            description: 'Reason of the derank',
            type: 3,
            required: false,
        }
    ],
	run: async (client, interaction, data) => {
		let target =  interaction.options.getUser('member');
        let raison = interaction.options.getString('reason');
        target = interaction.guild.members.cache.get(target.id);

        if(target.id === client.id || target.id === interaction.member.id || !target.manageable) {
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setDescription(":x: - Je ne peux pas dérank ce membre")
                .setColor("Red");
                return interaction.reply({embeds: [embed], ephemeral: true});
            } else {
                const embed = new EmbedBuilder()
                .setDescription(":x: - I can't derank this member")
                .setColor("Red");
                return interaction.reply({embeds: [embed], ephemeral: true});
            };
        };

        if(interaction.member.roles.highest.comparePositionTo(interaction.guild.members.cache.get(target.id).roles.highest) >= 0 && interaction.member.id != interaction.guild.ownerId) {
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setDescription(":x: - Ce membre a un rôle plus haut que vous")
                .setColor("Red");
                return interaction.reply({embeds: [embed], ephemeral: true});
            } else {
                const embed = new EmbedBuilder()
                .setDescription(":x: - This member has a role higher than yours")
                .setColor("Red");
                return interaction.reply({embeds: [embed], ephemeral: true});
            };
        };
 
        if (data.guild.language === "fr") {
            const embed = new EmbedBuilder()
            .setTitle("Membre dérank")
            .setDescription(`${target.user.tag} a été dérank`)
            .addFields(
                { name: "ID", value: target.id},
                { name: "Raison", value: raison ? raison : "N/A"},
                { name: "Modérateur", value: `<@${interaction.member.id}>`}
            )
            .setThumbnail(target.displayAvatarURL({dynamic: true}))
            .setColor("Red")
            .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
            .setTimestamp();
            target.roles.set([]);
            if (data.guild.addons.logs.enabled === true) {
                const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                const log = new EmbedBuilder()
                .setTitle("Logs: Modération")
                .setThumbnail(interaction.member.user.avatarURL())
                .addFields(
                    { name: "Derank", value: `<@${target.id}>`},
                    { name: "Raison", value: raison ? raison : "N/A"},
                    { name: "Modérateur", value: `<@${interaction.member.id}>`}
                )
                .setColor("Blurple")
                .setFooter({iconURL: interaction.guild.iconURL(), text: interaction.guild.name})
                .setTimestamp();
                if (!ch) {
                    const embed = new EmbedBuilder()
                    .setDescription("Salon de logs introuvable. Il a peut-être été supprimé!")
                    .setColor("Red");
                    interaction.channel.send({embeds: [embed], ephemeral: true});
                } else {
                    ch.send({embeds: [log]});
                }
            };
            return interaction.reply({embeds: [embed]});
        } else {
            const embed = new EmbedBuilder()
            .setTitle("Member derank")
            .setDescription(`${target.user.tag} has been deranked`)
            .addFields(
                { name: "ID", value: target.id},
                { name: "Reason", value: raison ? raison : "None"},
                { name: "Moderator", value: `<@${interaction.member.id}>`}
            )
            .setThumbnail(target.displayAvatarURL({dynamic: true}))
            .setColor("Red")
            .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
            .setTimestamp();
            target.roles.set([]);
            if (data.guild.addons.logs.enabled === true) {
                const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                const log = new EmbedBuilder()
                .setTitle("Logs: Moderation")
                .setThumbnail(interaction.member.user.avatarURL())
                .addFields(
                    { name: "Derank", value: `<@${target.id}>`},
                    { name: "Reason", value: raison ? raison : "None"},
                    { name: "Moderator", value: `<@${interaction.member.id}>`}
                )
                .setColor("Blurple")
                .setFooter({iconURL: interaction.guild.iconURL(), text: interaction.guild.name})
                .setTimestamp();
                if (!ch) {
                    const embed = new EmbedBuilder()
                    .setDescription("Logs channel not found. It has maybe been deleted!")
                    .setColor("Red");
                    sleep(5000).then(() => {
                        interaction.channel.send({embeds: [embed], ephemeral: true});
                    });
                } else {
                    ch.send({embeds: [log]});
                }
            };
            return interaction.reply({embeds: [embed]});
        };
        
	}
};