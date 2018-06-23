var mongoose = require("mongoose");

var sessionSchema = new mongoose.Schema({
    language: String,
    framework: String,
    hours: Number,
    topic: String,
    date: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Session", sessionSchema);