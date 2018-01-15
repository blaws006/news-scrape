$(document).ready(function () {


  var articleContainer = $(".article-container");

  $(".scrape").on("click", handleArticleScrape)

  initPage();

  function initPage() {
    //Empty the article then call the AJAX for non-saved articles
    articleContainer.empty();
    $.get("/api/article?saved=false").then(function (data) {
      if (data && data.length) {
        console.log(data);
        renderArticles(data);
      } else {
        renderEmpty();
      }
    });
  }

  function renderArticles(articles) {

    var articlePanels = [];

    for(var i = 0; i < articles.length; i++) {
      articlePanels.push(createPanels(articles[i]));
    }
    articleContainer.append(articlePanels);
  }

  function createPanels(article) {
    var panel = $(
      [
        "<div class='card'>",
        "<div class='card-content'>",
        "<span class='card-title'>",
        article.title,
        "</span>",
        "<p>",
        article.summary,
        "</p>",
        "</div>",
        "<div class='card-action'>",
       "<a href='" + article.link + "'>",
       "Visit Page",
       "</a>",
       "</div>",
      "<div class='card-action'>",
        "<a class='save'>",
        "Save Article",
        "</a>",
        "</div>",
      "</div>",
      ].join(" ")
    );
    panel.data("_id", article._id)
    return panel;
  };


  function renderEmpty() {
    $('.modal').modal();
  };

  function articleSave() {

    var articleToSave = $(this).parents(".cards").data();

    articleToSave.saved = true;

    $.ajax({
      method: "PUT",
      url : "api/article" + articleToSave._id,
      data: articleToSave
    }).then(function(data){
      if (data.saved) {
        initPage();
      }
    })
  }

  function handleArticleScrape() {
    // This function handles the user clicking any "scrape new article" buttons
    $.get("/api/fetch").then(function (data) {
      initPage();
      alert(data.message);
    });
  }
});