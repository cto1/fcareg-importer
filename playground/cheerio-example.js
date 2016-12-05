const cheerio = require('cheerio');

let $ = cheerio.load('<h2 class="title">Hello world</h2><ul id="fruits"><li class="apple">Apple</li><li class="orange">Orange</li><li class="pear">Pear</li></ul>')

$('h2.title').text('Hello there!');
$('h2').addClass('welcome');

console.log($.html());
console.log($('ul').text());
console.log($('li').text());
console.log($('li[class=apple]').text());
