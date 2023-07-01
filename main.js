const cheerio = require("cheerio");
const pretty = require("pretty");
const axios = require("axios");

const url = 'https://anchorage.craigslist.org/search/roo#search=1'

async function scrapeData() {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const listItems = $("ol li");

        listItems.each((index, el) => {
            console.log($(el).text())
        });

    } catch (err) {
        console.error(err);
    }
}
// Invoke the above function
scrapeData();
