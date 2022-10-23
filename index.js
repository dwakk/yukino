const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildPresences, 
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
	], 
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction] 
});

require('dotenv').config();
global.fetch = require('cross-fetch')

const fs = require('fs');
const mongoose = require('mongoose');
const chalk = require('chalk');

client.aliases = new Collection();
client.slashCommands = new Collection();
client.database = require('./db/mongoose');

module.exports = client;


fs.readdirSync('./handlers').forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

mongoose.connect(process.env.MONGO, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(
	console.log(chalk.green('[DB]: Connection à Mongo réussie'))
).catch(console.error);

client.login(process.env.TOKEN);