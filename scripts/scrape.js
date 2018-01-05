var cheerio = require("cheerio");
var request = require("request");


var scrape = function () {
  request("https://kotaku.com/", function (error, response, html) {

    var $ = cheerio.load(html);

    var result = [];
    $("article").each(function (i, element) {

      var title = $(element).children().find("h1").text();
      var link = $(element).children().find("a").attr("href");
      var summary = $(element).children().find("p").text();

      var addedData = {

        title: title,
        link: link,
        summary: summary
      };

      result.push(addedData)
      //Create a new Article using the "result" object built from scraping
      // db.Article.findOneAndUpdate(result, { upsert: true }).then(function (dbArticle) {
      //If successful send a success message to the client
      //     console.log("Scrape Complete");
      // }).catch(function (err) {
      //     console.log(err)
      // });
    });
    return result;
    console.log(result);
  });
}

module.exports = scrape;