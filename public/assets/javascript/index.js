$(document).ready(function () {

    $(".scrape").on("click", handleArticleScrape)
   
    initPage();

    function initPage () {
        $.ajax("/api/article", {
        type: "GET"
    }
    ).then(function (data) {
            console.log(data)
            if (data && data.length) {
                
                $(".article-container").append(data)
            }
        });
    };

    function renderArticles(articles) {
        var articlePanels = [];
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            articlePanels.push
                (
                $(
                    [
                        "<div>",
                        "<div>",
                        "<h3>",
                        "<a href='" + article.link + "'>",
                        article.title,
                        "</a>",
                        "</h3>",
                        "</div>",
                        "</div>"
                    ].join("")
                )
                );
        }
        $('.article-container').append(articlePanels);
    }


    function handleArticleScrape() {
        // This function handles the user clicking any "scrape new article" buttons
        $.get("/api/fetch").then(function (data) {
            
        //    initPage();
        });
    }
});