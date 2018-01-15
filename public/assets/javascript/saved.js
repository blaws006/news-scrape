$(document).ready(function () {

    $(".background").append("<img src='./assets/images/electrical-network-tech-blue-background-header.jpg' />");
    var articleContainer = $(".article-container");

    $(document).on("click", ".scrape", handleArticleScrape);
    // $(document).on("click", ".save", handleNoteSave);
    // $(document).on("click", ".delete", handleArticleDelete);
    // $(document).on("click", ".notes", handleArticleNotes);
    // $(document).on("click", "note-delete", handleNoteDelete);

    initPage();

    function initPage() {
        //Empty the article then call the AJAX for non-saved articles
        articleContainer.empty();
        $.get("/api/article?saved=true").then(function (data) {
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

        for (var i = 0; i < articles.length; i++) {
            articlePanels.push(createPanels(articles[i]));
        }
        articleContainer.append(articlePanels);
    }

    function createPanels(article) {
        var panel = $(
            [
                "<div class='card'>",
                "<div class='card-content'>",
                "<a target='_blank' href='" + article.link + "'>",
                "<span class='card-title'>",
                article.title,
                "</span>",
                "</a>",
                "<p>",
                article.summary,
                "</p>",
                "</div>",
                "<div class='card-action'>",
                "<a class='delete'>",
                "Delete From Saved",
                "</a>",
                "</div>",
                "<div class='card-action'>",
                "<a class='notes'>",
                "Article Notes",
                "</a>",
                "</div>",
               
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
                console.log(modal, trigger);
            },
            complete: function () {
                alert('Closed');
            } // Callback for Modal close
        });
    };

    function articleSave() {

        var articleToSave = $(this).parents(".card").data();

        articleToSave.saved = true;

        $.ajax({
            method: "PUT",
            url: "api/article/" + articleToSave._id,
            data: articleToSave
        }).then(function (data) {
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