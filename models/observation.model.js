const mongoose = require("mongoose");

//A single observation for pestle analysis looks like below
const observationSchema = mongoose.Schema({
  end_year: Number,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: Number,
  impact: Number,
  added: Date,
  published: Date,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
});

const ObservationModel = mongoose.model("observations", observationSchema);

module.exports = ObservationModel;
