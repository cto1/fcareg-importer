var createGroupedArray = function(arr, chunkSize=2) {
    var groups = [], i;
    for (i = 0; i < arr.length; i += chunkSize) {
        groups.push(arr.slice(i, i + chunkSize));
        chunkSize = Math.round(Math.random()*3);
        console.log(chunkSize);
    }
    return groups;
}

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
var groupedArr = createGroupedArray(arr, 4);
var result = JSON.stringify(groupedArr);

console.log(result);
//
// var randomSize = Math.round(Math.random()*200);
// console.log(randomSize);
