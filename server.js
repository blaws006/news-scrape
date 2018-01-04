//Requirements
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");
var request = require("request")
var cheerio = require("cheerio");


var PORT = process.env.PORT || 3000;

//require all of the models
var db = require("./models");

//Initialize express

var app = express();

//Middleware initialization
// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
	extended: false
}));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

//Creates local and deployed paths for the MongoDB database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

app.get("/scrape", function (req, res) {
	request("https://kotaku.com/", function (error, response, html) {

		var $ = cheerio.load(html);
		
		var result = {};
		$("article").each(function (i, element) {
			

			result.title = $(element).children().find("h1").text();
			result.link = $(element).children().find("a").attr("href");
			result.summary = $(element).children().find("p").text();

			//Create a new Article using the "result" object built from scraping
			db.Article.findOneAndUpdate(result, {upsert: true}).then(function (dbArticle) {
				//If successful send a success message to the client
				console.log("Scrape Complete");
			}).catch(function (err) {
				console.log(err)
			});
		});
		console.log(result);
	});
});

app.listen(PORT, function () {
	console.log("Running on " + PORT);
});