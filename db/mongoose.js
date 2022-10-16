const guildSchema = require('./schemas/guild');
const userSchema = require('./schemas/user');

module.exports.fetchGuild = async function(key) {
    let guilddB = await guildSchema.findOne({ guildId: key });
    if (guilddB) {
        return guilddB;
    } else {
        guilddB = new guildSchema({
            guildId: key,
        });
        await guilddB.save().catch((err) => console.log(err))
        return guilddB;
    };
};

module.exports.fetchUser = async function(gId, uId) {
    let userdB = await userSchema.findOne({ guildId: gId, userId: uId});
    if (userdB) {
        return userdB;
    } else {
        userdB = new userSchema({
            guildId: gId,
            userId: uId,
        });
        await userdB.save().catch((err) => console.log(err));
        return userdB;
    };
};