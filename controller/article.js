var db = require("../models");
var router = require("express").Router();
// Find all articles and sort them by date

module.exports = {
    findAll: function (req, res) {
        db.Article.find(req.query)
            .sort({
                date: -1
            })
            .then(function (dbArticle) {
                res.json(dbArticle)
            })
            .catch(function (err) {
                res.send(err);
            });
    },
    // Delete all articles
    delete: function (req, res) {
        db.Article.remove({
                _id: req.params.id
            })
            .then(function (dbArticle) {
                res.json(dbArticle)
            })
            .catch(function (err) {
                res.json(err);
            })
    },
    // Update the specified headline
    update: function (req, res) {
        db.Article.findOneAndUpdate({
                _id: req.params.id
            }, {
                $set: req.body
            }, {
                new: true
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    }
}