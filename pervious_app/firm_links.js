var Xray = require('x-ray');
var x = Xray({
  filters: {
    trim: function (value) {
      return typeof value === 'string' ? value.trim() : value
    },
    replace_space: function (value) {
      return typeof value === 'string' ? value.replace(/ +(?= )/g,'') : value
    },
    replace_new_line: function (value) {
      return typeof value === 'string' ? value.replace(/\n/g,' ') : value
    },
    remove_individuals: function (value) {
      return typeof value === 'string' && value.indexOf('individual') !== -1 ? '' : value
    }
  }
  });

// read postcodes
var fs = require('fs');
var array = fs.readFileSync('./postcodes/postcodesTest.csv').toString().split("\n");
for(i in array) {
    console.log(i + ':' + array[i]);
}

for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
}

for(i in array) {
    console.log(i + ':' + array[i]);
}

// build search url
var url_base = 'https://register.fca.org.uk/shpo_searchresultspage?FSF=1&FSF%7CAUF=1&search=';
var token= '&TOKEN=5zq3mgf0d8qk';


var start = new Date().getTime();
var end;

for (postcode in array)
{
var search = array[postcode].trim();
console.log(search);
var url = url_base + search + token;
console.log(url);
var file = './firm_links_test/'+search+'.json';

// get data 
x(url, 'tbody tr', [{
    firm: '.ResultName',
    fca_link: 'a@href',
    trading_names: '.TradingNames | trim',
    ref_number: 'tr td+ td+ td+ td',
    status: '.CurrentStatus',
    }])//(function(err, obj) {console.log(err); console.log(obj);})
    .write(file);
}
end = new Date().getTime();
console.log ('Run time: ' + (end - start) + 'ms');