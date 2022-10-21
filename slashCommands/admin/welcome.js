const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

module.exports = {
	name: "welcome",
	description: "Manage the welcome system",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    userPerms: ["Administrator"],
    options: [
        {
            name: "enable",
            description: "Enable the welcome system",
            type: 1,
            options: [
                {
                    name: "channel",
                    description: "The channel you want to set as welcome channel",
                    type: 7,
                    required: true,
                },
                {
                    name: "message",
                    description: "The welcome message. Add <member> to ping the member who joined",
                    type: 3,
                    required: false,
                },
            ],
        },
        {
            name: "disable",
            description: "Disable the welcome system",
            type: 1,
        },
    ],
	run: async (client, interaction, data) => {
        if (interaction.options._subcommand === "enable") {
            const channel = interaction.options.getChannel('channel');
            let message = interaction.options.getString('message');
            if (!message) {
                message = data.guild.addons.welcome.message
            }
            if (channel.isText === false) {
                if (data.guild.language === "fr") {
                    const embed = new EmbedBuilder()
                    .setDescription(":x: - Ce salon n'est pas textuel")
                    .setColor("Red");
                    return interaction.reply({embeds: [embed], ephemeral: true});
                } else {
                    const embed = new EmbedBuilder()
                    .setDescription(":x: - This channel isn't textual")
                    .setColor("Red");
                    return interaction.reply({embeds: [embed], ephemeral: true});
                }
            }
            data.guild.addons.welcome = { enabled: true, channel: channel.id, message: message}
            await data.guild.save();
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setTitle("Messages de bienvenue")
                .setDescription(`✅ - Les messages de bienvenue seront envoyés dans le salon <#${channel.id}>`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Messages de bienvenue", value: `<#${channel.id}>`},
                        { name: "Message", value: `\`${data.guild.addons.welcome.message}\``},
                        { name: "Admin:", value: `<@${interaction.member.id}>`}
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
                return interaction.reply({embeds: [embed]});
            } else {
                const embed = new EmbedBuilder()
                .setTitle("Welcome messages")
                .setDescription(`✅ - Welcome messages will be sent in the channel <#${channel.id}>`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Welcome messages", value: `<#${channel.id}>`},
                        { name: "Message", value: `\`${data.guild.addons.welcome.message}\``},
                        { name: "Admin:", value: `<@${interaction.member.id}>`}
                    )
                    .setColor("Blurple")
                    .setFooter({iconURL: interaction.guild.iconURL(), text: interaction.guild.name})
                    .setTimestamp();
                    if (!ch) {
                        const embed = new EmbedBuilder()
                        .setDescription("Logs channel not found. It has maybe been deleted!")
                        .setColor("Red");
                        interaction.channel.send({embeds: [embed], ephemeral: true});
                    } else {
                        ch.send({embeds: [log]});
                    }
                }
                return interaction.reply({embeds: [embed]});
            }
        }
        if (interaction.options._subcommand === "disable") {
            if (data.guild.addons.welcome.enabled === false) {
                if (data.guild.language === "fr") {
                    const embed = new EmbedBuilder()
                    .setDescription("💢 - Les messages de bienvenue sont déjà désactivés")
                    .setColor("Red");
                    return interaction.reply({embeds: [embed], ephemeral: true});
                } else {
                    const embed = new EmbedBuilder()
                    .setDescription("💢 - The welcome system is already disabled")
                    .setColor("Red");
                    return interaction.reply({embeds: [embed], ephemeral: true});
                }
            }
            data.guild.addons.welcome = { enabled: false, channel: "null" };
            await data.guild.save();
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setTitle("Messages de bienvenue")
                .setDescription(`✅ - Les messages de bienvenue seront envoyés dans le salon <#${channel.id}>`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Messages de bienvenue", value: `<#${channel.id}>`},
                        { name: "Message", value: `\`${data.guild.addons.welcome.message}\``},
                        { name: "Admin:", value: `<@${interaction.member.id}>`}
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
                return interaction.reply({embeds: [embed]});
            } else {
                const embed = new EmbedBuilder()
                .setTitle("Welcome messages")
                .setDescription(`✅ - Welcome messages will be sent in the channel <#${channel.id}>`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Welcome messages", value: `<#${channel.id}>`},
                        { name: "Message", value: `\`${data.guild.addons.welcome.message}\``},
                        { name: "Admin:", value: `<@${interaction.member.id}>`}
                    )
                    .setColor("Blurple")
                    .setFooter({iconURL: interaction.guild.iconURL(), text: interaction.guild.name})
                    .setTimestamp();
                    if (!ch) {
                        const embed = new EmbedBuilder()
                        .setDescription("Logs channel not found. It has maybe been deleted!")
                        .setColor("Red");
                        interaction.channel.send({embeds: [embed], ephemeral: true});
                    } else {
                        ch.send({embeds: [log]});
                    }
                }
                return interaction.reply({embeds: [embed]});
            }
        }
	}
};