const express = require("express");
const ObservationModel = require("../models/observation.model");

const router = express.Router();

//get all observations
router.get("/observations", (req, res, next) => {
  ObservationModel.find({})
    .then((data) => res.json(data))
    .catch(next);
});

// get observations for stacked bar
// each observation will be of format:
// {
//   xFieldValue: "economic";
//   stackedBarFieldValue: "Asia"
//   meanYfieldValue: "30"
// }
// let's assume that xField is pestle, yField is intensity and stackedBarField is sector
//the above data point can be understood as: for all observations whose pestle is economic
//and region is asia, the mean intensity is 30.
router.get("/stacked-bar-observations", (req, res, next) => {
  //extract the query params
  const { xField, yField, stackedBarField } = req.query;
  if (xField && yField && stackedBarField) {
    ObservationModel.aggregate([
      {
        $group: {
          _id: {
            [xField]: `$${xField}`,
            [stackedBarField]: `$${stackedBarField}`,
          },
          [`mean${yField}`]: { $avg: `$${yField}` },
        },
      },
      {
        $addFields: {
          xFieldValue: `$_id.${xField}`,
          stackedBarFieldValue: `$_id.${stackedBarField}`,
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $match: {
          meanintensity: { $ne: "" },
          xFieldValue: { $ne: "" },
          stackedBarFieldValue: { $ne: "" },
        },
      },
    ])
      .then((data) => res.json(data))
      .catch(next);
  } else {
    throw {
      status: 400,
      message: "Improper query params",
    };
  }
});

module.exports = router;
