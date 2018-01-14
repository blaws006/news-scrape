var app = require("express").Router();
var articleAPI = require("../api/article")
app.get("/", function(req, res){
   res.render("index")
});

app.get("/saved", function(req, res){
    res.render("saved");
});

module.exports = app;