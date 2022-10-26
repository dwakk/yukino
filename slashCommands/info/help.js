const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
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
	name: "help",
	description: "Get all my commands",
	fr: "Envoie toutes les commandes",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	options: [
		{
			name: "category",
			description: "The category you want to get help about",
			type: 3,
			required: false,
			choices: [
				{name: "Admin", value: "admin"},
				{name: "Fun", value: "fun"},
				{name: "Info", value: "info"},
				{name: "Moderation", value: "moderation"},
				{name: "Support", value: "support"},
				{name: "Utility", value: "utility"},
			],
		},
	],
	run: async (client, interaction, data) => {

		
		
		//cmd
		let cat = interaction.options.getString("category");
		if (!cat) cat = "global";
		let row;
		if (data.guild.language === "fr") {
			row = new ActionRowBuilder()
				.addComponents(
					new SelectMenuBuilder()
					.setPlaceholder("❓ Menu d'aide")
						.setCustomId("menu")
						.addOptions(
							{
								label: "Aide admin",
								description: "Accédez à l'aide admin",
								value: "admin",
								emoji: "👑",
							},
							{
								label: "Aide fun",
								description: "Accédez à l'aide fun",
								value: "fun",
								emoji: "🎉"
							},
							{
								label: "Aide info",
								description: "Accédez à l'aide info",
								value: "info",
								emoji: "ℹ️",
							},
							{
								label: "Aide moderation",
								description: "Accédez à l'aide moderation",
								value: "moderation",
								emoji: "💼",
							},
							{
								label: "Aide utilitaire",
								description: "Accédez à l'aide utilitaire",
								value: "utility",
								emoji: "🔌",
							},
							{
								label: "Aide support",
								description: "Accédez à l'aide support",
								value: "support",
								emoji: "🔧",
							},
						),
				)
		} else {
			row = new ActionRowBuilder()
				.addComponents(
					new SelectMenuBuilder()
					.setPlaceholder("❓ Help menu")
					.setCustomId("menu")
						.addOptions(
							{
								label: "Help admin",
								description: "Get help about admin commmands",
								value: "admin",
								emoji: "👑",
							},
							{
								label: "Help fun",
								description: "Get help about fun commands",
								value: "fun",
								emoji: "🎉"
							},
							{
								label: "Help info",
								description: "Get help about info commands",
								value: "info",
								emoji: "ℹ️",
							},
							{
								label: "Help moderation",
								description: "Get help about moderation commands",
								value: "moderation",
								emoji: "💼",
							},
							{
								label: "Help utilty",
								description: "Get help about utility commannds",
								value: "utility",
								emoji: "🔌",
							},
							{
								label: "Help support",
								description: "Get help about support commands",
								value: "support",
								emoji: "🔧",
							},
						),
				)
		}



		if (cat === "global") {
			const embed = new EmbedBuilder()
			.setThumbnail(client.user.displayAvatarURL())
			.setColor("Aqua")
			.setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
			.setTimestamp();
			if (data.guild.language === "fr") {
				embed.addFields(
					{name: "👑 - Aide admin", value: "</help:1033078135220097035> admin", inline: true},
					{name: "🎉 - Aide fun", value: "</help:1033078135220097035> fun", inline: true},
					{name: "ℹ️ - Aide info", value: "</help:1033078135220097035> info", inline: true},
					{name: "💼 - Aide modération", value: "</help:1033078135220097035> moderation", inline: true},
					{name: "🔌 - Aide utilitaire", value: "</help:1033078135220097035> utility", inline: true},
					{name: "🔧 - Aide support", value: "</help:1033078135220097035> support", inline: true},
				);
				
			} else {
				embed.addFields(
					{name: "👑 - Help admin", value: "</help:1033078135220097035> admin", inline: true},
					{name: "🎉 - Help fun", value: "</help:1033078135220097035> fun", inline: true},
					{name: "ℹ️ - Help info", value: "</help:1033078135220097035> info", inline: true},
					{name: "💼 - Help moderation", value: "</help:1033078135220097035> moderation", inline: true},
					{name: "🔌 - Help utility", value: "</help:1033078135220097035> utility", inline: true},
					{name: "🔧 - Help support", value: "</help:1033078135220097035> support", inline: true},
				)	;
			};
			return interaction.reply({embeds: [embed], components: [row]});
		}

		if (cat === "admin") {
			const admin = require("../../ressources/cmds");
			const adminfr = require('../../ressources/cmds');
			let a;
			if (data.guild.language === "fr") {
				a = adminfr.adminfr;
			} else {
				a = admin.admin;
			}
			let name = [];
			let desc = [];
			for (let i of range(a.length))
			name.push(a[i].name),
			desc.push(a[i].description);
			name = name.map(n => {
				return `**${n}:**\n`;
			})
			desc = desc.map(d => {
				return `${d}\n\n`;
			})
			let list = [];
			for (let i of range(a.length))
			list.push(name[i], desc[i]);

			const embed = new EmbedBuilder()
			.setThumbnail(client.user.displayAvatarURL())
			.setDescription(list.join(""))
			.setColor("Aqua")
			.setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
			.setTimestamp();
			if(data.guild.language === "fr") {
				embed.setTitle("Aide admin");
			} else{
				embed.setTitle("Help admin");
			}

			return interaction.reply({ embeds: [embed], components: [row]});
		};


		if (cat === "fun") {
			const fun = require("../../ressources/cmds");
			const funfr = require('../../ressources/cmds');
			let a;
			if (data.guild.language === "fr") {
				a = funfr.funfr;
			} else {
				a = fun.fun;
			}
			let name = [];
			let desc = [];
			for (let i of range(a.length))
			name.push(a[i].name),
			desc.push(a[i].description);
			name = name.map(n => {
				return `**${n}:**\n`;
			})
			desc = desc.map(d => {
				return `${d}\n\n`;
			})
			let list = [];
			for (let i of range(a.length))
			list.push(name[i], desc[i]);

			const embed = new EmbedBuilder()
			.setThumbnail(client.user.displayAvatarURL())
			.setDescription(list.join(""))
			.setColor("Aqua")
			.setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
			.setTimestamp();
			if(data.guild.language === "fr") {
				embed.setTitle("Aide fun");
			} else{
				embed.setTitle("Help fun");
			}
			return interaction.reply({ embeds: [embed], components: [row]});
		};


		if (cat === "info") {
			const info = require("../../ressources/cmds");
			const infofr = require('../../ressources/cmds');
			let a;
			if (data.guild.language === "fr") {
				a = infofr.infofr;
			} else {
				a = info.info;
			}
			let name = [];
			let desc = [];
			for (let i of range(a.length))
			name.push(a[i].name),
			desc.push(a[i].description);
			name = name.map(n => {
				return `**${n}:**\n`;
			})
			desc = desc.map(d => {
				return `${d}\n\n`;
			})
			let list = [];
			for (let i of range(a.length))
			list.push(name[i], desc[i]);

			const embed = new EmbedBuilder()
			.setThumbnail(client.user.displayAvatarURL())
			.setDescription(list.join(""))
			.setColor("Aqua")
			.setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
			.setTimestamp();
			if(data.guild.language === "fr") {
				embed.setTitle("Aide info");
			} else{
				embed.setTitle("Help info");
			}
			return interaction.reply({ embeds: [embed], components: [row]});
		};


		if (cat === "moderation") {
			const moderation = require("../../ressources/cmds");
			const moderationfr = require('../../ressources/cmds');
			let a;
			if (data.guild.language === "fr") {
				a = moderation.moderationfr;
			} else {
				a = moderationfr.moderation;
			}
			let name = [];
			let desc = [];
			for (let i of range(a.length))
			name.push(a[i].name),
			desc.push(a[i].description);
			name = name.map(n => {
				return `**${n}:**\n`;
			})
			desc = desc.map(d => {
				return `${d}\n\n`;
			})
			let list = [];
			for (let i of range(a.length))
			list.push(name[i], desc[i]);

			const embed = new EmbedBuilder()
			.setThumbnail(client.user.displayAvatarURL())
			.setDescription(list.join(""))
			.setColor("Aqua")
			.setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
			.setTimestamp();
			if(data.guild.language === "fr") {
				embed.setTitle("Aide modération");
			} else{
				embed.setTitle("Help moderation");
			}
			return interaction.reply({ embeds: [embed], components: [row]});
		};


		if (cat === "utilty") {
			const utility = require("../../ressources/cmds");
			const utilityfr = require('../../ressources/cmds');
			let a;
			if (data.guild.language === "fr") {
				a = utilityfr.utilityfr;
			} else {
				a = utility.utility;
			}
			let name = [];
			let desc = [];
			for (let i of range(a.length))
			name.push(a[i].name),
			desc.push(a[i].description);
			name = name.map(n => {
				return `**${n}:**\n`;
			})
			desc = desc.map(d => {
				return `${d}\n\n`;
			})
			let list = [];
			for (let i of range(a.length))
			list.push(name[i], desc[i]);

			const embed = new EmbedBuilder()
			.setThumbnail(client.user.displayAvatarURL())
			.setDescription(list.join(""))
			.setColor("Aqua")
			.setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
			.setTimestamp();
			if(data.guild.language === "fr") {
				embed.setTitle("Aide utilitaire");
			} else{
				embed.setTitle("Help utility");
			}
			return interaction.reply({ embeds: [embed], components: [row]});
		};

		
		if (cat === "support") {
			const support = require("../../ressources/cmds");
			const supportfr = require('../../ressources/cmds');
			let a;
			if (data.guild.language === "fr") {
				a = supportfr.supportfr;
			} else {
				a = support.support;
			}
			let name = [];
			let desc = [];
			for (let i of range(a.length))
			name.push(a[i].name),
			desc.push(a[i].description);
			name = name.map(n => {
				return `**${n}:**\n`;
			})
			desc = desc.map(d => {
				return `${d}\n\n`;
			})
			let list = [];
			for (let i of range(a.length))
			list.push(name[i], desc[i]);

			const embed = new EmbedBuilder()
			.setThumbnail(client.user.displayAvatarURL())
			.setDescription(list.join(""))
			.setColor("Aqua")
			.setFooter({iconURL: client.user.avatarURL(), text: client.user.tag})
			.setTimestamp();
			if(data.guild.language === "fr") {
				embed.setTitle("Aide support");
			} else{
				embed.setTitle("Help support");
			}
			return interaction.reply({ embeds: [embed], components: [row]});
		}
	}
};