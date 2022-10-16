const { ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = {
	name: "serverinfo",
	description: "Get informations about the server",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	run: async (client, interaction, data) => {
		let roles = interaction.guild.roles.cache
            .filter((r) => r.id !== interaction.guild.id)
			.map((r) => r.toString());
        let channels = interaction.guild.channels.cache
			.map((c) => c.toString());
		let o = interaction.guild.members.cache.get(interaction.guild.ownerId)
		if (data.guild.language === "fr") {
			const embed = new EmbedBuilder()
			.setAuthor({ iconURL: interaction.guild.iconURL(), name: interaction.guild.name})
			.setThumbnail(interaction.guild.iconURL({ dynamic: true}))
			.addFields(
				{ name: "ID", value: interaction.guild.id},
				{ name: "Date de création", value: `<t:${Math.floor(interaction.guild.createdTimestamp/1000)}> (<t:${Math.floor(interaction.guild.createdTimestamp/1000)}:R>)` },
				{ name: "Propriétaire", value: `<@${interaction.guild.ownerId}> \`(${o.user.tag})\``},
				{ name: "Membres", value: `${interaction.guild.memberCount}`},
				{ name: "Boosts du serveur", value: `${interaction.guild.premiumSubscriptionCount} Boosts \`(Niveau ${interaction.guild.premiumTier})\``},
				{ name: "Salons", value: `${channels.length}`},
				{ name: "Rôles", value: `${roles.length}`},
			)
			.setColor("Aqua")
			.setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
			.setTimestamp();
			return interaction.reply({ embeds: [embed]});
		} else {
			const embed = new EmbedBuilder()
			.setAuthor({ iconURL: interaction.guild.iconURL(), name: interaction.guild.name})
			.setThumbnail(interaction.guild.iconURL({ dynamic: true}))
			.addFields(
				{ name: "ID", value: interaction.guild.id},
				{ name: "Creation date", value: `<t:${Math.floor(interaction.guild.createdTimestamp/1000)}> (<t:${Math.floor(interaction.guild.createdTimestamp/1000)}:R>)` },
				{ name: "Owner", value: `<@${interaction.guild.ownerId}> \`(${o.user.tag})\``},
				{ name: "Members", value: `${interaction.guild.memberCount}`},
				{ name: "Server boosts", value: `${interaction.guild.premiumSubscriptionCount} Boosts \`(Level ${interaction.guild.premiumTier})\``},
				{ name: "Channels", value: `${channels.length}`},
				{ name: "Roles", value: `${roles.length}`},
			)
			.setColor("Aqua")
			.setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
			.setTimestamp();
			return interaction.reply({ embeds: [embed]});
		}
	}
};