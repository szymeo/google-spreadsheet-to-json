var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');

function fillCells(body) {
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', l = 0, table = {}, $ = cheerio.load(body);
    $('table > tbody > tr').each((i, elem) => {
        for(let j = 0; j < letters.length; j++) {
            table[`${letters[j]}${i+1}`] = $($(elem).find('td').get(j)).html();
        }
    })

    return table;
}

module.exports = function (sheetId) {
    request({
        url: `https://docs.google.com/spreadsheets/d/${sheetId}`
    }, (error, response, body) => {
        error ? console.error(error) : fs.writeFileSync('body.json', JSON.stringify(fillCells(body)));
    })
};