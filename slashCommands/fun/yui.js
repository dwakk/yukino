const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');
const reddit = require('reddit-fetch')

module.exports = {
	name: "yui",
	description: "Unstable | Get a random pic of Yui (r/Yahallo)",
    fr: "Instable | Envoie une image de Yui (r/Yahallo)",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            name: "nsfw",
            description: "Allow pics tagged as nsfw",
            type: 5,
            required: true,
        }
    ],
	run: async (client, interaction, data) => {
        const nsfw = interaction.options.getBoolean("nsfw");
        if (nsfw === true && interaction.channel.nsfw === false) {
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setDescription("💢 - Le salon n'est pas défini comme NSFW")
                .setColor("Red");
                return interaction.reply({embeds: [embed], ephemeral: true});
            } else {
                const embed = new EmbedBuilder()
                .setDescription("💢 - This channel isn't set as NSFW")
                .setColor("Red");
                return interaction.reply({embeds: [embed], ephemeral: true});
            };
        };
        reddit({
            subreddit: "Yahallo",
            allowNSFW: nsfw,
            allowCrossPost: false,
            allowVideo: false
        }).then(p => {
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setTitle(`Crédits: u/${p.author}`)
                .setImage(p.url)
                .setColor("Fuchsia")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                const actionRow = new ActionRowBuilder()
			    .addComponents([
				    new ButtonBuilder()
    				.setLabel('Source')
	    			.setURL(p.url)
		    		.setStyle(ButtonStyle.Link)
			])
            return interaction.reply({ embeds: [embed], components: [actionRow]});
            } else {
                const embed = new EmbedBuilder()
                .setTitle(`Credits: u/${p.author}`)
                .setImage(p.url)
                .setColor("Fuchsia")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                const actionRow = new ActionRowBuilder()
			    .addComponents([
				    new ButtonBuilder()
    				.setLabel('Source')
	    			.setURL(p.url)
		    		.setStyle(ButtonStyle.Link)
			])
            return interaction.reply({ embeds: [embed], components: [actionRow]});
            }
        });
	}
};