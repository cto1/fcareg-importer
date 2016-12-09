const request = require('sync-request');
const fs = require('fs');

var searchArray = ["https://register.fca.org.uk/ShPo_FirmDetailsPage?id=001b000000MfEE7AAN","https://register.fca.org.uk/ShPo_FirmDetailsPage?id=001b000000MfGIZAA3","https://register.fca.org.uk/ShPo_FirmDetailsPage?id=001b000000Mfh38AAB","https://register.fca.org.uk/ShPo_FirmDetailsPage?id=001b000000MfQJPAA3","https://register.fca.org.uk/ShPo_FirmDetailsPage?id=001b000000MfIanAAF","https://register.fca.org.uk/ShPo_FirmDetailsPage?id=001b000000MfEDwAAN","https://register.fca.org.uk/ShPo_FirmDetailsPage?id=001b000000MfEDuAAN","https://register.fca.org.uk/ShPo_FirmDetailsPage?id=001b000000MfLuEAAV","https://register.fca.org.uk/ShPo_FirmDetailsPage?id=001b000000Mg9gxAAB","https://register.fca.org.uk/ShPo_FirmDetailsPage?id=001b000000MfI4aAAF"];

//for (i in searchArray) {
//  console.log(searchArray[i]);
//  var response = request('GET', searchArray[i]);
//  fs.writeFileSync(`./files/${i}.html`, response.getBody());
//  console.log(searchArray[i]);
//};

var url = 'https://register.fca.org.uk/ShPo_FirmDetailsPage?id=001b000000MfEE7AAN';

var res = request('GET', url);

try {
  res.getBody();
} catch (error) {
  console.log('Error: ', error.statusCode);
};
