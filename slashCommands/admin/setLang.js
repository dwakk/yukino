const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

module.exports = {
	name: "setlang",
    description: "Change Yukino's language",
	type: ApplicationCommandType.ChatInput,
	cooldown: 0,
    userPerms: ["Administrator"],
    options: [
        {
            name: "language",
            description: "The language you want Yukino to be",
            type: 3,
            required: true,
            choices: [
                { name: "English", value: "en"},
                { name: "Français", value: "fr"},
            ]
        }
    ],
	run: async (client, interaction, data) => {
        let lang = interaction.options.getString('language');
        if (data.guild.language === lang) {
            if (lang === "fr") {
                const embed = new EmbedBuilder()
                .setDescription("💢 - Je suis déjà en français!")
                .setColor("Aqua");
                return interaction.reply({embeds: [embed], ephemeral: true});
            } else {
                const embed = new EmbedBuilder()
                .setDescription("💢 - My language is already set to english!")
                .setColor("Aqua");
                return interaction.reply({embeds: [embed], ephemeral: true});
            };
        } else {
            data.guild.language = lang;
            await data.guild.save();
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setTitle("Langue changée")
                .setDescription("✅ - Je suis maintenant en français!")
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Langue", value: "`français`"},
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
                .setTitle("Language changed")
                .setDescription("✅ - My language is now english!")
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Language", value: "`english`"},
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
                }
                return interaction.reply({embeds: [embed]});
            };
        };
	}
};