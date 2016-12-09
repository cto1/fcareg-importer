const fs = require('fs');

var linksArray = JSON.parse(fs.readFileSync('./links.json'));

var createSmallerArrayFiles = function(arr, chunkSize) {
    var smallArray, i;
    for (i = 0; i < arr.length; i += chunkSize) {
        smallArray = arr.slice(i, i + chunkSize);
        fs.writeFileSync(`./3_firm_links/${i}-${i-1+chunkSize}.json`, JSON.stringify(smallArray))
    }
    return smallArray;
}

var lastSmallArray = createSmallerArrayFiles(linksArray, 10);
var result = JSON.stringify(lastSmallArray);

console.log(result);
