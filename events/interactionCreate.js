const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js');
const ms = require('ms');
const client = require('..');
const config = require('../config.json');

const cooldown = new Collection();

client.on('interactionCreate', async interaction => {
	const slashCommand = client.slashCommands.get(interaction.commandName);
	let guildData = await client.database.fetchGuild(interaction.guild.id);
	let data = {};
	data.guild = guildData;
	data.cmd = slashCommand;
	let slow = "COOLDOWN_MESSAGE_EN";
	if (data.guild.language === "fr") {
		slow = "COOLDOWN_MESSAGE_FR";
	}

		if (interaction.type == 4) {
			if(slashCommand.autocomplete) {
				const choices = [];
				await slashCommand.autocomplete(interaction, choices, data);
			}
		}
		if (!interaction.type == 2) return;
	
		if(!slashCommand) return client.slashCommands.delete(interaction.commandName);
		try {
			if(slashCommand.cooldown) {
				if(cooldown.has(`slash-${slashCommand.name}${interaction.user.id}`)) return interaction.reply({ content: config.messages[slow].replace('<duration>', ms(cooldown.get(`slash-${slashCommand.name}${interaction.user.id}`) - Date.now(), {long : true}) ) });
				if(slashCommand.userPerms || slashCommand.botPerms) {
					if(!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
						if (data.guild.language === "fr") {
							const userPerms = new EmbedBuilder()
							.setDescription(`🚫 - ${interaction.user}, Vous devez avoir la permission \`${slashCommand.userPerms}\` pour exécuter cette commande!`)
							.setColor('Red')
							return interaction.reply({ embeds: [userPerms] });
						} else {
							const userPerms = new EmbedBuilder()
							.setDescription(`🚫 - ${interaction.user}, You don't have \`${slashCommand.userPerms}\` permissions to use this command!`)
							.setColor('Red')
							return interaction.reply({ embeds: [userPerms] });
						}
					}
					if(!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
						if (data.guild.language === "fr") {
							const botPerms = new EmbedBuilder()
							.setDescription(`🚫 - ${interaction.user}, Je n'ai pas la permission \`${slashCommand.botPerms}\` pour exécuter cette commande!`)
							.setColor('Red')
							return interaction.reply({ embeds: [botPerms] });
						} else {
							const botPerms = new EmbedBuilder()
							.setDescription(`🚫 - ${interaction.user}, I don't have \`${slashCommand.botPerms}\` permissions to use this command!`)
							.setColor('Red')
							return interaction.reply({ embeds: [botPerms] });
						}
					}

				}

					await slashCommand.run(client, interaction, data);
					cooldown.set(`slash-${slashCommand.name}${interaction.user.id}`, Date.now() + slashCommand.cooldown);
					setTimeout(() => {
							cooldown.delete(`slash-${slashCommand.name}${interaction.user.id}`)
					}, slashCommand.cooldown);
			} else {
				if(slashCommand.userPerms || slashCommand.botPerms) {
					if(!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
						if (data.guild.language === "fr") {
							const userPerms = new EmbedBuilder()
							.setDescription(`🚫 - ${interaction.user}, Vous n'avez pas la permission \`${slashCommand.userPerms}\` pour exécuter cette commande!`)
							.setColor('Red')
							return interaction.reply({ embeds: [userPerms] });
						} else {
							const userPerms = new EmbedBuilder()
							.setDescription(`🚫 - ${interaction.user}, You don't have \`${slashCommand.userPerms}\` permissions to use this command!`)
							.setColor('Red')
							return interaction.reply({ embeds: [userPerms] });
						}
					}
					if(!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
						if (data.guild.language === "fr") {
							const botPerms = new EmbedBuilder()
							.setDescription(`🚫 - ${interaction.user}, Je n'ai pas la permissions \`${slashCommand.botPerms}\` pour exécuter cette commande!`)
							.setColor('Red')
							return interaction.reply({ embeds: [botPerms] });
						} else {
							const botPerms = new EmbedBuilder()
							.setDescription(`🚫 - ${interaction.user}, I don't have \`${slashCommand.botPerms}\` permissions to use this command!`)
							.setColor('Red')
							return interaction.reply({ embeds: [botPerms] });
						}
					}

				}
					await slashCommand.run(client, interaction, data);
			}
		} catch (error) {
				console.log(error);
		}
});