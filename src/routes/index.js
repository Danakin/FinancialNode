var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index.njk", {
    title: "My First Nunjucks App",
    message: "Welcome to Nunjucks Express",
  });
});

module.exports = router;
