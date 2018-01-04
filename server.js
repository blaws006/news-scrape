//Requirements

var mongoose = require("mongoose");


//Creates local and deployed paths for the MongoDB database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";


