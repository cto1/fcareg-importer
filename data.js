const fs = require('fs');

var fetchData = () => {
  try {
    var dataString = fs.readFileSync('file-data.json');
    return dataString;
  } catch (e) {
    return [];
  }
};

var saveData = (data) => {
  fs.writeFileSync('file-data.json', data);
};

module.exports = {
  fetchData,
  saveData
};
