angular.module('controllers.RepeatCardsCtrl', [])

.controller('RepeatCardsCtrl', function($scope, $location) {
	
	$scope.activeItem = $scope.repeatCards[$scope.repeatCards.length-1];
	console.log($scope.activeItem)
	$scope.isActive = function(item) {
		return $scope.activeItem == item
	}
	$scope.selectActive = function() {
		$scope.repeatCards.pop();
		$scope.activeItem = $scope.repeatCards[$scope.repeatCards.length-1];
		console.log($scope.activeItem)
		if(!$scope.activeItem) {
			return $location.path('/deck/'+$scope.deck.id) 
		}
	}
});