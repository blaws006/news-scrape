$(document).ready(function () {
    $(".newArticles").on("click", function (event) {
        $.get("/api/fetch")
    });
});