const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        stop = start;
        start = 0;
    }
    if (typeof step == 'undefined') {
        step = 1;
    }
    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }
    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }
    return result;
};

module.exports = {
	name: "wordfilter",
	description: "Manage the wordfilter system",
    fr: "Gestion du système de filtrage de mots",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    userPerms: ["Administrator"],
    options: [
        {
            name: "enable",
            description: "Enable the wordfilter",
            type: 1,
        },
        {
            name: "disable",
            description: "Disable the wordfilter",
            type: 1,
        },
        {
            name: "add",
            description: "Add a word to the wordfilter",
            type: 1,
            options: [
                {
                    name: "word",
                    description: "The word you want to add to the wordfilter",
                    type: 3,
                    required: true,
                },
            ],
        },
        {
            name: "remove",
            description: "Remove a words from the wordfilter",
            type: 1,
            options: [
                {
                    name: "word",
                    description: "The word you want to remove from the wordfilter",
                    type: 3,
                    required: true,
                },
            ],
        },
        {
            name: "show",
            description: "Show the server's filtered words list",
            type: 1,
        },
    ],
	run: async (client, interaction, data) => {
        if (interaction.options._subcommand === "enable") {
            if (data.guild.addons.wordfilter.enabled === true) {
                const embed = new EmbedBuilder()
                .setColor('Red');
                if (data.guild.language === "fr") {
                    embed.setDescription("💢 - Le filtrage de mots est déjà activé")
                } else {
                    embed.setDescription("💢 - The wordfilter is already enabled")
                };
                return interaction.reply({embeds: [embed], ephemeral: true});
            };

            data.guild.addons.wordfilter.enabled = true;
            await data.guild.save();

            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setTitle("Filtrage de mots")
                .setDescription(`✅ - Le filtrage de mots est maintenant activé`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Filtrage de mot", value: `\`activé\``},
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
                .setTitle("Wordfilter")
                .setDescription(`✅ -The wordfilter is now enabled`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Wordfilter", value: `\`enabled\``},
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


        if (interaction.options._subcommand === "disable") {
            if (data.guild.addons.wordfilter.enabled === false) {
                const embed = new EmbedBuilder()
                .setColor('Red');
                if (data.guild.language === "fr") {
                    embed.setDescription("💢 - Le filtrage de mots est déjà déactivé")
                } else {
                    embed.setDescription("💢 - The wordfilter is already disabled")
                };
                return interaction.reply({embeds: [embed], ephemeral: true});
            };

            data.guild.addons.wordfilter.enabled = false;
            await data.guild.save();

            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setTitle("Filtrage de mots")
                .setDescription(`✅ - Le filtrage de mots est maintenant désactivé`)
                .setColor("Orange")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Filtrage de mot", value: `\`désactivé\``},
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
                .setTitle("Wordfilter")
                .setDescription(`✅ -The wordfilter is now disabled`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Wordfilter", value: `\`disabled\``},
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


        if (interaction .options._subcommand === "show") {
            if (data.guild.addons.wordfilter.enabled === false) {
                const embed = new EmbedBuilder()
                .setColor("Red");
                if (data.guild.language === "fr") {
                    embed.setDescription("💢 - Le filtrage de mots est désactivé");
                } else {
                    embed.setDescription("💢 - The wordfilter is disabled");
                };
                return interaction.reply({embeds: [embed], ephemeral: true});
            };

            let words = [];
            let list = data.guild.addons.wordfilter.words;
            for (let i of range(list.length))
            words.push(list[i])
            words = words.map(w => {
                return `${w}\n`
            });
            if (words.length < 1) {
                if (data.guild.language === "fr") {
                    words.push("Aucun mots interdits");
                } else words.push("No words are forbidden");
            }
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setTitle("Filtrage de mot du serveur")
                .setDescription(`Les messages contenant ces mots seront supprimés, à l'exception de ces membres:\n\`administrateurs\`\n\`whitelist\`\n\n${words.join("")}`)
                .setColor("White")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                return interaction.reply({embeds: [embed]});
            } else {
                const embed = new EmbedBuilder()
                .setTitle("Server's wordfilter")
                .setDescription(`Messages containing these words will be deleted, except for these members:\n\`administrators\`\n\`whitelist\`\n\n${words.join("")}`)
                .setColor("White")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                return interaction.reply({embeds: [embed]});
            }
        }

        let word =  interaction.options.getString("word");
        word = word.toLowerCase()
        let words = data.guild.addons.wordfilter.words;
        if (interaction.options._subcommand === "add") {
            if (words.includes(word)) {
                if (data.guild.language === "fr") {
                    const embed = new EmbedBuilder()
                    .setDescription("💢 - Ce mot est déjà interdit")
                    .setColor("Red");
                    return interaction.reply({embeds: [embed], ephemeral: true});
                } else {
                    const embed = new EmbedBuilder()
                    .setDescription("💢 - This word is already forbidden")
                    .setColor("Red");
                    return interaction.reply({embeds: [embed], ephemeral: true});
                };
            };
            
            data.guild.addons.wordfilter.words.push(word);
            await data.guild.save();
            
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setTitle("Filtrage de mots")
                .setDescription(`✅ - Le mot ${word} est maintenant interdit`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Filtrage de mots", value: "`ajout`"},
                        { name: "Mot", value: `\`${word}\``},
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
                .setTitle("Wordfilter")
                .setDescription(`✅ - The word ${word} is now forbidden`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Wordfilter", value: "`add`"},
                        { name: "Word", value: `\`${word}\``},
                        { name: "Admin:", value: `<@${interaction.member.id}>`}
                    )
                    .setColor("Blurple")
                    .setFooter({iconURL: interaction.guild.iconURL(), text: interaction.guild.name})
                    .setTimestamp();
                    if (!ch) {
                        const embed = new EmbedBuilder()
                        .setDescription("Logs channel not found. It has maybe been deleted!")
                        .setColor("Red");
                        interaction.channel.send({embeds: [embed], ephemeral: true});
                    } else {
                        ch.send({embeds: [log]});
                    }
                }
                return interaction.reply({embeds: [embed]});
            };
        };


        if (interaction.options._subcommand === "remove") {
            if (!words.includes(word)) {
                if (data.guild.language === "fr") {
                    const embed = new EmbedBuilder()
                    .setDescription("💢 - Ce mot n'est pas dans la interdit")
                    .setColor("Red");
                    return interaction.reply({embeds: [embed], ephemeral: true});
                } else {
                    const embed = new EmbedBuilder()
                    .setDescription("💢 - This word is not forbidden")
                    .setColor("Red");
                    return interaction.reply({embeds: [embed], ephemeral: true});
                };
            };
            
            data.guild.addons.wordfilter.words.pull(word);
            await data.guild.save();

            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setTitle("Filtrage de mots")
                .setDescription(`✅ - Le mot ${word} n'est plus interdit`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Filtrage de mots", value: "`suppression`"},
                        { name: "Mot", value: `\`${word}\``},
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
                .setTitle("Wordfilter")
                .setDescription(`✅ - The word ${word} is not forbidden anymore`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Wordfilter", value: "`remove`"},
                        { name: "Word", value: `\`${word}\``},
                        { name: "Admin:", value: `<@${interaction.member.id}>`}
                    )
                    .setC
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