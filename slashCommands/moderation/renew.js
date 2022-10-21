const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

module.exports = {
	name: "renew",
	description: "Renew a channel",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
    botPerms: ["ManageChannels"],
    userPerms: ["ManageChannels"],
    options: [
        {
            name: 'channel',
            description: 'Channel you want to renew',
            type: 7,
            required: false
        }
    ],
	run: async (client, interaction, data) => {
        let ch =  interaction.options.getChannel('channel');
        if (!ch) {
            ch = interaction.channel;
        }

        if (ch.isText === false) {
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setDescription(":x: - Le salon n'est pas textuel")
                .setColor("Red");
                return interaction.reply({embeds: [embed], ephemeral: true});
            } else {
                const embed = new EmbedBuilder()
                .setDescription(":x: - This channel isn't textual")
                .setColor("Red");
                return interaction.reply({embeds: [embed], ephemeral: true});
            };
        };

        if (data.guild.language === "fr") {
            ch.clone().then((channel) => {
                channel.setPosition(ch.position);
                const embed = new EmbedBuilder()
                .setTitle('Salon recréé')
                .setDescription(`Le salon <#${channel.id}> a été recréé par <@${interaction.user.id}>`)
                .setThumbnail('https://media.giphy.com/media/oe33xf3B50fsc/giphy.gif')
                .setColor("Red")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const cha = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Modération")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Renew", value: `<#${channel.id}>`},
                        { name: "Modérateur", value: `<@${interaction.member.id}>`}
                    )
                    .setColor("Blurple")
                    .setFooter({iconURL: interaction.guild.iconURL(), text: interaction.guild.name})
                    .setTimestamp();
                    if (!cha) {
                        const embed = new EmbedBuilder()
                        .setDescription("Salon de logs introuvable. Il a peut-être été supprimé!")
                        .setColor("Red");
                        channel.send({embeds: [embed], ephemeral: true});
                    } else {
                        cha.send({embeds: [log]});
                    }
                };
                return channel.send({embeds: [embed]});
            });
            ch.delete();
        } else {
            ch.clone().then((channel) => {
                channel.setPosition(ch.position);
                const embed = new EmbedBuilder()
                .setTitle('Channel renewed')
                .setDescription(`The channel <#${channel.id}> has been renewed by <@${interaction.user.id}>`)
                .setThumbnail('https://media.giphy.com/media/oe33xf3B50fsc/giphy.gif')
                .setColor("Red")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const cha = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Moderation")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Renew", value: `<#${channel.id}>`},
                        { name: "Moderator", value: `<@${interaction.member.id}>`}
                    )
                    .setColor("Blurple")
                    .setFooter({iconURL: interaction.guild.iconURL(), text: interaction.guild.name})
                    .setTimestamp();
                    if (!cha) {
                        const embed = new EmbedBuilder()
                        .setDescription("Logs channel not found. It has maybe been deleted!")
                        .setColor("Red");
                        sleep(5000).then(() => {
                            channel.send({embeds: [embed], ephemeral: true});
                        });
                    } else {
                        cha.send({embeds: [log]});
                    }
                };
                return channel.send({embeds: [embed]});
            });
            ch.delete();
        }
	}
};
