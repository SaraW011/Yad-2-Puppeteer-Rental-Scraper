const express = require("express");
const router = express.Router();

const { listingsFinder } = require("../controllers/listingsFinder");

router.get("/listings", listingsFinder);

module.exports = router;
