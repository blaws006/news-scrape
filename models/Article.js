//Using the mongoose package to initalize the Schema
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
//Actual schema
var ArticleSchema = new Schema({
	title: {
		type: String,
		unique: true,
		required: false
	},
	link: {
		type: String,
		unique: true,
	},
	summary: {
		type: String,
		unique: true,
	},
	saved: {
		type: Boolean,
		default: false
	},
	date: {
		type: Date,
		default: Date.now
	},
	note: [{
		type: Schema.Types.ObjectId,
		ref: "Note"
	}]
});
//Creates a model based off of the above schema
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;