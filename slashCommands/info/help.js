const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const fs = require('fs');
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
			name: "admin",
			description: "Help about the admin commands",
			type: 1,
			required: false,
		},
		{
			name: "fun",
			description: "Help about the fun commands",
			type: 1,
			required: false,
		},
		{
			name: "info",
			description: "Help about the info commands",
			type: 1,
			required: false,
		},
		{
			name: "moderation",
			description: "Help about the moderation commands",
			type: 1,
			required: false,
		},
		{
			name: "utility",
			description: "Help about the utility commands",
			type: 1,
			required: false,
		},
	],
	run: async (client, interaction, data) => {
		const admin = [];
		cmd = fs.readdirSync("./slashCommands/admin").filter(file => file.endsWith(".js"))
		for (const file of cmd) {
			const slashCmd = require(`../../slashCommands/admin/${file}`);
			let desc = slashCmd.description;
			if (data.guild.language === "fr") {
				desc = slashCmd.fr
			}
			admin.push({
				name: slashCmd.name,
				description: desc
			})
		};
		const fun = [];
		cmd = fs.readdirSync("./slashCommands/fun").filter(file => file.endsWith(".js"))
		for (const file of cmd) {
			const slashCmd = require(`../../slashCommands/fun/${file}`);
			let desc = slashCmd.description;
			if (data.guild.language === "fr") {
				desc = slashCmd.fr
			}
			fun.push({
				name: slashCmd.name,
				description: desc
			});
		};
		const info = [];
		cmd = fs.readdirSync("./slashCommands/info").filter(file => file.endsWith(".js"))
		for (const file of cmd) {
			const slashCmd = require(`../../slashCommands/info/${file}`);
			let desc = slashCmd.description;
			if (data.guild.language === "fr") {
				desc = slashCmd.fr
			}
			info.push({
				name: slashCmd.name,
				description: desc
			});
		};
		const moderation = [];
		cmd = fs.readdirSync("./slashCommands/moderation").filter(file => file.endsWith(".js"))
		for (const file of cmd) {
			const slashCmd = require(`../../slashCommands/moderation/${file}`);
			let desc = slashCmd.description;
			if (data.guild.language === "fr") {
				desc = slashCmd.fr
			}
			moderation.push({
				name: slashCmd.name,
				description: desc
			});
		};
		const utility = [];
		cmd = fs.readdirSync("./slashCommands/utility").filter(file => file.endsWith(".js"))
		for (const file of cmd) {
			const slashCmd = require(`../../slashCommands/utility/${file}`);
			let desc = slashCmd.description;
			if (data.guild.language === "fr") {
				desc = slashCmd.fr
			}
			utility.push({
				name: slashCmd.name,
				description: desc
			});
		};
		if (interaction.options._subcommand === "admin") {
			let name = [];
			let desc = [];
			for (let i of range(admin.length))
			name.push(admin[i].name),
			desc.push(admin[i].description);
			name = name.map(n => {
				return `**${n}:**\n`;
			})
			desc = desc.map(d => {
				return `${d}\n\n`;
			})
			let list = [];
			for (let i of range(admin.length))
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
			return interaction.reply({ embeds: [embed]});
		};
	}
};