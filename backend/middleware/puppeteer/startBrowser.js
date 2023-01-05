const { executablePath } = require("puppeteer");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const { puppeteerExta, adblocker } = require("./puppeteerExtas");

puppeteerExta.use(adblocker);
puppeteerExta.use(StealthPlugin());

async function startBrowser() {
  let browser;
  try {
    console.log("Opening the browser......");
    browser = await puppeteerExta.launch({
      headless: true,
      executablePath: executablePath(),
      args: ["--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
      userDataDir: "./tmp",
    });
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
  }
  return browser;
}

module.exports = {
  startBrowser,
};
