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

var start = new Date().getTime();
var url = 'https://register.fca.org.uk/ShPo_FirmDetailsPage?id=001b000000MfIeqAAF';

var file = 'details.json';

x(url, '#content', {
  name: '.RecordName',
  
  pervious_names: '.FirmPreviousNames | trim | replace_new_line | replace_space',
  status: '.alert h4 .statusbox | trim | replace_new_line | replace_space',
  ref_number: '.ReferenceNumber | trim | replace_new_line | replace_space',
  products_covered: x('.ProductsCovered', {
    products: ['li  | trim | replace_new_line | replace_space']}),
  other_note: x('.alert span+ span', {
    title: 'h4', 
    note: ['p | trim | replace_new_line | replace_space']}),
  details: x('https://register.fca.org.uk/ShPo_FirmDetailsPage?id=001b000000MfIeqAAF', '.panel-group .panel', [{
  headings: '.panel-heading .panel-title | trim | replace_new_line | replace_space',
  body: '.panel-body | trim | replace_new_line | replace_space'
  }])  
})//(function(err, obj) {console.log(err); console.log(obj);})
.write(file)

/*
x('https://register.fca.org.uk/ShPo_FirmDetailsPage?id=001b000000MfIeqAAF', '.panel-group .panel', [{
  headings: '.panel-heading .panel-title | trim | replace_new_line | replace_space',
  body: '.panel-body | trim | replace_new_line | replace_space'
  //basic_details: '.panel .panel',
}])//(function(err, obj) {console.log(err); console.log(obj);})
.write(file)

  */
  var end = new Date().getTime();
  console.log ('Run time: ' + (end - start) + 'ms')
