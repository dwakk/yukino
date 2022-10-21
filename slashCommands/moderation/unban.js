const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

module.exports = {
    name: "unban",
    description: "Unban a member",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    botPerms: ["BanMembers"],
    userPerms: ["BanMembers"],
    options: [
        {
            name: "id",
            description: "Id of the member you want to ban",
            type: 3,
            required: true,
        },
        {
            name: "reason",
            description: "Reason of the unban",
            type: 3,
            required: false,
        },
    ],
    run: async (client, interaction, data) => {
        let id = interaction.options.getString('id')
        let raison =  interaction.options.getString('reason');
        let usr = client.users.cache.get(id)
        interaction.guild.bans.remove(id);

       if (data.guild.language === "fr") {
        const embed = new EmbedBuilder()
        .setTitle("Membre débanni")
        .setDescription(`<@${id}> a été débanni`)
        .addFields(
            { name: "ID", value: id},
            { name: "Raison", value: raison ? raison : "N/A" },
            { name: "Modérateur", value: `<@${interaction.member.id}>`}
        )
        .setThumbnail(usr.displayAvatarURL({dynamic: true}))
        .setColor("Green")
        .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
        .setTimestamp();
        if (data.guild.addons.logs.enabled === true) {
            const ch = client.channels.cache.get(data.guild.addons.logs.channel);
            const log = new EmbedBuilder()
            .setTitle("Logs: Modération")
            .setThumbnail(interaction.member.user.avatarURL())
            .addFields(
                { name: "Unban", value: `<#${id}>`},
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
        .setTitle("Member unbanned")
        .setDescription(`<@${id}> has been unbanned`)
        .addFields(
            { name: "ID", value: id},
            { name: "Reason", value: raison ? raison : "None" },
            { name: "Moderator", value: `<@${interaction.member.id}>`}
        )
        .setThumbnail(usr.displayAvatarURL({dynamic: true}))
        .setColor("Green")
        .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
        .setTimestamp();
        if (data.guild.addons.logs.enabled === true) {
            const ch = client.channels.cache.get(data.guild.addons.logs.channel);
            const log = new EmbedBuilder()
            .setTitle("Logs: Moderation")
            .setThumbnail(interaction.member.user.avatarURL())
            .addFields(
                { name: "Unban", value: `<#${id}>`},
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
       }
    }
};