const express = require("express");
const ObservationModel = require("../models/observation.model");

const router = express.Router();

//get all observations
router.get("/observations", (req, res, next) => {
  ObservationModel.find({})
    .then((data) => res.json(data))
    .catch(next);
});

// get observations for stacked bars
// each observation will be of format:
// {
//   xField: "economic";
//   stackedBarsField: "Asia"
//   mean_Yfield: "30"
// }
// let's assume that xField is pestle, yField is intensity and stackedBarsField is sector
//the above data point can be understood as: for all observations whose pestle is economic
//and region is asia, the mean intensity is 30.
router.get("/observations/stacked-bars-plot", (req, res, next) => {
  //extract the query params
  const { xField, yField, stackedBarsField } = req.query;
  if (xField && yField && stackedBarsField) {
    ObservationModel.aggregate([
      {
        $group: {
          _id: {
            [xField]: `$${xField}`,
            [stackedBarsField]: `$${stackedBarsField}`,
          },
          [`mean_${yField}`]: { $avg: `$${yField}` },
        },
      },
      {
        $addFields: {
          [xField]: `$_id.${xField}`,
          [stackedBarsField]: `$_id.${stackedBarsField}`,
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $match: {
          [`mean_${yField}`]: { $ne: "" },
          [xField]: { $ne: "" },
          [stackedBarsField]: { $ne: "" },
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
