const fs = require('fs');

var fetchData = () => {
  try {
    var dataString = fs.readFileSync('file-data.json');
    return JSON.parse(dataString);
  } catch (e) {
    return [];
  }
};

var saveData = (data) => {
  fs.writeFileSync('file-data.json', JSON.stringify(data));
};


var originalData = {
  title: 'Some title2',
  body: 'Some body2'
};


saveData(originalData);

var data = fetchData();
console.log(typeof data);
console.log(data.title);
