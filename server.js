var http = require('http');
var db = require('./models/db');

var server = http.createServer();

server.on('request', require('./app'));

db.connect()
	.then(function(){
		return db.Spa.remove();
	})
	.then(function(){
		return db.Spa.create({
			name: 'foo',
			priority: 8
		});
	})
	.then(function(spa){
		console.log(spa);
		return db.Spa.create({
			name: 'bazz',
			priority: 2
		});
	})
	.then(function(spa){
		console.log(spa);
		server.listen(3000, function(){
			console.log('server is running on 3000');
		});
	});