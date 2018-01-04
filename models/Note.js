//Using the mongoose package to initalize the Schema
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
//Actual schema

var NoteSchema = new Schema({
    title: String,
    body: String
});


var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;