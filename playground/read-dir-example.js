const fs = require('fs');

var filesArray = fs.readdirSync('../3_firm_links/done/');

console.log(filesArray);
console.log('----', filesArray.length);

var counter = 0;

for (f in filesArray) {
    var linksArray = fs.readFileSync(`../3_firm_links/done/${filesArray[f]}`)
    var searchArray = JSON.parse(linksArray);
    console.log(f, '--', filesArray[f], '--', searchArray.length);
    counter += searchArray.length;
}
console.log('---------');
console.log(counter);
