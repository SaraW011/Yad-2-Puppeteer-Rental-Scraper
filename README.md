# Yad-2 Scraper with Puppeteer
`**Adapted By Sara Weissman**`

### This project is open for collaboration.

*The project aims to scrape apartment rental prices from Yad-2 (Hebrew IL) site: https://www.yad2.co.il/realestate/rent*

*Data will be collected from* ```class="feeditem"``` *and will exclude the top table of*  ```class="feed-list-platinum".```

## Technologies used:

- `[Node.js] - backend`
- `[VUE.js] - frontend`
- `[MongoDB] - database`


### Some excellent information on scraping with puppeteer in the following links:

 - [A Youtube series by Michael Kitas](https://www.youtube.com/watch?v=URGkzNC-Nwo&list=PLuJJZ-W1NwdqgvE0D-1SMS7EpWIC5cKqu)
 - [An article by DigitalOcean ](https://www.digitalocean.com/community/tutorials/how-to-scrape-a-website-using-node-js-and-puppeteer)


# Known Issues: 

**Adapting Puppeteer scraper for all URLs on the site:**

1.   Looping through URLs + looping through pagination:
- Issues with looping through both of the above loops simultaneously (might be solved with Puppeteer Cluster) 
- Issues with looping when pagination div doesn’t exist on page (might be solved with try-catch)
2.  Method for scraping data from ex. Tel-Aviv area needs re-writing, such as: [see Puppeteer Docs](https://pptr.dev/api/puppeteer.page.__eval/)



### Data Accuracy Issues:

**Sub-areas:**
refine data by price per neighborhood 

## Screenshots

![App Screenshot](./screenshot.jpg)
