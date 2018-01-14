var app = require("express").Router();
var db = require("../../models");
app.get("/", function(req, res){
    db.Article.find(req.query)
        .sort({ date: -1 })
        .then(function (dbArticle) {
            var allObject = {
                Article: dbArticle
            };
            console.log(allObject);
            res.render("index", allObject)
        })
        .catch(function (err) {
            res.send(err);
        });
});

app.get("/saved", function(req, res){
    res.render("saved");
});

module.exports = app;