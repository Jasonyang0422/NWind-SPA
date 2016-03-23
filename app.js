var express = require('express');
var bodyParser = require('body-parser');

var app = express();

module.exports = app;


app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/browser'));

app.use(bodyParser.json());

app.use('/spa', require('./router/router'));

app.get('/', function(req, res, next){
	res.sendFile(__dirname + '/browser/index.html');
});