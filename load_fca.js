var links = require ('./fca.json');

function getLink(index, array){
  return array[index].fca_link;
}

for (var i= 0; i < links.length; i++)
{
  console.log(i + ': '+ getLink(i, links));
}
/*
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
console.log(getRandomInt(0,25));

var time_wait;

for (var i = 0; i<100; i++ )
{
 time_wait = getRandomInt(0,25);
 console.log(time_wait);
 setTimeout( getLink(i, links[i].fca_link), time_wait * 1000 );
}
*/
