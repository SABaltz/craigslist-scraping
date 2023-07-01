const cheerio = require("cheerio");
// const pretty = require("pretty");
const axios = require("axios");

const url = 'https://anchorage.craigslist.org/search/roo#search=1'

async function scrapeData() {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const listItems = $("ol li");

        let count = 0

        listItems.each((index, el) => {
            if (index !== 0){
                let href = $(el).children('a').attr('href')
                let post = String(href).match(/(\d+)\.html$/)[1]
                console.log(post)
                count ++
            }
        });

        console.log(count)

    } catch (err) {
        console.error(err);
    }
}
// Invoke the above function
scrapeData();

