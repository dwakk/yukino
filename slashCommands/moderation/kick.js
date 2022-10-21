const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

module.exports = {
	name: "kick",
	description: "Kick a member",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
    botPerms: ["KickMembers"],
    userPerms: ["KickMembers"],
    options: [
        {
            name: 'member',
            description: 'Member you want to kick',
            type: 6,
            required: true
        },
        {
            name: 'reason',
            description: "Raison of the kick",
            type: 3,
            required: false,
        }
    ],
	run: async (client, interaction, data) => {
        let target =  interaction.options.getUser('member');
        let raison = interaction.options.getString('reason');
        let mod = interaction.member;
        target = interaction.guild.members.cache.get(target.id);

        if(!target.kickable || target.id === client.id || target.id === mod.id)  {
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setDescription(":x: - Je ne peux pas expulser ce membre")
                .setColor("Red");
                return interaction.reply({embeds: [embed], ephemeral: true});
            } else {
                const embed = new EmbedBuilder()
                .setDescription(":x: - I can't kick this member")
                .setColor("Red");
                return interaction.reply({embeds: [embed], ephemeral: true});
            };
        };

        if(mod.roles.highest.comparePositionTo(interaction.guild.members.cache.get(target.id).roles.highest) >= 0 && mod.id !== interaction.guild.ownerId) {
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
            .setTitle("Membre expulsé")
            .setDescription(`${target.user.tag} a été expulsé`)
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
                if (!ch) {
                    const embed = new EmbedBuilder()
                    .setDescription("Salon de logs introuvable. Il a peut-être été supprimé!")
                    .setColor("Red");
                    return interaction.reply({embeds: [embed], ephemeral: true});
                }
                const log = new EmbedBuilder()
                .setTitle("Logs: Modération")
                .setThumbnail(interaction.member.user.avatarURL())
                .addFields(
                    { name: "Kick", value: `\`<@${target.id}\``},
                    { name: "Raison", value: raison ? raison : "N/A"},
                    { name: "Modérateur", value: `<@${interaction.member.id}>`}
                )
                .setColor("Blurple")
                .setFooter({iconURL: interaction.guild.iconURL(), text: interaction.guild.name})
                .setTimestamp();
                ch.send({embeds: [log]});
            };
            return target.kick({reason: raison ? raison : "N/A"});
        } else {
            const embed = new EmbedBuilder()
            .setTitle("Member kicked")
            .setDescription(`${target.user.tag} has been kicked`)
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
                .setTitle("Logs: Modération")
                .setThumbnail(interaction.member.user.avatarURL())
                .addFields(
                    { name: "Kick", value: `\`<@${target.id}\``},
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
            return target.kick({reason: raison ? raison : "None"});
        };

	}
};
