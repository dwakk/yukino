const mongoose = require('mongoose')

module.exports = mongoose.model("User", new mongoose.Schema({
    userId: { type: String },
}));