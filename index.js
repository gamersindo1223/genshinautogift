
const axios = require("axios");
const cheerio = require("cheerio");
const chalk = require("chalk");
const git = require("korefile");
const fs = require("fs");
const currentcodes = require("./active_code.json")
function containsLowercase(str) {
  return /[a-z]/.test(str);
}
async function getcodes() {
  let array = [];
  axios
    .get("https://genshin-impact.fandom.com/wiki/Promotional_Code")
    .then((response) => {
      const $ = cheerio.load(response.data);
      const table = $(
        "#mw-content-text > div.mw-parser-output > table > tbody"
      );
      table.children().each(async (index, element) => {
        const tds = $(element).find("td");
        const code = $(tds[0]).text().trim().trimEnd().trimStart();
        const server = $(tds[1]).text().trim().trimEnd().trimStart();
        const rewards = $(tds[2]).text().trim().trimEnd().trimStart();
        const duration = $(tds[3]);
        const checkduration = duration.attr("style");
        if (
          checkduration === `background-color:rgb(153,255,153,0.5)` &&
          !containsLowercase(code)
        ) {
          array.push({ region: server, code: code });
        }
        //console.log(`\ncode: ${code}\nserver: ${server}\nrewards: ${rewards}\nduration: ${duration.find("br").replaceWith("\n").end().text().trim().trimEnd().trimStart()}`)
      });
    })
    .catch((error) => console.log(error));
  await new Promise((resolve, reject) => setTimeout(resolve, 2400));
  return Promise.resolve(array);
}
getcodes().then((scrapecode) => {
  if (scrapecode.toString() === currentcodes.toString()) {
    console.log(chalk.yellow(`[Info] `) + `There isn't any new codes!`);
    return;
  }
  console.log(scrapecode)
  fs.writeFileSync("active_code.json", JSON.stringify(scrapecode))
  console.log(chalk.green(`[Info] `) + `All codes have been Updated!`);
});
