const client = require('..');

client.on("messageCreate", async (message) => {
    let guildData = await client.database.fetchGuild(message.guildId)
})