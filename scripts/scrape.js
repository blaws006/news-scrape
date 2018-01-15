var cheerio = require("cheerio");
var request = require("request");
var axios = require("axios");

var scrape = function () {
  return axios.get("https://kotaku.com/").then(function (res) {

    var $ = cheerio.load(res.data);

    var result = [];

    $("article").each(function (i, element) {

      var title = $(element).children().find("h1").text();
      var link = $(element).children().find("a").attr("href");
      var summary = $(element).children().find("p").text();


      if (title && summary && link) {
        var addedData = {
          title: title,
          link: link,
          summary: summary
        };

        result.push(addedData)
      }
    });
    console.log(result);
    return result;

  });
}

module.exports = scrape;