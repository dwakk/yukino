const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');
const weather = require('weather-js');
const geoRev = require('geo-reverse');

module.exports = {
	name: "meteo",
	description: "Donne la météo dans une ville spécifique",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            name: 'ville',
            description: 'La ville dont vous souhaitez obtenir la météo',
            type: ApplicationCommandOptionType.String,
            required: true,
        }

    ],
    run: async(client, interaction) => {
        let ville = interaction.options.getString('ville');
        if (ville.lenght < 2 || !isNaN(ville)) return interaction.reply({content: ":x: - Format invalide", ephemeral: true});

        weather.find({search: `${ville}`, degreeType: 'C', lang: 'fr'}, function(err, result) {
            if(err) console.log(err);

            let ville = result[0].location.name;
            ville = ville.split(",")[0];

            let url = result[0].current.imageUrl;
            let date = result[0].current.day;
            let temp = result[0].current.temperature;
            let ressenti = result[0].current.feelslike;
            let humid = result[0].current.humidity;
            let vent = result[0].current.winddisplay;

            date = date.charAt(0).toUpperCase() + date.slice(1);

            let lat = result[0].location.lat;
            let long = result[0].location.long;
            lat = lat.replace(/,/g, '.');
            long = long.replace(/,/g, '.');

            let data = geoRev.country(lat, long, "fr");
            let pays = data[0].name;


            const embed = new EmbedBuilder()
            .setTitle("Météo")
            .setDescription(`Voici les informations météorologiques pour **${ville}, ${pays}**`)
            .setThumbnail(url)
            .addFields(
                { name: "**Jour**", value: `${date}`, inline: true },
                { name: "**Température**", value: `${temp}°C`, inline: true },
                { name: "**Ressenti**", value: `${ressenti}°C`, inline: true },
                { name: "**Humidité**", value: `${humid}%`, inline: true},
                { name: "**Vent**", value: `${vent}`, inline: true },
            )
            .setColor("Aqua")
            .setFooter({iconURL: client.user.avatarURL(), text: `${client.user.tag}`})
            .setTimestamp()

            return interaction.reply({embeds: [embed]});
          });

    }
};
