const client = require('..');

client.on("interactionCreate", async (interaction) => {
    if(!interaction.isSelectMenu()) return;
    let guildData = await client.database.fetchGuild(interaction.guildId);
    let data = {};
    data.guild = guildData;

    if(interaction.customId === "") {}
});