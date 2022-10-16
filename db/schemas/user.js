const mongoose = require('mongoose')

module.exports = mongoose.model("User", new mongoose.Schema({
    guildId: { type: String },
    userId: { type: String },
    warns: { type: Array },
}));