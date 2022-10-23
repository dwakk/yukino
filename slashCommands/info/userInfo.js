const { ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = {
	name: "userinfo",
	description: "Get informations about a member or yourself",
    fr: "Envoie des informations sur un membre ou sur vous-même",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            name: "member",
            description: "The member you want to get informations about",
            type: 6,
            required: false,
        }
    ],
	run: async (client, interaction, data) => {
        let member = interaction.options.getUser("member")
        if (!member) {
            member = interaction.member
        }
        let allRoles = member.roles.cache
            .filter((r) => r.id !== interaction.guild.id)
            .map((r) => r.toString())
        let amount = allRoles.length
        if (amount > 25) {
            amount = 25
            allRoles = allRoles.slice(0, 25)
        }
        allRoles = allRoles.join()
        if (data.guild.language === "fr") {
            let nick = member.nickname
            const embed = new EmbedBuilder()
            .setAuthor({ iconURL: member.user.displayAvatarURL({ dynamic: true }), name: member.user.tag})
            .setDescription(`<@${member.id}>`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: "ID", value: `${member.id}` },
                { name: "Pseudo", value: `${nick ? nick: "Aucun"}` },
                { name: "Date de création", value: `<t:${Math.floor(member.user.createdTimestamp/1000)}> (<t:${Math.floor(member.user.createdTimestamp/1000)}:R>)` },
                { name: "Date d'arrivée", value: `<t:${Math.floor(member.joinedTimestamp/1000)}> (<t:${Math.floor(member.joinedTimestamp/1000)}:R>)` },
                { name: `Rôles [${amount}]`, value: allRoles }
            )
            .setColor("Aqua")
            .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
            .setTimestamp();
            return interaction.reply({ embeds: [embed]});
        } else {
            let nick = member.nickname
            const embed = new EmbedBuilder()
            .setAuthor({ iconURL: member.user.displayAvatarURL({ dynamic: true }), name: member.user.tag})
            .setDescription(`<@${member.id}>`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: "ID", value: `${member.id}` },
                { name: "Nickname", value: `${nick ? nick: "None"}` },
                { name: "Account creation date", value: `<t:${Math.floor(member.user.createdTimestamp/1000)}> (<t:${Math.floor(member.user.createdTimestamp/1000)}:R>)` },
                { name: "Join date", value: `<t:${Math.floor(member.joinedTimestamp/1000)}> (<t:${Math.floor(member.joinedTimestamp/1000)}:R>)` },
                { name: `Roles [${amount}]`, value: allRoles }
            )
            .setColor("Aqua")
            .setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
            .setTimestamp();
            return interaction.reply({ embeds: [embed]});
        };
	}
};