const cors = require("cors");
const mongoose = require("mongoose");

const express = require("express");

const browserObject = require("./middleware/puppeteer/startBrowser");
const scraperController = require("./controllers/pageController");
const listingsRouter = require("./routes/index");

// Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller
scraperController(browserInstance);

const { PORT, NONGO_DB } = require("./middleware/serverConfigs");
const app = express();
app.use(cors());
app.get("/", (req, res) => {
  res.send(`this is a send method that will print to ${PORT}`);
});

mongoose.connect(NONGO_DB);
app.listen(PORT, () => {
  console.log(
    `\u001B[32m -----------===========>>>  APP is LISTENING on PORT ${PORT};\u001B[32m`
  );
});

app.use("/", listingsRouter);
