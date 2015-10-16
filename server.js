var Adjective = require('./lib/adjective');
var Noun = require('./lib/noun');
var Verb = require('./lib/verb');
var bodyparser = require("body-parser");
var express = require('express');

var app = express();
app.disable("etag");

var port = process.env.PORT || 3000;
app.use(express.static(__dirname + "/app/")); //middleware method
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

var adjective;
var noun;
var verb;

reset();

function getRandomWord (object) {
  var propArray = Object.keys(object);
  var randomProp = propArray[Math.floor(Math.random() * propArray.length)];
  return {word: randomProp}; //return an object with key "word" and random-generated value
}

function reset () { //THIS IS MY NEW FEATURE
  adjective = new Adjective();
  noun = new Noun();
  verb = new Verb();
}

app.get('/', function(req, res) { //this is not required because static middleware handles
  res.sendFile("index.html");     //serving index.html and script.js
});

app.get('/adjective', function(req, res) {
  res.send(getRandomWord(adjective));
});

app.get('/noun', function(req, res) {
  console.log("get /noun", noun)
  res.send(getRandomWord(noun));
});

app.get('/verb', function(req, res) {
  res.send(getRandomWord(verb));
});

app.post("/adjective", function(req, res) {
  var postWordResponse = postWord(req.body.word, adjective);
  res.send(postWordResponse);
});

app.post("/noun", function(req, res) {
  console.log("/noun", noun)
  var postWordResponse = postWord(req.body.word, noun);
  res.send(postWordResponse);
});

app.post("/verb", function(req, res) {
  var postWordResponse = postWord(req.body.word, verb);
  res.send(postWordResponse);
});

app.post("/reset", function(req, res) {
  console.log("/reset")
  res.send(reset());
  console.log("/reset", noun)
});

function postWord (word, wordObject) {
  if (wordObject.hasOwnProperty(word)) {
   return {msg: 'We already have your awesome word, ' + word + ', in our list.'}
  } else {
    wordObject[word] = true;
    return {msg: 'Thanks for submitting ' + word + '!'};
  }
}

app.listen(port, function() {
  console.log('server started on port ' + port);
});
