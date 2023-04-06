const axios = require('axios');
const cheerio = require('cheerio');
function containsLowercase(str) {
  return /[a-z]/.test(str);
}
 function getcodes() { 
  let array= [] 
axios.get('https://genshin-impact.fandom.com/wiki/Promotional_Code')
  .then(response => {
    const $ = cheerio.load(response.data);
    const table = $('#mw-content-text > div.mw-parser-output > table > tbody')
    table.children().each(async(index, element) =>{
      const tds = $(element).find("td");       
      const code = $(tds[0]).text().trim().trimEnd().trimStart();
      const server = $(tds[1]).text().trim().trimEnd().trimStart();
      const rewards = $(tds[2]).text().trim().trimEnd().trimStart();
      const duration = $(tds[3])
      const checkduration = duration.attr('style')
      if(checkduration !== `background-color:rgb(153,255,153,0.5)` || containsLowercase(code)) return;
      await array.push({ region: server, code: code})
      //console.log(`\ncode: ${code}\nserver: ${server}\nrewards: ${rewards}\nduration: ${duration.find("br").replaceWith("\n").end().text().trim().trimEnd().trimStart()}`)
    })
  })
  .catch(error => console.log(error))
  setInterval(() => {
    return array
  }, 500);
  return new Promise((resolve) => {
    resolve(array)
  })
  } 
console.log(getcodes())