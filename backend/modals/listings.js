const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  vacancies: { type: Number },
  average: { type: Number },
  median: { type: Number },
  lowest: { type: Number },
  highest:{ type: Number },
  adjusted: { type: Number },
  rooms: { type: Number },
  topSQM: { type: Number },
  area: { type: String },
  subArea: { type: String },
  createdOn: { type: Date, default: Date.now },
});

const Listings = mongoose.model("listing", listingSchema);

module.exports = { Listings };
