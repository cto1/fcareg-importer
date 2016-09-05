var Xray = require('x-ray');
var x = Xray();

var start = new Date();
var url = 'https://register.fca.org.uk/ShPo_FirmDetailsPage?id=001b000000MfIeqAAF';

var file = 'details.json';

//x('https://register.fca.org.uk/ShPo_FirmDetailsPage?id=001b000000MfIeqAAF',  {
 //  firm: 'title',
//  fca_link: ['a@href'],
//  trading_names: ['.TradingNames'],
//  type_of_business: ['.search_popover'],
//  ref_number: ['tr td+ td+ td+ td'],
//  status: ['.CurrentStatus'],
  //count: +i,
// })(function(err, obj) {console.log(err); console.log(obj);})
// .write(file)


x('https://register.fca.org.uk/ShPo_FirmDetailsPage?id=001b000000MfIeqAAF', '#content', {
  name: 'h1',
  pervious_names: '.FirmPreviousNames',
  status: '.alert h4 .statusbox',
  ref_number: '.ReferenceNumber',
  products_covered: x('.ProductsCovered', {
    products: ['li']})
})//(function(err, obj) {console.log(err); console.log(obj);})
.write(file)


  var end = new Date();
  console.log ('Run time: ' + (end.getMilliseconds() - start.getMilliseconds()) + 'ms')