const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');
const reddit = require('reddit-fetch')

module.exports = {
	name: "oregairu",
	description: "Unstable | Get a random pic of Oreigaru (from r/OreGairuSNAFU)",
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
                .setDescription(":x: - Le salon n'est pas défini comme NSFW")
                .setColor("Red");
                return interaction.reply({embeds: [embed], ephemeral: true});
            } else {
                const embed = new EmbedBuilder()
                .setDescription(":x: - This channel isn't set as NSFW")
                .setColor("Red");
                return interaction.reply({embeds: [embed], ephemeral: true});
            };
        };
        reddit({
            subreddit: "OreGairuSNAFU",
            allowNSFW: nsfw,
            allowCrossPost: false,
            allowVideo: false
        }).then(p => {
            console.log(p)
            const img = p.url
            const author = p.author
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setTitle(`Crédits: u/${author}`)
                .setImage(img)
                .setColor("Fuchsia")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                const actionRow = new ActionRowBuilder()
			    .addComponents([
				    new ButtonBuilder()
    				.setLabel('Source')
	    			.setURL(img)
		    		.setStyle(ButtonStyle.Link)
			])
            return interaction.reply({ embeds: [embed], components: [actionRow]});
            } else {
                const embed = new EmbedBuilder()
                .setTitle(`Credits: u/${author}`)
                .setImage(img)
                .setColor("Fuchsia")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                const actionRow = new ActionRowBuilder()
			    .addComponents([
				    new ButtonBuilder()
    				.setLabel('Source')
	    			.setURL(img)
		    		.setStyle(ButtonStyle.Link)
			])
            return interaction.reply({ embeds: [embed], components: [actionRow]});
            }
        });
	}
};