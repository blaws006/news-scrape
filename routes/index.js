var app = require("express").Router();
var apiRoutes = require("./api");
var viewRoutes = require("./views");

app.use("/api", apiRoutes);

app.use("/", viewRoutes);

module.exports = app;