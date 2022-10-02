const { ActivityType } = require('discord.js');
const client = require('..');
const chalk = require('chalk');

client.on("ready", () => {
	const activities = [
		{ name: `${client.guilds.cache.size} Serveurs`, type: ActivityType.Listening },
		{ name: `${client.users.cache.size} Utilisateurs`, type: ActivityType.Watching },
		{ name: `Commandes Slash!`, type: ActivityType.Playing }
	];
	let i = 0;
	setInterval(() => {
		if(i >= activities.length) i = 0
		client.user.setActivity(activities[i])
		i++;
	}, 5000);

	client.user.setStatus("idle")
	console.log(chalk.red(`[CLIENT]: Connecté sur ${client.user.tag}!`))
});
