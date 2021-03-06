$(document).ready(function () {

  $(".background").append("<img src='./assets/images/electrical-network-tech-blue-background-header.jpg' />");
 var articleContainer = $(".article-container");

  $(document).on("click", ".scrape", handleArticleScrape)
  $(document).on("click", ".save", articleSave);
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
        "<i class='material-icons'>",
        "open_in_browser",
        "</i>",
       "<a target='_blank' href='" + article.link + "'>",
       "Visit Page",
       "</a>",
       "</div>",
      "<div class='card-action'>",
        "<i class='material-icons'>",
        "add_circle_outline",
        "</i>",
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
    $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
      ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        alert("Ready");
        console.log(modal, trigger);
      },
      complete: function () { alert('Closed'); } // Callback for Modal close
    }
    );
  };

  function articleSave() {

    var articleToSave = $(this).parents(".card").data();

    articleToSave.saved = true;

    $.ajax({
      method: "PUT",
      url : "api/article/" + articleToSave._id,
      data: articleToSave
    }).then(function(data){
      if (data.saved) {
        initPage();
      }
    })
  };

  function handleArticleScrape() {
    // This function handles the user clicking any "scrape new article" buttons
    $.get("/api/fetch").then(function (data) {
      {
        console.log(data.message)
        initPage();
        
      }
    });
  }
});