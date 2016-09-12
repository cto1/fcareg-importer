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
}).timeout(3000).delay(1000);
console.log()

// get file names
var fs = require('graceful-fs');
var gf = require ('./get_files.js');
var files = gf.getFiles('./firm_links_part1');
console.log(files);

for (i in files){
  var file = './firm_links/' +files[i];
  var firms = fs.readFileSync(file);
	firms = JSON.parse(firms);
  var start = new Date().getTime();
					// read links
					for (link in firms) {
							console.log(link +'-'+firms[link].firm +':'+firms[link].fca_link);
							var firm_file = ('./firm_details_part1/'+ firms[link].ref_number.trim() + '.json').replace(/ /g,'');
							//console.log(firm_file);

							var url = firms[link].fca_link;
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
						}
		var end = new Date().getTime();
		console.log ('Run time: ' + (end - start) + 'ms');
//})}
};