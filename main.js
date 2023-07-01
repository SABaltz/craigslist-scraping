const cheerio = require("cheerio");
const axios = require("axios");
const fs = require('fs');
const url = 'https://anchorage.craigslist.org/search/roo#search=1';
const filePath = 'pids.txt';

async function scrapeData() {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const listItems = $("ol li");

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const existingPids = new Set(fileContent.split('\n'));

        let newPids = [];

        listItems.each((index, el) => {
            if (index !== 0) {
                const href = $(el).children('a').attr('href');
                const postId = href.match(/(\d+)\.html$/)?.[1];

                if (postId && !existingPids.has(postId)) {
                    newPids.push(postId);
                    console.log(href);
                }
            }
        });

        if (newPids.length > 0) {
            fs.appendFileSync(filePath, newPids.join('\n') + '\n');
        }
    } catch (err) {
        console.error(err);
    }
}

scrapeData();
