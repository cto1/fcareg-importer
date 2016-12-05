const request = require('request');
const fs = require('fs');

var searchArray = fs.readFileSync('./postcodes/test.csv').toString().split(/\n/);
var searchPostcodes = searchArray.map( term => {
    return term.replace('\r','');
});

console.log(searchPostcodes);

var urlBase = 'https://register.fca.org.uk/shpo_searchresultspage?FSF=1&FSF%7CAUF=1&TOKEN=3wq1nht7eg7tr';
var searchUrl = '';
var searchPostcode = '';

for (element in searchPostcodes) {
  searchPostcode = searchPostcodes[element];
  searchUrl = `${urlBase}&search=${searchPostcode}`;
  saveFile = `./postcodes-search/${searchPostcode}.html`;
  console.log('Url ', searchUrl, ' in file ', saveFile);
  request(searchUrl).pipe(fs.createWriteStream(saveFile));
};
