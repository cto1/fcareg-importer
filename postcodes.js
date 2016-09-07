var columns = ["postcode"];

require("csv-to-array")({
   file: 'Postcodes.csv',
   columns: columns
}, function (err, array) {
  console.log(err || array);
  console.log(array[0].postcode);
});

foreach (item in array)

