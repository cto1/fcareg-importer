const fs = require('fs');
const request = require('request');

function log(source, message) {
  var now = new Date().toString();
  var log = `${source}-${message} ${now}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n');
};

var filesArray = fs.readdirSync ('./3_firm_links/todo')
console.log(filesArray);

for (f in filesArray) {
  log(filesArray[f],'------------START----------');
  //get serach array
  var searchArray = fs.readFileSync(`./3_firm_links/todo/${filesArray[f]}`);
  var linksArray = JSON.parse(searchArray);

  for (i in linksArray) {
    var searchUrl = linksArray[i];
    var fileRef = `${filesArray[f]}-${i}`;
    var saveFile = `./4_firm_links_search/${fileRef}.html`;
    request(searchUrl)
    .on('response', (response) => log(fileRef, `Response: ${response.statusCode}`))
    .pipe(fs.createWriteStream(saveFile))
    .on('error', (error) => log(fileRef, `Error: ${error}`))
    .on('finish', () => log(fileRef, 'Finish'));
  }
  log(filesArray[f], `END of file. Processed: ${i+1}`);
}
