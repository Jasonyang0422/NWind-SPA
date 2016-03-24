var app = angular.module('spa', []);


//not good naming.. how about SpasCtrl for your controller
app.controller('SpaListCtrl', function($scope, $http){
  $scope.error = null;
  var showItems = function($scope, $http){
    $http.get('/spa')
      .then(function(response){
        $scope.spas = response.data;
      });
  };
	$scope.save = function(){
		if(!$scope.newSpa.name || !$scope.newSpa.priority){
      $scope.error = true;
      return;
    }
    $http.post('/spa', $scope.newSpa)
      .then(function(){
        $scope.error = false;
        showItems();
      });
	};

	$scope.delete = function(spa){
		$http.delete('/spa/' + spa.id)
			.then(function(response){
        showItems();
			});
	};
  showItems();

});
