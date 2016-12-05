const fs = require('fs');

var linksArray = JSON.parse(fs.readFileSync('./postcodes-search/2-links/links.json'));

console.log(linksArray);
