const client = require('..');
const guildSchema = require('../db/schemas/guild');

client.on("guildDelete", async (guild) => {
    await guildSchema.deleteOne({ guildId: guild.id})
})