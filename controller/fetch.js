var db = require("../models");
var scrape = require("../scripts/scrape");

module.exports = {
	articleScrape: function (req, res) {
		return scrape()
			.then(function (articles) {
				db.Article.create(articles);
			})
			.then(function (dbArticle) {
				if (dbArticle.length === 0) {
					res.json("No new articles available");
				} else {
					res.json({
						message: "Added " + dbArticle.length + " new articles!"
					})
				}
			})
			.catch(function (err) {
				res.json({
					message: "Scrape complete!"
				});
			});
	}
};