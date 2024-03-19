const express = require("express");
const ObservationModel = require("../models/observation.model");

const router = express.Router();

//get all observations
router.get("/observations", (req, res, next) => {
  ObservationModel.find({})
    .then((data) => res.json(data))
    .catch(next);
});

//get domain for a particular categorical field
router.get("/:categoryName/domain", (req, res, next) => {
  const categoryName = req.params.categoryName;
  ObservationModel.distinct(categoryName)
    .exec()
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
