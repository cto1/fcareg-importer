const request = require('request');
const fs = require('fs');

function log(source, message) {
  var now = new Date().toString();
  var log = `${now}: ${message} - ${source}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n');
};


// Streams are Event Emitters
var url = 'https://register.fca.org.uk/ShPo_FirmDetailsPage?id=001b000000MfEE7AAN';
request(url)
.on('response', (response) => log(url, response.statusCode))
.pipe(fs.createWriteStream('./request-file-save.html'))
.on('error', (error) => log(url, error))
.on('finish', () => log(url, 'All writes are now complete'));
