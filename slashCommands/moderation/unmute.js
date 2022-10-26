const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

module.exports = {
	name: "unmute",
	description: "Unmute a member",
    fr: "Enlève le rôle muet à un membre",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
    botPerms: ["ManageMessages"],
    userPerms: ["ManageMessages"],
    options: [
        {
            name: 'member',
            description: 'The member you want to mute',
            type: 6,
            required: true
        },
        {
            name: 'reason',
            description: "Reason of the mute",
            type: 3,
            required: false,
        }
    ],
	run: async (client, interaction, data) => {
        let target =  interaction.options.getUser('member');
        let raison = interaction.options.getString('reason');
        let mod = interaction.member;

        target = interaction.guild.members.cache.get(target.id);

        const role = await interaction.guild.roles.cache.get(data.guild.muteRole);

        if (!target.roles.cache.find(r => r.id === data.guild.muteRole)) {
            const embed = new EmbedBuilder()
            .setColor("Red");
            if (data.guild.language === "fr") {
                embed.setDescription("💢 - Ce membre n'est pas muet");
            } else {
                embed.setDescription("💢 - This member isn't muted");
            };
            return interaction.reply({embeds: [embed], ephemeral: true});
        };

        if(target.id === client.id || target.id === mod.id || !target.manageable) {
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setDescription("💢 - Veuillez choisir un autre membre")
                .setColor("Red")
                return interaction.reply({embeds: [embed], ephemeral: true});
            } else {
                const embed = new EmbedBuilder()
                .setDescription("💢 -Veuillez choisir un autre membre")
                .setColor("Red")
                return interaction.reply({embeds: [embed], ephemeral: true});
            };
        };

        if(mod.roles.highest.comparePositionTo(interaction.guild.members.cache.get(target.id).roles.highest) >= 0 && mod.id != interaction.guild.ownerId) {
           if (data.guild.language === "fr") {
            const embed = new EmbedBuilder()
            .setDescription("💢 - Ce membre a un rôle plus haut que vous")
            .setColor("Red");
            return interaction.reply({embeds: [embed], ephemeral: true});
           } else {
            const embed = new EmbedBuilder()
            .setDescription("💢 - This member has an higher role than yours")
            .setColor("Red");
            return interaction.reply({embeds: [embed], ephemeral: true});
           }
        }

        if (data.guild.language === "fr") {
            const embed = new EmbedBuilder()
            .setTitle("Membre démute")
            .setDescription(`<@${target.id}> a n'est plus muet`)
            .addFields(
                { name: "ID", value: target.id},
                { name: "Raison", value: raison ? raison : "N/A"},
                { name: "Modérateur", value: `<@${mod.id}>`}
            )
            .setThumbnail(target.displayAvatarURL({dynamic: true}))
            .setColor("Red")
            .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
            .setTimestamp();
            interaction.reply({embeds: [embed]});
            if (data.guild.addons.logs.enabled === true) {
                const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                const log = new EmbedBuilder()
                .setTitle("Logs: Modération")
                .setThumbnail(interaction.member.user.avatarURL())
                .addFields(
                    { name: "Démute", value: `\`<@${target.id}\``},
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
            return target.roles.remove(role);
        } else {
            const embed = new EmbedBuilder()
            .setTitle("Member unmuted")
            .setDescription(`<@${target.id}> has been unmuted`)
            .addFields(
                { name: "ID", value: target.id},
                { name: "Reason", value: raison ? raison : "None"},
                { name: "Moderator", value: `<@${mod.id}>`}
            )
            .setThumbnail(target.displayAvatarURL({dynamic: true}))
            .setColor("Red")
            .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
            .setTimestamp();
            interaction.reply({embeds: [embed]});
            if (data.guild.addons.logs.enabled === true) {
                const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                const log = new EmbedBuilder()
                .setTitle("Logs: Moderation")
                .setThumbnail(interaction.member.user.avatarURL())
                .addFields(
                    { name: "Unute", value: `\`<@${target.id}\``},
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
            return target.roles.remove(role);
        };
	}
};
