const fs = require('fs');
const request = require('request');

var filesArray = fs.readdirSync ('./3_firm_links/todo')
console.log(filesArray);

for (f in filesArray) {
  console.log('START----------', filesArray[f]);
  //get serach array
  var searchArray = fs.readFileSync(`./3_firm_links/todo/${filesArray[f]}`);
  var linksArray = JSON.parse(searchArray);

  for (i in linksArray) {
    var searchUrl = linksArray[i];
    var saveFile = `./4_firm_links_search/${linksArray[i].slice(-18)}.html`;
    //console.log('Url ', searchUrl, ' in file ', saveFile);
    request(searchUrl).pipe(fs.createWriteStream(saveFile));
  }
  console.log('END ', filesArray[f], 'procesed ', i);
}
