const client = require('..');

client.on("guildCreate", async (guild) => {
    await client.database.fetchGuild(guild.id);
});