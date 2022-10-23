const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

module.exports = {
	name: "rename",
	description: "Rename a member",
    fr: "Renomme un membre",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            name: "member",
            description: "The member you want to rename",
            type: 6,
            required: true,
        },
        {
            name: "nickname",
            description: "Nickname for the member",
            type: 3,
            required: false,
        },
    ],
    botPerms: ["ManageNicknames"],
    userPerms: ["ManageNicknames"],
	run: async (client, interaction, data) => {
        let member =  interaction.options.getUser('member');
        let nick =  interaction.options.getString('nickname');
        member = interaction.guild.members.cache.get(member.id);
        if (member.displayName === nick | "Yukino Simp") {
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setDescription("💢 - Inutile de renommer ce membre!")
                .setColor("Red");
                return interaction.reply({embeds: [embed], ephemeral: true});
            } else {
                const embed = new EmbedBuilder()
                .setDescription("💢 - It's useless to rename this member!")
                .setColor("Red");
                return interaction.reply({embeds: [embed], ephemeral: true});
            }
        }
        if (data.guild.language === "fr") {
            const embed = new EmbedBuilder()
            .setTitle("Membre renommé")
            .setDescription(`${member.user.tag} a été renommé`)
            .addFields(
                { name: "Ancien pseudo", value: member.displayName},
                { name: "Modérateur", value: `<@${interaction.member.id}>`},
            )
            .setThumbnail(member.displayAvatarURL({dynamic: true}))
            .setColor("Green")
            .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
            .setTimestamp();
            interaction.reply({embeds: [embed]});
            if (data.guild.addons.logs.enabled === true) {
                const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                const log = new EmbedBuilder()
                .setTitle("Logs: Modération")
                .setThumbnail(interaction.member.user.avatarURL())
                .addFields(
                    { name: "Membre renommé", value: `<@${member.id}>`},
                    { name: "Ancien pseudo", value: member.displayName},
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
            await member.setNickname(nick ? nick: "Yukino Simp")
        } else {
            const embed = new EmbedBuilder()
            .setTitle("Member renamed")
            .setDescription(`${member.user.tag} has been renamed`)
            .addFields(
                { name: "Old nickname", value: member.displayName},
                { name: "Moderator", value: `<@${interaction.member.id}>`}
            )
            .setThumbnail(member.displayAvatarURL({dynamic: true}))
            .setColor("Green")
            .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
            .setTimestamp();
            interaction.reply({embeds: [embed]});
            if (data.guild.addons.logs.enabled === true) {
                const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                const log = new EmbedBuilder()
                .setTitle("Logs: Moderation")
                .setThumbnail(interaction.member.user.avatarURL())
                .addFields(
                    { name: "Member", value: `<@${member.id}>`},
                    { name: "Old nickname", value: member.displayName},
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
            await member.setNickname(nick ? nick: "Yukino Simp")
        }
	}
};