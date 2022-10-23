const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

module.exports = {
	name: "clear",
	description: "Delete a certain amount of messages",
    fr: "Supprime un certain nombre de messages",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
    userPerms: ["ManageChannels"],
    botPerms: ["ManageChannels"],
    options: [
        {
            name: "number",
            description: "Amount of messages you want to delete",
            type: 4,
            required: true,
            min_value: 1,
            max_value: 99,
        },
    ],
	run: async (client, interaction, data) => {
        let nombre =  interaction.options.getInteger('number')
        let mbr = interaction.member.id
        let e = "Suppression en cours..."
        if (data.guild.language === "en") {
            e = "Deleting messages..."
        }
        interaction.reply(e)
        interaction.channel.bulkDelete(nombre).then(() => {
            interaction.deleteReply()
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setTitle("Messages supprimés")
                .setDescription(`${nombre} messages ont été supprimés par <@${mbr}>`)
                .setColor('Green')
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Modération")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Clear", value: `<#${interaction.channel.id}>`},
                        { name: "Nombre", value: `\`${nombre}\``},
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
                return interaction.channel.send({embeds: [embed]});
            } else {
                const embed = new EmbedBuilder()
                .setTitle("Messages cleared")
                .setDescription(`${nombre} messages have been deleted by <@${mbr}>`)
                .setColor('Green')
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Moderation")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Clear", value: `<#${interaction.channel.id}>`},
                        { name: "Amount", value: `\`${nombre}\``},
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
                return interaction.channel.send({embeds: [embed]});
            }
        }
	)}
};
