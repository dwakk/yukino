const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const malScraper = require('mal-scraper');
const search = require('acb-api');

module.exports = {
	name: "anime",
	description: "Get informations about anime/anime characters",
    fr: "Donne des informations à propos d'un anime/personnage d'anime",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            name: "search",
            description: "Get informations about an anime",
            type: 1,
            options: [
                {
                    name: "name",
                    description: "Name of the anime you want informations about",
                    type: 3,
                    required: true,
                },
            ],
        },
        {
            name: "character",
            description: "Get informations about a character",
            type: 1,
            options: [
                {
                    name: "name",
                    description: "Name of the character you want informations about",
                    type: 3,
                    required: true,
                },
            ],
        },
        {
            name: "random",
            description: "Get a random character",
            type: 1
        },
    ],
	run: async (client, interaction, data) => {
        let name = interaction.options.getString('name');
        let res;

        if (interaction.options._subcommand === "search") {
            await malScraper.getInfoFromName(name).then(r => {
                res = r;
            });
            const embed = new EmbedBuilder()
            .setTitle(res.englishTitle, res.japaneseTitle)
            .setThumbnail(res.picture)
            .setColor("White")
            .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
            .setTimestamp();

            const row = new ActionRowBuilder()
            .addComponents([
                new ButtonBuilder()
                .setLabel("Image")
                .setURL(res.picture)
                .setStyle("Link")
            ])

            let date = res.aired.split(' ');
            let startDate = date.slice(0, 3).join(" ");
            let endDate = date.slice(4, 7).join(" ");
            let age = res.rating.split(' ');
            age = age.slice(0, 1).join(" ");

            if (data.guild.language === "fr") {
                embed.addFields(
                    {name: "Type", value: res.type, inline: true},
                    {name: "Nombre d'épisodes", value: res.episodes, inline: true},
                    { name: '\u200B', value: '\u200B', inline: true },
                    {name: "Date de début", value: startDate, inline: true},
                    {name: "Date de fin", value: endDate, inline: true},
                    { name: '\u200B', value: '\u200B', inline: true },
                    {name: "Score", value: res.score, inline: true},
                    {name: "Popularité", value: res.popularity, inline: true},
                    { name: '\u200B', value: '\u200B', inline: true },
                    {name: "Restriction d'âge", value: age}
                );
                row.addComponents([
                    new ButtonBuilder()
                    .setLabel("Lien")
                    .setURL(res.url)
                    .setStyle("Link"),
                ])
            } else {
                embed.addFields(
                    {name: "Type", value: res.type, inline: true},
                    {name: "Number of episodes", value: res.episodes, inline: true},
                    { name: '\u200B', value: '\u200B', inline: true },
                    {name: "Start date", value: startDate, inline: true},
                    {name: "End date", value: endDate, inline: true},
                    { name: '\u200B', value: '\u200B', inline: true },
                    {name: "Score", value: res.score, inline: true},
                    {name: "Popularity", value: res.popularity, inline: true},
                    { name: '\u200B', value: '\u200B', inline: true },
                    {name: "Age rating", value: res.rating},
                );
                row.addComponents([
                    new ButtonBuilder()
                    .setLabel("Link")
                    .setURL(res.url)
                    .setStyle("Link"),
                ])
            }
            return interaction.reply({embeds: [embed], components: [row]});
        };

        if (interaction.options._subcommand === "character") {
            await search.get_character_by_search(name).then(r => {
                res = r[0];
            });
            const embed = new EmbedBuilder()
            .setTitle(res.name)
            .setDescription(`Anime: ${res.anime_name}`)
            .setImage(res.character_image)
            .setColor("White")
            .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
            .setTimestamp();
            return interaction.reply({embeds: [embed]});
	    };

        if (interaction.options._subcommand === "random") {
            await search.get_random_character().then(r => {
                res = r
            })
            const embed = new EmbedBuilder()
            .setTitle(res.name)
            .setDescription(`Anime: ${res.origin}`)
            .setImage(res.character_image)
            .setColor("White")
            .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
            .setTimestamp();
            return interaction.reply({embeds: [embed]});
        };
    }
};