var app = angular.module('spa', []);


//not good naming.. how about SpasCtrl for your controller
app.controller('SpaListCtrl', function($scope, $http){
  $scope.error = null;
  var showItems = function(){
    $http.get('/spa')
      .then(function(response){
        $scope.spas = response.data;
      })
      .catch(function(){
        $scope.error = true;
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
      })
      .catch(function(){
        $scope.error = true;
      });
	};

	$scope.delete = function(spa){
		$http.delete('/spa/' + spa.id)
			.then(function(){
        showItems();
			})
      .catch(function(){
        $scope.error = true;
      });
	};
  showItems();

});
