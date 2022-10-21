const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');
const weather = require('weather-js');

module.exports = {
	name: "weather",
	description: "Get the weather of a location",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            name: 'location',
            description: 'The location you want to get the weather',
            type: 3,
            required: true,
        },
        {
            name: "degreetype",
            description: "The degree type you want to get the weather",
            type: 3,
            required: true,
            choices: [
                {name: "Celcius", value: "C"},
                {name: "Fahrenheit", value: "F"},
                {name: "Kelvin", value: "K"}
            ]
        }

    ],
    run: async(client, interaction, data) => {
        let ville = interaction.options.getString('location');
        let degreeType = interaction.options.getString('degreetype');
        if (ville.lenght <= 1 || !isNaN(ville)) return interaction.reply({content: ":x: - Invalid name", ephemeral: true});

        weather.find({search: ville, degreeType: degreeType, lang: data.guild.language}, function(err, result) {
            if(err) console.log(err).then(() => {
                const embed = new EmbedBuilder()
                .setDescription(":x: - An error occured, maybe an invalid location ?")
                .setColor("Red");
                return interaction.reply({embeds: [embed], ephemeral: true});
            });

            if(!result[0]) {
                const embed = new EmbedBuilder()
                .setDescription(":x: - Invalid location")
                .setColor("Red");
                return interaction.reply({embeds: [embed], ephemeral: true});
            };

            let ville = result[0].location.name;
            let url = result[0].current.imageUrl;
            let date = result[0].current.day;
            let temp = result[0].current.temperature;
            let ressenti = result[0].current.feelslike;
            let humid = result[0].current.humidity;
            let vent = result[0].current.winddisplay;
            date = date.charAt(0).toUpperCase() + date.slice(1);

            if (degreeType === "C") {
                degreeType = "Celcius"
            } else if (degreeType === "F") {
                degreeType = "Fahrenheit"
            } else if (degreeType === "K") {
                degreeType = "Kelvin"
            };

            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setTitle("Météo")
                .setDescription(`Voici la météo à **${ville}** en **${degreeType}**`)
                .setThumbnail(url)
                .addFields(
                    { name: "**Date**", value: date, inline: true },
                    { name: "**Température**", value: `${temp}°${degreeType.charAt(0).toUpperCase()}`, inline: true },
                    { name: "**Ressenti**", value: `${ressenti}°${degreeType.charAt(0).toUpperCase()}`, inline: true },
                    { name: "**Humidité**", value: `${humid}%`, inline: true},
                    { name: "**Vend**", value: vent, inline: true },
                )
                .setColor("Aqua")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                return interaction.reply({embeds: [embed]});
            } else {
                const embed = new EmbedBuilder()
                .setTitle("Weather")
                .setDescription(`Weather informations for **${ville}** in **${degreeType}**`)
                .setThumbnail(url)
                .addFields(
                    { name: "**Date**", value: date, inline: true },
                    { name: "**Temperature**", value: `${temp}°${degreeType.charAt(0).toUpperCase()}`, inline: true },
                    { name: "**Feels like**", value: `${ressenti}°${degreeType.charAt(0).toUpperCase()}`, inline: true },
                    { name: "**Humidity**", value: `${humid}%`, inline: true},
                    { name: "**Wind**", value: vent, inline: true },
                )
                .setColor("Aqua")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                return interaction.reply({embeds: [embed]});
            }
          }
        )

    }
};
