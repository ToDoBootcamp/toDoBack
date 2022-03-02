const mongoose = require("mongoose");
const TodoSchema = new mongoose.Schema({
    title: String
});
module.exports = mongoose.model("todo",TodoSchema);