// main functions page

const { Listings } = require("../modals/listings");
const { GETURLS } = require("../constants/pupeteerURLs");

const scraperObject = {
  // Array of URLs to scrape
  urls: GETURLS,
  async scraper(browser) {
    const page = await browser.newPage();
    console.log(`Navigating to ${GETURLS}...`);

    // push all data into these arrays
    let listingTableData = [];
    let generalData = [];

    // Should loop through all URLs, issues with pagination:
    for (const url of GETURLS) {
      await page.goto(url);

      // next 2 lines loops through pagination:
      let isBtnDisabled = false;
      while (!isBtnDisabled) {
        ///////
        await page.waitForSelector("#feed_item_0", { visible: true });

        await page.screenshot({ path: "testresult.png", fullPage: true });
        // Scrape the page here, using methods like page.$eval, page.evaluate, or page.screenshot
        const title = await page.$eval("h1", (el) => el.textContent);
        console.log("please wait while getting urls...");
        console.log(title);

        // Wait for the required DOM to be rendered:
        const getListingsFromPage = await page.evaluate((url) => {
          const mapListingData = Array.from(
            document.querySelectorAll(".feed_list > .feeditem")
          );

          const data = mapListingData.map(
            (listing) => ({
              price: listing
                .querySelector(".price")
                .textContent.replace(/\D/g, ""),
              aptSize: listing
                .querySelector(".SquareMeter-item")
                .textContent.replace(/\D/g, ""),
              rooms: listing
                .querySelector(".rooms-item")
                .textContent.replace(/\D/g, ""),
            }),

            url
          );

          return data;
        });

        //===========================  SCRAPE ADDITIONAL LISTING INFO ============================

        //get ads count advertized on the page
        const adsCount = await page.$eval(".ads_count", (element) => {
          return element.textContent.replace(/\D/g, "");
        });
        // console.log(adsCount);

        //get value of rooms (defined in URL):
        const rooms = await page.$eval(".rooms-item", (element) => {
          return element.textContent.replace(/\D/g, "");
        });
        // console.log(rooms);

        // get value of city:
        const area = await page.$eval(".subtitle", (element) => {
          return element.textContent.split(",").pop().trim();
        });
        console.log(area);

        listingTableData.push(...getListingsFromPage);
        generalData.push(adsCount, rooms, area);

        // pagination - error with pages that are missing pagination:
        const is_disabled =
          (await page.$(".pagination-nav.text.disabled")) !== null;
        isBtnDisabled = is_disabled;
        if (!is_disabled) {
          await Promise.all([
            page.click(".next-text"),
            page.waitForNavigation({ waitUntil: "networkidle2" }),
          ]);
        }
      }

      // console.log("listingTableData", listingTableData);
      const getGeneralDataArr = generalData.slice(-3);
      console.log(getGeneralDataArr);

      // ********************* CLEAN-UP-SKEWED-DATA  ******************

      // filter out listings with SQM above standard and pricing err:
      const unSkewData = listingTableData.filter(function (el) {
        if (el.rooms == 3) {
          return el.aptSize <= 98 && el.price > 999 && el.price < 10000;
        }
        if (el.rooms == 4) {
          return el.aptSize <= 110 && el.price > 999 && el.price < 10000;
        }
        if (el.rooms == 5) {
          return el.aptSize <= 125 && el.price > 999 && el.price < 10000;
        }
      });

      console.log("unSkewData", unSkewData);

      // ******************** CALC LARGEST APT SQM **********************

      const topSqm = unSkewData.map((num) => num.aptSize * 1);
      const max = Math.max(...topSqm.values());
      console.log("max sqm", max);

      // ******************** CALC LOWEST RENT **********************

      const lowest = unSkewData.map((num) => num.price * 1);
      const min = Math.min(...lowest.values());
      console.log("min rent", min);

      // ******************** CALC HIGHEST RENT **********************

      const highest = unSkewData.map((num) => num.price * 1);
      const high = Math.max(...highest.values());
      console.log("max rent", high);

      // ********************* AVERAGE LISTING COST *********************

      const getTotalPriceSum = unSkewData
        .map((num) => num.price * 1)
        .reduce((init, fin) => init + fin, 0);
      // console.log("sum", getTotalPriceSum);
      const avgPerListings = Math.floor(getTotalPriceSum / unSkewData.length);

      // console.log("average price:", avgPerListings);

      // ********************* ADJUSTED PRIC = 15% OFF ASKING PRICE *******

      const percentOff = Math.ceil(0.15 * avgPerListings);
      //  final adjusted cost of rental is:
      const likelyPrice = avgPerListings - percentOff;
      const adjusted = Math.floor(likelyPrice / 10) * 10;
      console.log("adjusted", adjusted);

      // ********************* MEDIAN PRICE *******************************
      // convert string to numbers:
      const getNumbers = unSkewData.map((num) => num.price * 1);
      // sort the numbers in ascending order:
      const sortedNumList = getNumbers.sort((a, b) => a - b);
      const midpoint = Math.floor(sortedNumList.length / 2);
      // finally, get median number:
      const median =
        sortedNumList.length % 2 === 1
          ? sortedNumList[midpoint] //If odd length, just take midpoint
          : (sortedNumList[midpoint - 1] + sortedNumList[midpoint]) / 2; //If even length, take median of midpoints
      console.log("median price", median);

      // ===========================  CREATE DOC FOR MONGODB ============================

      const importData = async () => {
        try {
          await Listings.create({
            vacancies: getGeneralDataArr[0],
            average: avgPerListings,
            median: median,
            lowest: min,
            highest: high,
            adjusted: adjusted,
            rooms: getGeneralDataArr[1],
            topSQM: max,
            area: getGeneralDataArr[2],
          });
          console.log("data successfully imported 💡");
          // to exit the process
          // process.exit();
        } catch (error) {
          console.log("error", error);
        }
      };

      importData();

      // return listingTableData;
    }
    await page.close();

    // console.log("outer listingTableData", listingTableData)
  },
};

module.exports = scraperObject;
