var router = require("express").Router();
var fetchRoutes = require("./fetch");
var noteRoutes = require("./note");
var articleRoutes = require("./article");

router.use("/fetch", fetchRoutes);
router.use("/note", noteRoutes);
router.use("/articles", articleRoutes);

module.exports = router;