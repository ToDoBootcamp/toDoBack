const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    date: Date,
    state: String,
    deleted: Boolean
})

module.exports = mongoose.model("todo",TodoSchema)