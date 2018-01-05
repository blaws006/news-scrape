var router = require("express").Router();
var fetchController = require("../../controller/fetch");

router.get("/", fetchController.articleScrape);

module.exports = router;