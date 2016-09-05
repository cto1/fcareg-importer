var Xray = require('x-ray');
var x = Xray();

var start = new Date();

var i = 0;

  x('https://register.fca.org.uk/shpo_searchresultspage?FSF=1&FSF%7CAUF=1&search=W6&TOKEN=5zq3mgf0d8qk', 'tbody tr', {
  firm: ['.ResultName'],
  fca_link: ['a@href'],
  trading_names: ['.TradingNames'],
//  type_of_business: ['.search_popover'],
  ref_number: ['tr td+ td+ td+ td'],
  status: ['.CurrentStatus'],
 })//(function(err, obj) {console.log(err); console.log(obj);})
 .write('fca.json')

  var end = new Date();
  console.log ('Run time: ' + (end.getMilliseconds() - start.getMilliseconds()) + 'ms')