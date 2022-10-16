const { ActivityType } = require('discord.js');
const client = require('..');
const chalk = require('chalk');

client.on("ready", () => {
	const activities = [
		{ name: `${client.guilds.cache.size} Servers`, type: ActivityType.Listening },
		{ name: `${client.users.cache.size} Users`, type: ActivityType.Watching },
		{ name: `Slash Commands!`, type: ActivityType.Playing },
		{ name: "Bilingual!", type: ActivityType.Streaming},
	];
	let i = 0;
	setInterval(() => {
		if(i >= activities.length) i = 0
		client.user.setActivity(activities[i]);
		i++;
	}, 5000);

	client.user.setStatus("idle");
	console.log(chalk.green(`[CLIENT]: Connecté sur ${client.user.tag}!`));
});