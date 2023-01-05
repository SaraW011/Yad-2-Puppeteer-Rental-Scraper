/* eslint-disable linebreak-style */
require("dotenv").config();

const {
  PORT = 3000,
  NONGO_DB = "mongodb://localhost:27017/yad2-listings",
} = process.env;

module.exports = {
  PORT,
  NONGO_DB,
};
