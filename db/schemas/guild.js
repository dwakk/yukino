const mongoose = require('mongoose');

module.exports = mongoose.model("Guild", new mongoose.Schema({
    guildId: String,
    language: { type: String, default: 'en' },
    addons: {
        suggestions: {
            enabled: { type: Boolean, default: false },
            channel: { type: String, default: "null" },
        },
        logs: {
            enabled: { type: Boolean, default: false},
            channel: { type: String, default: "null"},
        },
    }},
));