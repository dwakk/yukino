const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

module.exports = {
	name: "suggestion",
	description: "Manage the suggestion system",
    fr: "Gestion du système de suggestion",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    userPerms: ["Administrator"],
    options: [
        {
            name: "enable",
            description: "Enable the suggestion system",
            type: 1,
            options: [
                {
                    name: "channel",
                    description: "The channel you wany the suggestions to be sent in",
                    type: 7,
                    required: true,
                },
            ],
        },
        {
            name: "disable",
            description: "Disable the suggestion system",
            type: 1,
        }
    ],
	run: async (client, interaction, data) => {
        if (interaction.options._subcommand === "enable") {
            const channel = interaction.options.getChannel("channel");
            if (channel.isText === false) {
                if (data.guild.language === "fr") {
                    const embed = new EmbedBuilder()
                    .setDescription("💢 - Le salon n'est pas textuel")
                    .setColor("Red");
                    return interaction.reply({embeds: [embed], ephemeral: true});
                } else {
                    const embed = new EmbedBuilder()
                    .setDescription("💢 - This channel isn't textual")
                    .setColor("Red");
                    return interaction.reply({embeds: [embed], ephemeral: true});
                };
            };
            data.guild.addons.suggestions = { enabled: true, channel: channel.id}
            await data.guild.save();
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setTitle("Suggestions")
                .setDescription(`✅ - Les suggestions seront envoyées dans le salon <#${channel.id}>`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                const t = new EmbedBuilder()
                .setAuthor({name: client.user.tag, iconURL: client.user.avatarURL()})
                .setDescription("Certifier Yukino 😄")
                .setColor("Aqua")
                .setFooter({iconURL: interaction.guild.iconURL(), text: interaction.guild.name})
                interaction.reply({embeds: [embed]})
                if (data.guild.addons.logs.enabled = true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Suggestions", value: "`activées`"},
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
                };
                const msg = await channel.send({embeds: [t], fetchReply: true})
                return msg.react("✅").then(() => msg.react("❌"))
            } else {
                const embed = new EmbedBuilder()
                .setTitle("Suggestions")
                .setDescription(`✅ - Suggestions will now be sent in the channel <#${channel.id}>`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                const t = new EmbedBuilder()
                .setAuthor({name: client.user.tag, iconURL: client.user.avatarURL()})
                .setDescription("Verify Yukino 😄")
                .setColor("Aqua")
                .setFooter({iconURL: interaction.guild.iconURL(), text: interaction.guild.name})
                interaction.reply({embeds: [embed]})
                if (data.guild.addons.logs.enabled = true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Suggestions:", value: "`enabled`"},
                        { name: "Admin:", value: `<@${interaction.member.id}>`}
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
                const msg = await channel.send({embeds: [t], fetchReply: true})
                return msg.react("✅").then(() => msg.react("❌"))
            }
        } else if (interaction.options._subcommand === "disable") {
            data.guild.addons.suggestions = { enabled: false, channel: "null" };
            await data.guild.save();
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setTitle("Suggestions")
                .setDescription(`✅ - Les suggestions sont maintenant désactivées`)
                .setColor("Orange")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled = true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Suggestions:", value: "`désactivées`"},
                        { name: "Admin:", value: `<@${interaction.member.id}>`}
                    )
                    .setColor("Blurple")
                    .setFooter({iconURL: interaction.guild.iconURL(), text: interaction.guild.name})
                    .setTimestamp();
                    ch.send({embeds: [log]});
                };
                return interaction.reply({embeds: [embed]});
            } else {
                const embed = new EmbedBuilder()
                .setTitle("Suggestions")
                .setDescription(`✅ - Suggestions are now disabled`)
                .setColor("Orange")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled = true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Language:", value: "`disabled`"},
                        { name: "Admin:", value: `<@${interaction.member.id}>`}
                    )
                    .setColor("Blurple")
                    .setFooter({iconURL: interaction.guild.iconURL(), text: interaction.guild.name})
                    .setTimestamp();
                    ch.send({embeds: [log]});
                };
                return interaction.reply({embeds: [embed]});
            };
        };
	}
};