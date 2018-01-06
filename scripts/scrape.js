var cheerio = require("cheerio");
var request = require("request");


var scrape = function () {
  return request("https://kotaku.com/", function (error, response, html) {

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
    
    });
    return result;
    console.log(result);
  });
}

module.exports = scrape;