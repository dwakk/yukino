const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

module.exports = {
	name: "logs",
	description: "Manage the log system",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    userPerms: ["Administrator"],
    options: [
        {
            name: "enable",
            description: "Enable the log system",
            type: 1,
            options: [
                {
                    name: "channel",
                    description: "The channel you want the logs to be sent in",
                    type: 7,
                    required: true,
                },
            ],
        },
        {
            name: "disable",
            description: "Disable the log system",
            type: 1,
        }
    ],
	run: async (client, interaction, data) => {
        if (interaction.options._subcommand === "enable") {
            let channel = interaction.options.getChannel('channel');
            if (channel.isText === false) {
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
            data.guild.addons.logs = { enabled: true, channel: channel.id};
            await data.guild.save()
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setTitle("Logs")
                .setDescription(`✅ - Les logs seront envoyés dans le salon <#${channel.id}>`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                const log = new EmbedBuilder()
                .setTitle("Logs: Admin")
                .setThumbnail(interaction.member.user.avatarURL())
                .addFields(
                    { name: "Logs", value: "`activés`"},
                    { name: "Admin:", value: `<@${interaction.member.id}>`}
                )
                .setColor("Blurple")
                .setFooter({iconURL: interaction.guild.iconURL(), text: interaction.guild.name})
                .setTimestamp();
                interaction.reply({embeds: [embed]});
                return channel.send({embeds: [log]})
            } else {
                const embed = new EmbedBuilder()
                .setTitle("Logs")
                .setDescription(`✅ - Logs will now be sent in the channel <#${channel.id}>`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                const log = new EmbedBuilder()
                .setTitle("Logs: Admin")
                .setThumbnail(interaction.member.user.avatarURL())
                .addFields(
                    { name: "Logs:", value:"`enabled`"},
                    { name: "Admin:", value: `<@${interaction.member.id}>`}
                )
                .setColor("Blurple")
                .setFooter({iconURL: interaction.guild.iconURL(), text: interaction.guild.name})
                .setTimestamp();
                interaction.reply({embeds: [embed]});
                return channel.send({embeds: [log]});
            }
        } else if (interaction.options._subcommand === "disable") {
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setTitle("Logs")
                .setDescription(`✅ - Les logs sont maintenant désactivées`)
                .setColor("Orange")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                const log = new EmbedBuilder()
                .setTitle("Logs: admin")
                .setThumbnail(interaction.member.user.avatarURL())
                .addFields(
                    { name: "Logs", value:"`désactivés`"},
                    { name: "Admin", value: `<@${interaction.member.id}>`}
                )
                .setColor("Blurple")
                .setFooter({iconURL: interaction.guild.iconURL(), text: interaction.guild.name})
                .setTimestamp();
                interaction.reply({embeds: [embed]});
                const ch = client.channels.cache.get(data.guild.addons.logs.channel)
                if (!ch) {
                    const embed = new EmbedBuilder()
                    .setDescription("Salon de logs introuvable. Il a peut-être été supprimé!")
                    .setColor("Red");
                    interaction.channel.send({embeds: [embed], ephemeral: true});
                } else {
                    ch.send({embeds: [log]});
                }
                data.guild.addons.logs = { enabled: false, channel: "null" };
                return await data.guild.save();
            } else {
                const embed = new EmbedBuilder()
                .setTitle("Logs")
                .setDescription(`✅ - Logs are now disabled`)
                .setColor("Orange")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                const log = new EmbedBuilder()
                .setTitle("Logs: Admin")
                .setThumbnail(interaction.member.user.avatarURL())
                .addFields(
                    { name: "Logs", value:"`disabled`"},
                    { name: "Admin", value: `<@${interaction.member.id}>`}
                )
                .setColor("Blurple")
                .setFooter({iconURL: interaction.guild.iconURL(), text: interaction.guild.name})
                .setTimestamp();
                interaction.reply({embeds: [embed]});
                const ch = client.channels.cache.get(data.guild.addons.logs.channel);
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
                data.guild.addons.logs = { enabled: false, channel: "null" };
                return await data.guild.save();
            };
        };
	}
};