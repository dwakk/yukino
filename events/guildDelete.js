const client = require('..');
const guildSchema = require('../db/schemas/user');

client.on("guildDelete", async (guild) => {
    await guildSchema.deleteOne({ guildId: guild.id})
})