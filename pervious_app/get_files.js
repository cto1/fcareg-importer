var fs = require('fs');

exports.getFiles = function (dir){
    return fs.readdirSync(dir);
}
