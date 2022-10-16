const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
const trad = require('translate-google')

module.exports = {
	name: "translate",
	description: "Fast translation",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            name: "language",
            description: "Language you want to translate to",
            type: 3,
            required: true,
            choices: [
                {name: "German (de)", value: "de"},
                {name: "English (en)", value: "en"},
                {name: "Arab (ar)", value: "ar"},
                {name: "Chinese (zh)", value: "zh"},
                {name: "Korean (ko)", value: "ko"},
                {name: "Danish (dn)", value: "dn"},
                {name: "Spanish (es)", value: "es"},
                {name: "Estonian (et)", value: "et"},
                {name: "Finish (fi)", value: "fi"},
                {name: "French (fr)", value: "fr"},
                {name: "Greek (el)", value: "el"},
                {name: "Hebrew (he)", value: "he"},
                {name: "Italian (it)", value: "it"},
                {name: "Japanese (jp)", value: "ja"},
                {name: "Dutch (nl)", value: "nl"},
                {name: "Norwegian (no)", value: "no"},
                {name: "Polish (pl)", value: "pl"},
                {name: "Portuguese (pt)", value: "pt"},
                {name: "Russian (ru)", value: "ru"},
                {name: "Swedish (sv)", value: "sv"},
                {name: "Turkish (tr)", value: "tr"},
                {name: "Ukranian (uk)", value: "uk"},
            ],
        },
        {
            name: "text",
            description: "Text you want to translate",
            type: 3,
            required: true,
        },
    ],
	run: async (client, interaction, data) => {
        let langue = interaction.options.getString('language');
        let texte = interaction.options.getString('text');
        trad(texte, {to: langue}).then(r => {
            if (data.guild.language === "fr") {
                trad(langue, {to :"fr"}).then(l => {
                    langue = l
                });
                const embed = new EmbedBuilder()
                .setTitle(`Traduction en **${langue}**`)
                .setDescription(r)
                .setColor("Aqua")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                return interaction.reply({embeds: [embed]});
            } else {
                const embed = new EmbedBuilder()
                .setTitle(`Translation in **${langue}**`)
                .setDescription(r)
                .setColor("Aqua")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                return interaction.reply({embeds: [embed]});
            };
            
	}).catch(e => {
        if (data.guild.language === "fr") {
            const errembed = new EmbedBuilder()
            .setDescription(':x: - Une erreur est survenue, peut-être un caractère non supporté ?')
            .setColor('Red');
            console.log(e);
            return interaction.reply({embeds: [errembed]})
        } else {
            const errembed = new EmbedBuilder()
            .setDescription(':x: - An error occured, maybe an unsupported character ?')
            .setColor('Red');
            console.log(e);
            return interaction.reply({embeds: [errembed]})
        };
        });
    }
};