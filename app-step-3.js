const fs = require('fs');

var linksArray = JSON.parse(fs.readFileSync('./links.json'));

var createSmallerArrayFiles = function(arr, chunkSize) {
    var smallArray, i;
    for (i = 0; i < arr.length; i += chunkSize) {
        smallArray = arr.slice(i, i + chunkSize);
        fs.writeFileSync(`./3_firm-links/firm-links${i}.json`, JSON.stringify(smallArray))
        chunkSize = Math.floor(Math.random()*(110-25+1)+25);
        console.log(chunkSize);
    }
    return smallArray;
}

var lastSmallArray = createSmallerArrayFiles(linksArray, 50);
var result = JSON.stringify(lastSmallArray);

console.log(result);
