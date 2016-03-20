var http = require('http');

var server = http.createServer();

server.on('request', require('./app'));

server.listen(3000, function(){
	console.log('server is running on 3000');
});
