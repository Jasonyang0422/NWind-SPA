var app = angular.module('spa', []);

var showItems = function($scope, $http){
	$http.get('/spa')
		.then(function(response){
			$scope.spas = response.data;
		});
	// removeArrows();
};

// var removeArrows = function(){
// 	$(document).ready(function(){
// 		var last = $('.list-group').children().last();
// 		var first = $('.list-group').children().first();
// 		console.log(first.children('.up').attr('class'), last);
// 		first.children('.up').hide();
// 		last.children('.down').hide();
// 	});
// };


app.controller('post', function($scope, $http){
	$('#error').hide();
	$scope.save = function(){
		var name = $('#name').val();
		var priority = $('#priority').val()*1;
		if(!name)
			$('#error').show();
		else if(!priority)
			$('#error').show();
		else{
			$('#error').hide();
			$http.post('/spa', {name: name, priority: priority})
				.then(function(response){
					$scope.spa = response.data;
					console.log($scope.spa);
				})
		}
	};
});

app.controller('listGroup', function($scope, $http){
	showItems($scope, $http);
	$('#save').click(function(){
		showItems($scope, $http);
	});

	$(document).on('click', '.delete', function(){
		var id = $(this).attr('data-id');
		$http.delete(`/spa/${id}`)
			.then(function(response){
				console.log(response.data);
				showItems($scope, $http);
			})
	});//如果用$('.delete').click不行，因为DOM还没加载完就执行了该命令

	$scope.upOrDown = function(id, direction){
		$http.put(`/spa/${id}/${direction}`)
			.then(function(response){
				console.log(response.data);
				showItems($scope, $http);
			})
	};
});















