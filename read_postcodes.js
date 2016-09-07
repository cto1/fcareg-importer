var fs = require('fs');
var array = fs.readFileSync('postcodesW-.csv').toString().split("\n");
for(i in array) {
    console.log(i + ':' + array[i]);
}





