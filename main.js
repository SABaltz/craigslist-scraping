const cheerio = require("cheerio");
// const pretty = require("pretty");
const axios = require("axios");
const fs = require('fs');
const url = 'https://anchorage.craigslist.org/search/roo#search=1'

async function scrapeData() {
    try {
        const {data} = await axios.get(url);
        const $ = cheerio.load(data);

        const listItems = $("ol li");

        let count = 0

        const fileContent = fs.readFileSync('pids.txt', 'utf-8');
        const lines = fileContent.split('\n');

        let emptyFile
        emptyFile = lines.length === 1;

        let lineArray = []
        const fileData = fs.readFileSync('pids.txt', 'UTF-8')
        const fileLines = fileData.split(/\r?\n/)
        fileLines.forEach(line => {
            lineArray.push(line)
        })


        listItems.each((index, el) => {
            if (index !== 0) {
                let href = $(el).children('a').attr('href')
                let post = String(href).match(/(\d+)\.html$/)[1]
                count++

                if (emptyFile) {
                    fs.appendFile('pids.txt', post + '\n', (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                } else {
                    if (!lineArray.includes(post)){
                        console.log(href)
                        fs.appendFile('pids.txt', post + '\n', (err) => {
                            if (err) {
                                console.error(err);
                            }
                        });
                    }
                }



            }

        });


    } catch (err) {
        console.error(err);
    }
}

scrapeData();

