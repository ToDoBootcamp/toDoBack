const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: String,
    completed: Boolean,
    deleted: Boolean
})

module.exports = mongoose.model("todo",TodoSchema)