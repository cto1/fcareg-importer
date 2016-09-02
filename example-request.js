var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');

request('https://register.fca.org.uk/shpo_searchresultspage?search=Grove+Capital&TOKEN=5zq3mgf0d8qk', function (error, response, body) {
  if (!error && response.statusCode == 200) {
   // console.log(body); // Show the HTML for the Google homepage. 

    fs.writeFile('output.json', body), function(err){

         console.log('File successfully written! - Check your project directory for the output.json file');

    };

    // get useful data
    var firm_name;
    var json = { firm_name : ""};

    var $ = cheerio.load(body);

    console.log($);

    var context_to_find = ".SearchResultsContainer";
    var tag_to_find = ".ResultName";

    var name = $(tag_to_find, context_to_find).text();
    console.log("found : "+ name + "\n");

    var auth_flag_tag = ".CurrentStatus Authorised Unauthorised search_popover";
    var auth_status = $(auth_flag_tag, context_to_find).text();
    console.log("found : "+ auth_status);


    // $(tag_to_find, context_to_find).filter(function(){
    //     console.log("found : "+ tag_to_find);
        
    // });
    // We'll use the unique header class as a starting point.

    $('.SearchResults_wrapper').filter(function(){

    // Let's store the data we filter into a variable so we can easily see what's going on.

                var data = $(this);
    // In examining the DOM we notice that the title rests within the first child element of the header tag. 
    // Utilizing jQuery we can easily navigate and get the text by writing the following code:

                firm_name = data.children().first().text();

    // Once we have our title, we'll store it to the our json object.

                json.firm_name = firm_name;

                console.log(firm_name);
    })

  };
});