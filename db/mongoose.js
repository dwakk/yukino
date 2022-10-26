const guildSchema = require('./schemas/guild');

module.exports.fetchGuild = async function(gId) {
    let guilddB = await guildSchema.findOne({ guildId: gId });
    if (guilddB) {
        return guilddB;
    } else {
        guilddB = new guildSchema({
            guildId: gId,
        });
        await guilddB.save().catch((err) => console.log(err))
        return guilddB;
    };
};