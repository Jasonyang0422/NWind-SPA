var express = require('express');
var Spa = require('../models/db').Spa;
var Promise = require('bluebird');

var router = express.Router();

module.exports = router;


router.get('/', function(req, res, next){
	Spa.find({}).sort('priority')
		.then(function(spas){
			res.send(spas);
		})
		.then(null, next);
});

router.post('/', function(req, res, next){
	var name = req.body.name;
	var priority = req.body.priority;
	Spa.create({name: name, priority: priority})
		.then(function(spa){
			res.send(spa);
		})
		.then(next, null);
});

router.delete('/:id', function(req, res, next){
	var id = req.params.id;
	Spa.remove({_id: id})
		.then(function(){
			res.send('delete successfully');
		})
});

router.put('/:id/:direction', function(req, res, next){
	var id = req.params.id;
	var direction = req.params.direction;
	var record;
	Spa.find({}).sort('priority')
		.then(function(spas){
			spas.forEach(function(spa, index){
				if(direction === 'up'){
					if(spa.id === id){
						spa.priority = index;
						spas[index-1].priority += 1;
					}else{
						spa.priority = index + 1;
					}					
				}
				if(direction === 'down'){
					if(spa.id === id){
						spa.priority = index + 2;
						record = index;
					}else if(index === record + 1){
						spa.priority = index;
					}else{
						spa.priority = index + 1;
					}						
				}
			});
			return spas;
		})
		.then(function(spas){
			return Promise.map(spas, function(spa){
				spa.save();
			});
		})
		.then(function(){
			res.send('update successfully');
		}, next);
});











