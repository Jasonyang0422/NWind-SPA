var express = require('express');

var app = express();

module.exports = app;


app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/browser'));

app.get('/', function(req, res, next){
	res.sendFile(__dirname + '/browser/index.html');
});