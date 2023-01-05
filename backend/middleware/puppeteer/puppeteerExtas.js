// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteerExta = require("puppeteer-extra");
const { DEFAULT_INTERCEPT_RESOLUTION_PRIORITY } = require("puppeteer");

// Add adblocker plugin, which will transparently block ads in all pages you
// create using puppeteer.
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");

const adblocker = AdblockerPlugin({
  blockTrackers: true,
  // Optionally enable Cooperative Mode for several request interceptors:
  interceptResolutionPriority: DEFAULT_INTERCEPT_RESOLUTION_PRIORITY,
});

module.exports = { puppeteerExta, adblocker };
