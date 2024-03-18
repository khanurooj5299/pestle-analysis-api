const express = require("express");
const articleModel = require("../models/article.model");

const router = express.Router();

//get all articles
router.get("", (req, res, next) => {
  articleModel
    .find({})
    .then(data => res.json(data))
    .catch(next);
});

module.exports = router;
