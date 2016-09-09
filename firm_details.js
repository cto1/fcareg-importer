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
var array = fs.readFileSync('./postcodes/postcodesA-B.csv').toString().split("\n");
for(i in array) {
    console.log(i + ':' + array[i]);
}

// open file with links
for (postcode in array) {
 var pc = array[postcode].trim();
 var file = './firm_links/' + pc + '.json';
 var firms = JSON.parse(fs.readFileSync(file, 'utf8'));
 console.log(pc);

  // read links
  for (link in firms) {
   console.log(link +'-'+firms[link].firm +':'+firms[link].fca_link);
			var firm_file = ('./firm_details/'+ firms[link].ref_number.trim() + '.json').replace(/ /g,'');
			console.log(firm_file);

   var url = firms[link].fca_link;
			var start = new Date().getTime();
	
			// get data
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
					full_authorisation_status: '.AuthorisationStatus  | trim | replace_new_line | replace_space',
					full_panel: x(url, '.panel-group .panel', [{
					header: '.panel-heading .panel-title | trim | replace_new_line | replace_space',
					body: '.panel-body | trim | replace_new_line | replace_space'
					}]),
					permission: x(url, '.panel-group .panel .ShPo_PermissionsTable', [{
					header: '.PermissionsListHeader | trim | replace_new_line | replace_space',
					body: ['li  | trim | replace_new_line | replace_space']
					}])  
			})//(function(err, obj) {console.log(err); obj.url= url; fs.writeFile(firm_file, JSON.stringify(obj,  null, 2) , 'utf-8')})
			.write(firm_file);

    //process data
    // var firm_obj = JSON.parse(fs.readFileSync(firm_file, 'utf8'));
				// firm_obj.url = url;
				// fs.writeFileSync(firm_file, JSON.stringify(firm_obj, null, 4), 'utf8');

			}

	}

var end = new Date().getTime();
console.log ('Run time: ' + (end - start) + 'ms');