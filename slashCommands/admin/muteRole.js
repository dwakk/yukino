const { ApplicationCommandType, EmbedBuilder, PermissionsBitField } = require('discord.js');
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

module.exports = {
	name: "muterole",
    description: "Manage the server's mute role",
    fr: "Gestion du role muet du serveur",
	type: ApplicationCommandType.ChatInput,
	cooldown: 0,
    userPerms: ["Administrator"],
    botPerms: ["ManageRoles"],
    options: [
        {
            name: "set",
            description: "Set the mute role",
            type: 1,
            options: [
                {
                    name: "role",
                    description: "The role you want to set as mute role",
                    type: 8,
                },
            ],
        },
        {
            name: "create",
            description: "Let Yukino create a mute role for you",
            type: 1,
        },
        {
            name: "unset",
            description: "Unset the current mute role as mute role",
            type: 1,
        },
    ],
	run: async (client, interaction, data) => {
        let role = interaction.options.getRole("role");

        if (interaction.options._subcommand === "set") {
            if (data.guild.muteRole === role.id) {
                const embed = new EmbedBuilder()
                .setColor("Red");
                if (data.guild.language === "fr") {
                    embed.setDescription("💢 - Ce rôle est déjà défini comme rôle muet");
                } else {
                    embed.setDescription("💢 - This role is already set as mute role");
                }
                return interaction.reply({embeds: [embed], ephemeral: true});
            }

            data.guild.muteRole = role.id;
            await data.guild.save();

            await interaction.guild.channels.cache.forEach(c => {
                try {
                    c.permissionOverwrites.edit(role, {SendMessages: false});
                } catch (e) {
                    console.log(e);
                };
            });

            if (data.guild.language === "fr") {
                const embed = new EmbedBuilder()
                .setTitle("Role muet")
                .setDescription(`✅- Le rôle <@&${role.id}> est maintenant le rôle muet`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Role muet", value: `<@&${role.id}>`},
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
                .setTitle("Mute role")
                .setDescription(`✅ - The role <@&${role.id}> is now the mute role`)
                .setColor("Green")
                .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
                .setTimestamp();
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Mute role", value: `<@&${role.id}>`},
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

        if (interaction.options._subcommand === "create") {
            if (data.guild.muteRole !== "null") {
                const embed = new EmbedBuilder()
                .setColor("Red");
                if (data.guild.language === "fr") {
                    embed.setDescription(`💢 - Vous devez d'abord supprimer le rôle muet`)
                } else {
                    embed.setDescription("💢 - You must remove the current mute role")
                };
                return interaction.reply({embeds: [embed]});
            };

            const muteRole = await interaction.guild.roles.create({
                name: "Mute",
                permissions: [],
                mentionable: false,
            });

            data.guild.muteRole = muteRole.id;
            await data.guild.save();

            await interaction.guild.channels.cache.forEach(c => {
                try {
                    c.permissionOverwrites.edit(muteRole, {SendMessages: false});
                } catch (e) {
                    console.log(e);
                };
            });

            const embed = new EmbedBuilder()
            .setColor("Green")
            .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
            .setTimestamp();
            if (data.guild.language === "fr") {
                embed.setTitle("Role muet")
                .setDescription(`✅ - Le rôle <@&${muteRole.id}> est maintenant le rôle muet`);
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Role muet", value: `<@&${muteRole.id}>`},
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
                    };
                };
                return interaction.reply({embeds: [embed]});
            } else {
                embed.setTitle("Mute role")
                .setDescription(`✅ - The role <@&${muteRole.id}> is now the mute role`);
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Mute role", value: `<@&${muteRole.id}>`},
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
                    };
                };
                return interaction.reply({embeds: [embed]});
            };
        }

        if (interaction.options._subcommand === "unset") {
            if (data.guild.muteRole === "null") {
                const embed = new EmbedBuilder()
                .setColor("Red");
                if (data.guild.language === "fr") {
                    embed.setDescription("💢 - Il n'y a aucun rôle muet de défini");
                } else {
                    embed.setDescription("💢 - There isn't any mute role in this server");
                };
                return interaction.reply({embeds: [embed], ephemeral: true})
            }

            const role = data.guild.muteRole;

            data.guild.muteRole = "null";
            await data.guild.save();

            const embed = new EmbedBuilder()
            .setColor("Green")
            .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
            .setTimestamp();
            if (data.guild.language === "fr") {
                embed.setTitle("Role muet")
                .setDescription(`✅ - Le rôle <@&${role}> n'est plus le rôle muet`);
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Role muet", value: `aucun`},
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
                    };
                };
                return interaction.reply({embeds: [embed]});
            } else {
                embed.setTitle("Mute role")
                .setDescription(`✅ - The role <@&${role}> isn't the mute role anymore`);
                if (data.guild.addons.logs.enabled === true) {
                    const ch = client.channels.cache.get(data.guild.addons.logs.channel);
                    const log = new EmbedBuilder()
                    .setTitle("Logs: Admin")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields(
                        { name: "Mute role", value: `none`},
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
                    };
                };
                return interaction.reply({embeds: [embed]});
            };
        }
	}
};