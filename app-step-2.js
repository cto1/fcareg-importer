const fs = require('fs');
const cheerio = require('cheerio');

var fileNames = fs.readdirSync('./2_postcodes_search/');
console.log(fileNames);

var  $;
var linksArray =[];
var asyncExtract = (fileNames) => {
  console.log('in asyncExtract');
  return new Promise((resolve, reject) => {
    console.log('in Promise');
    for (i in fileNames) {
      $ = cheerio.load(fs.readFileSync(`./2_postcodes_search/${fileNames[i]}`));
      $('tbody tr td a').each( (index, element) => {
          linksArray.push($(element).attr('href'));

      });
    };
    resolve(linksArray);
    reject('Error in asyncExtract');
  });

};

asyncExtract(fileNames).then((res) => {
  console.log('then asyncExtract', res);
  fs.writeFileSync('./links.json', JSON.stringify(linksArray));
}).catch((errorMessage) => {
  console.log(errorMessage);
});
