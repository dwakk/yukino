const mongoose = require('mongoose');

module.exports = mongoose.model("Guild", new mongoose.Schema({
    guildId: String,
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
            message: { type: String, default: "Welcome to <server>, <member>!" },
        },
        tickets: {
            enabled: { type: Boolean, default: false },
            channel: { type: String, default: "null" },
            message: { type: String, default: "null"},
        },
        antilink: {
            enabled: { type: Boolean, default: false },
            links: [],
        },
        wordfilter: {
            enabled: { type: Boolean, default: false },
            words: [],
        },
    }},
));