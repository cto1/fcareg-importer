const request = require('request');
// const data = require('./data');
const fs = require('fs');

var url = 'https://register.fca.org.uk/shpo_searchresultspage?FSF=1&FSF%7CAUF=1&search=W1&TOKEN=3wq1nht7eg7tr';

// request(url, (error, response, body) => {
//   console.log(body);
//   data.saveData(data);
//  });

var destination = fs.createWriteStream('./page.txt');
request(url).pipe(destination);
