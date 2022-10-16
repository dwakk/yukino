const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildPresences, 
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.DirectMessages,
	], 
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction] 
});

require('dotenv').config();

const fs = require('fs')
const mongoose = require('mongoose');
const chalk = require('chalk');

client.aliases = new Collection();
client.slashCommands = new Collection();
client.buttons = new Collection();
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