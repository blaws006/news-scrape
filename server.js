//Requirements
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");
var request = require("request");
var cheerio = require("cheerio");

var PORT = process.env.PORT || 3000;

//require all of the models
var db = require("./models");

//Initialize express

var app = express();

var router = require("./routes");

//Middleware initialization
// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(bodyParser.text());
app.use(bodyParser.json({
	type: "application/vnd.api+json"
}));

// Static directory to be served
app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
	defaultLayout: "main"
}));

app.set("view engine", "handlebars");

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

//Have request go through routes files
app.use(router)

//Creates local and deployed paths for the MongoDB database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


// //Route that pulls all articles from the database

// app.get("/articles", function(req, res){
// 	db.Article.find({}).then(function(dbArticle){
// 		//If able to find the articles
// 		res.json(dbArticle);
// 	})
// 	.catch(function(err) {
// 		res.json(err);
// 	});
// });

// //Route to find one particular article and populate notes
// app.get("/articles/:id", function(req, res){
// 	db.Article.findOne({"_id": req.params.id})
// 	.populate("note")
// 	.then(function(dbArticle){
// 		res.json(dbArticle)
// 		})
// 		.catch(function(err){
// 			res.json(err)
// 	});
// });

// //Route for saving and updating an Article's assoctiated Note
// app.post("/articles/:id", function(req, res){

// 	db.Note.create(req.body)
// 	.then(function(dbNote) {
// 		return db.Article.findOneAndUpdate({"_id": req.params.id}, {"note": dbNote.id}, {"new": true})
// 	})
// 	.then(function(dbArticle){
// 		res.json(dbArticle);
// 	})
// 	.catch(function(err) {
// 		res.json(err);
// 	});
// });

app.listen(PORT, function () {
	console.log("Running on " + PORT);
});