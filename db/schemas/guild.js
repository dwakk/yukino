const mongoose = require('mongoose');

module.exports = mongoose.model("Guild", new mongoose.Schema({
    guildId: String,
    muteRole: { type: String, default: "null"},
    language: { type: String, default: 'en' },
    blacklist: [],
    whitelist: [],
    addons: {
        suggestions: {
            enabled: { type: Boolean, default: false },
            channel: { type: String, default: "null" },
        },
        logs: {
            enabled: { type: Boolean, default: false},
            channel: { type: String, default: "null"},
        },
        welcome: {
            enabled: { type: Boolean, default: false },
            channel: { type: String, default: "null" },
            message: { type: String, default: "Welcome to <server>, <member>! We are now <count> members!" },
        },
        goodbye: {
            enabled: { type: Boolean, default: false },
            channel: { type: String, default: "null" },
            message: { type: String, default: "<member> left. We are now <count>" },
        },
        tickets: {
            enabled: { type: Boolean, default: false },
            channel: { type: String, default: "null" },
            message: { type: String, default: "null"},
        },
        antilink: {
            enabled: { type: Boolean, default: false },
        },
        wordfilter: {
            enabled: { type: Boolean, default: false },
            words: [],
        },
        economy: {
            enabled: { type: Boolean, default: false },
            shop: [],
        },
    }, strict: false },
));