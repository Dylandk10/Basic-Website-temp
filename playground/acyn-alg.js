//make acronym function
var foobar = (str) => {
  var strt, hold;
  str = str.split(' ');
    strt = str.map((el) => {
      return el.slice(0, 1);
    });
    return console.log(strt.join('.').toUpperCase());
}

foobar('Dylan Joseph Kelly');
foobar('Mike Wabel, Hunt');


//make database name for acronym and put on website
db.collection('Users').find({
  name: 'Mike Cool'
}).toArray().then((res) => {
  var str, strt;
  res = res[0].name;
  str = res.split(' ');
  strt = str.map((el) => {
    return el.slice(0, 1);
  });
  console.log(strt.join('.').toUpperCase());

});
