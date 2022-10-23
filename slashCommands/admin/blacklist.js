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
	name: "blacklist",
	description: "Manage the blacklist system",
    fr: "Gestion du système de blacklist",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    userPerms: ["Administrator"],
    options: [
        {
            name: "add",
            description: "Add a member to the blacklist",
            type: 1,
            options: [
                {
                    name: "member",
                    description: "The member you want to add to the blacklist",
                    type: 6,
                    required: true,
                },
            ],
        },
        {
            name: "remove",
            description: "Remove a member from the blacklist",
            type: 1,
            options: [
                {
                    name: "member",
                    description: "The member you want to remove from the blacklist",
                    type: 6,
                    required: true,
                },
            ],
        },
        {
            name: "show",
            description: "Show the server's blacklist",
            type: 1,
        },
    ],
	run: async (client, interaction, data) => {
        if (interaction .options._subcommand === "show") {
            let ids = [];
            let list = data.guild.blacklist;
            for (let i of range(list.length))
            ids.push(list[i])
            ids = ids.map(id => {
                return `<@${id}>\n`
            });
            if (ids.length < 1) {
                if (data.guild.language === "fr") {
                    ids = "La blacklist est vide";
                } else ids = "The blacklist is empty";
            }
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setTitle("Blacklist du serveur")
                .setDescription(`Les membres blacklist ne peuvent pas effectuer de commandes\n${ids.join("")}`)
                .setColor("White")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                return interaction.reply({embeds: [embed]});
            } else {
                const embed = new EmbedBuilder()
                .setTitle("Server's blacklist")
                .setDescription(`Blacklisted members can't execute my commands\n${ids}`)
                .setColor("White")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                return interaction.reply({embeds: [embed]});
            }
        }
        let member =  interaction.options.getUser("member");
        let bl = data.guild.blacklist;
        if (interaction.options._subcommand === "add") {
            if (bl.includes(member.id)) {
                if (data.guild.language === "fr") {
                    const embed = new EmbedBuilder()
                    .setDescription("💢 - Ce membre est déjà blacklist")
                    .setColor("Red");
                    return interaction.reply({embeds: [embed], ephemeral: true});
                } else {
                    const embed = new EmbedBuilder()
                    .setDescription("💢 - This member is already blacklisted")
                    .setColor("Red");
                    return interaction.reply({embeds: [embed], ephemeral: true});
                };
            };
            
            data.guild.blacklist.push(member.id);
            await data.guild.save();
            
            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setTitle("Membre blacklist")
                .setDescription(`✅ - @<${member.id}> est maintenant blacklist`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Blacklist", value: `<@${member.id}>`},
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
                .setTitle("Member blacklisted")
                .setDescription(`✅ - <@${member.id}> is now blacklisted`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Blacklist", value: `<@${member.id}>`},
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
        if (interaction.options._subcommand === "remove") {
            if (!bl.includes(member.id)) {
                if (data.guild.language === "fr") {
                    const embed = new EmbedBuilder()
                    .setDescription("💢 - Ce membre n'est pas dans la blacklist")
                    .setColor("Red");
                    return interaction.reply({embeds: [embed], ephemeral: true});
                } else {
                    const embed = new EmbedBuilder()
                    .setDescription("💢 - This member is not blacklisted")
                    .setColor("Red");
                    return interaction.reply({embeds: [embed], ephemeral: true});
                };
            };
            
            data.guild.blacklist.pull(member.id);
            await data.guild.save();

            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setTitle("Membre unblacklist")
                .setDescription(`✅ - @<${member.id}> a été retiré de la blacklist`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Unblacklist", value: `<@${member.id}>`},
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
                .setTitle("Member unblacklisted")
                .setDescription(`✅ - <@${member.id}> is now unblacklisted`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Unblacklist", value: `<@${member.id}>`},
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