var mongoose = require('mongoose');
var Promise = require('bluebird');

var spaSchema = new mongoose.Schema({
	name: String,
	priority: Number
});

var Spa = mongoose.model('Spa', spaSchema);

var _conn;

function connect(){
	if(_conn)
		return _conn;
	_conn = new Promise(function(resolve, reject){
		mongoose.connect('mongodb://localhost/nwind-spa', function(err){
			if(err)
				reject(err);
			resolve(mongoose.connection);
		});
	});
	return _conn;
}

module.exports = {
	connect: connect,
	Spa : Spa
};
