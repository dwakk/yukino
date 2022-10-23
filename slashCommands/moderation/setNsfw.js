const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

module.exports = {
	name: "setnsfw",
	description: "Manage a channel's nsfw level",
    fr: "Modifie les restrictions d'âge d'un salon",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    userPerms: ["ManageChannels"],
    botPerms: ["ManageChannels"],
    options: [
        {
            name: "enable",
            description: "Set a channel as NSFW",
            type: 1,
            options: [
                {
                    name: "channel",
                    description: "The channem you want to set as NSFW",
                    type: 7,
                    required: false,
                },
            ],
        },
        {
            name: "disable",
            description: "Set a channel as non-NSFW",
            type: 1,
            options: [
                {
                    name: "channel",
                    description: "The channel you want to set as NSFW",
                    type: 7,
                    required: false,
                },
            ],
        },
    ],
	run: async (client, interaction, data) => {
		if (interaction.options._subcommand === "enable") {
            let channel =  interaction.options.getChannel('channel');
            if (!channel) {
                channel = interaction.channel
            }
            if (channel.nsfw === true) {
                if (data.guild.language === "fr") {
                    const embed = new EmbedBuilder()
                    .setDescription("💢 - Ce salon est déjà NSFW")
                    .setColor("Red");
                    return interaction.reply({embeds: [embed], ephemeral: true});
                } else {
                    const embed = new EmbedBuilder()
                    .setDescription("💢 - This channel is already set as NSFW")
                    .setColor("Red");
                    return interaction.reply({embeds: [embed], ephemeral: true});
                }
            }
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setTitle("NSFW")
                .setDescription(`✅ - Le salon <#${channel.id}> est maintenant NSFW`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Modération")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Salon", value: `<#${channel.id}>`},
                        { name: "NSFW", value: "`activé`"},
                        { name: "Modérateur:", value: `<@${interaction.member.id}>`}
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
                }
                interaction.reply({embeds: [embed]});
                return channel.setNSFW(true)
            } else {
                const embed = new EmbedBuilder()
                .setTitle("NSFW")
                .setDescription(`✅ - The channel <#${channel.id}> is now set as NSFW`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Moderation")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Channel", value: `<#${channel.id}>`},
                        { name: "NSFW", value: "`enabled`"},
                        { name: "Moderator:", value: `<@${interaction.member.id}>`}
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
                }
                interaction.reply({embeds: [embed]});
                return channel.setNSFW(true)
            };
        } else if (interaction.options._subcommand === "disable") {
            let channel =  interaction.options.getChannel('channel');
            if (!channel) {
                channel = interaction.channel
            }
            if (channel.nsfw === false) {
                if (data.guild.language === "fr") {
                    const embed = new EmbedBuilder()
                    .setDescription("💢 - Ce salon est déjà non-NSFW")
                    .setColor("Red");
                    return interaction.reply({embeds: [embed], ephemeral: true});
                } else {
                    const embed = new EmbedBuilder()
                    .setDescription("💢 - This channel is already set as non-NSFW")
                    .setColor("Red");
                    return interaction.reply({embeds: [embed], ephemeral: true});
                }
            }
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setTitle("NSFW")
                .setDescription(`✅ - Le salon <#${channel.id}> est maintenant non-NSFW`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Modération")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Salon", value: `<#${channel.id}>`},
                        { name: "NSFW", value: "`désactivé`"},
                        { name: "Modérateur:", value: `<@${interaction.member.id}>`}
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
                }
                interaction.reply({embeds: [embed]});
                return channel.setNSFW(false)
            } else {
                const embed = new EmbedBuilder()
                .setTitle("NSFW")
                .setDescription(`✅ - The channel <#${channel.id}> is now set as non-NSFW`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Moderation")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Channel", value: `<#${channel.id}>`},
                        { name: "NSFW", value: "`disabled`"},
                        { name: "Moderator:", value: `<@${interaction.member.id}>`}
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
                }
                interaction.reply({embeds: [embed]});
                return channel.setNSFW(false)
            };
        }
	}
};