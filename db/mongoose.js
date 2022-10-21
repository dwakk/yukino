const guildSchema = require('./schemas/guild');
const userSchema = require('./schemas/user');

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

module.exports.fetchUser = async function(uId) {
    let userdB = await userSchema.findOne({ userId: uId });
    if (userdB) {
        return userdB;
    } else {
        userdB = new userSchema({
            userId: uId,
        });
        await userdB.save().catch((err) => console.log(err));
        return userdB;
    };
};