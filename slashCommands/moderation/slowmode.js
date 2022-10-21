const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
const ms = require('ms');
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

module.exports = {
	name: "slowmode",
	description: "Set a slowmode",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            name: "cooldown",
            description: "Cooldown for the slowmode. Example values: 5s, 1m, 1h (Max: 6h)",
            required: true,
            type: 3,
        }
    ],
    userPerms: ["ManageChannels"],
    botPerms: ["ManageChannels"],
	run: async (client, interaction, data) => {
		const cooldown = interaction.options.getString('cooldown');
        const d = (ms(cooldown))/1000
        if (interaction.channel.rateLimitPerUser === d) {
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setDescription("💢 - Le mode lent est déjà activé avec cette durée")
                .setColor("Red");
                return  interaction.reply({embeds: [embed], ephemeral: true});
            } else {
                const embed = new EmbedBuilder()
                .setDescription("💢 - Slowmode is already enabled with this cooldown")
                .setColor("Red");
                return interaction.reply({embeds: [embed], ephemeral: true});
            }
        }
        if (d > 21600) {
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setDescription("💢 - La durée spécifiée est trop longue. La durée maximale est de 6h")
                .setColor("Red");
                return interaction.reply({embeds: [embed], ephemeral: true});
            } else {
                const embed = new EmbedBuilder()
                .setDescription("💢 - The cooldown is too long. Maxiaml cooldown: 6h")
                .setColor("Red");
                return interaction.reply({embeds: [embed], ephemeral: true});
            }
        }
        if (data.guild.language === "fr") {
            const embed = new EmbedBuilder()
            .setTitle("Mode lent activé")
            .setDescription("Le mode lent a été activé dans ce salon")
            .addFields(
                { name: "Durée", value: cooldown},
                { name: "Modérateur", value: `<@${interaction.member.id}>`}
            )
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
                    { name: "Mode lent", value: `<#${interaction.channel.id}>`},
                    { name: "Durée", value: cooldown},
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
            return interaction.channel.setRateLimitPerUser(d);
        } else {
            const embed = new EmbedBuilder()
            .setTitle("Slowmode enabled")
            .setDescription("Slowmode has been enabled in this channel")
            .addFields(
                { name: "Cooldown", value: cooldown},
                { name: "Moderator", value: `<@${interaction.member.id}>`}
            )
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
                    { name: "Slowmode", value: `<#${interaction.channel.id}>`},
                    { name: "Cooldown", value: cooldown},
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
            return interaction.channel.setRateLimitPerUser(d);
        };
	}
};