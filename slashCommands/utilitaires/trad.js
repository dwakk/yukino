const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
const trad = require('translate-google')

module.exports = {
	name: "trad",
	description: "Traducteur automatique",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            name: "langue",
            description: "Langue du texte traduit",
            type: 3,
            reqired: true,
            choices: [
                {name: "Allemand", value: "de"},
                {name: "Anglais", value: "en"},
                {name: "Arabe", value: "ar"},
                {name: "Chinois", value: "zh"},
                {name: "Coréen", value: "ko"},
                {name: "Danois", value: "dn"},
                {name: "Espagnol", value: "es"},
                {name: "Estonien", value: "et"},
                {name: "Finlandais", value: "fi"},
                {name: "Français", value: "fr"},
                {name: "Grec", value: "el"},
                {name: "Hébreux", value: "he"},
                {name: "Italien", value: "it"},
                {name: "Japonais", value: "ja"},
                {name: "Néerlandais", value: "nl"},
                {name: "Norvégien", value: "no"},
                {name: "Polonais", value: "pl"},
                {name: "Portugais", value: "pt"},
                {name: "Russe", value: "ru"},
                {name: "Suédois", value: "sv"},
                {name: "Turque", value: "tr"},
                {name: "Ukrainien", value: "uk"},
            ],
        },
        {
            name: "texte",
            description: "Texte à traduire",
            type: 3,
            require: true,
        },
    ],
	run: async (client, interaction) => {
        let langue = interaction.options.getString('langue');
        let texte = interaction.options.getString('texte');
        const errembed = new EmbedBuilder()
        .setDescription(':x: - Une erreur est survenue, peut-être un caractère non supporté ?')
        .setColor('Red')

        trad(texte, {to: langue}).then(r => {
            const embed = new EmbedBuilder()
            .setTitle(`Traduction terminée *(${langue})*`)
            .setDescription(r)
            .setColor("Aqua")
            .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
            .setTimestamp()
            interaction.reply({embeds: [embed]}).catch(() => {
                interaction.reply({embeds: [errembed]}).catch(() => {
                    interaction.channel.send({embeds: [errembed]});
                })
            })
            
	}).catch(e => {
        console.log(e);
        interaction.reply({embeds: [errembed]}).catch(() => {
            interaction.channel.send({embeds: [errembed]});
        })
        
    })
 
    }
}