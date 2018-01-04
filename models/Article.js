//Using the mongoose package to initalize the Schema
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
//Actual schema
var ArticleSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    saved: {
        type: Boolean,
        default: false
    },
    notes: [{
       type: Schema.Types.ObjectId,
       ref: "Note" 
    }]
});
//Creates a model based off of the above schema
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;