const express = require("express");
const ObservationModel = require("../models/observation.model");

const router = express.Router();

//get all observations
router.get("", (req, res, next) => {
  ObservationModel
    .find({})
    .then(data => res.json(data))
    .catch(next);
});

module.exports = router;
