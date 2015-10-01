var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

function Adjective() {
  this.sleepy = true;
  this.fuzzy = true;
  this.cranky = true;
  this.soporific = true;
  this.eloquent = true;
}

var adjective = new Adjective();

function getRandomWord (object) {
  var propArray = Object.keys(object);
  var randomProp = propArray[Math.floor(Math.random() * propArray.length)];
  return {word: randomProp};
}


app.get('/', function(req, res) {
  res.send('Hello Universe!');
});

app.get('/adjective', function(req, res) {
  res.send(getRandomWord(adjective));
});


app.listen(port, function() {
  console.log('server started on port ' + port);
  console.log(getRandomWord(adjective));
});
