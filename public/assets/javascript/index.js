$(document).ready(function () {

    $(".scrape").on("click", handleArticleScrape)
    $(".scrape").on("click",  function() {
        $.get("/api/articles?saved=false").then(function(data){
            handleArticleScrape();
            console.log(data);
            if (data && data.length) {
                renderArticles(data);
            console.log(data);
            }
        });
    });
    


function renderArticles(articles) {
    var articlePanels = [];

    for (var i = 0; i < articles.length; i++){
       return articlePanels.push(articles[i]);
    }
}

    function handleArticleScrape() {
        // This function handles the user clicking any "scrape new article" buttons
        $.get("/api/fetch").then(function (data) {
            
            
        });
    }
});