//Requirements
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");
var PORT = process.env.PORT || 3000;

//require all of the models
var db = require("./models");

//Initialize express

var app = express();

var routes = require("./routes");

//Middleware initialization
// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(bodyParser.text());
app.use(bodyParser.json());

// Static directory to be served
app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
	defaultLayout: "main"
}));

app.set("view engine", "handlebars");

// // Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

//Have request go through routes files
app.use(routes)

//Creates local and deployed paths for the MongoDB database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);



app.listen(PORT, function () {
	console.log("Running on " + PORT);
});