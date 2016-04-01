angular.module('controllers.SettingsCtrl', [])

.controller('SettingsCtrl', function($scope, DataService, jintervals,  $routeParams) {
	$scope.deck = DataService.getDeck($routeParams.deckId);
 	$scope.intervals = DataService.getIntervals($scope.deck);
 	$scope.deckId =  $routeParams.deckId;
	$scope.setInterval = function(level, nmb, newIntervalValue) {
		DataService.setInterval($scope.deck, level, nmb, newIntervalValue)
		$scope.deck = DataService.getDeck($routeParams.deckId);
		$scope.intervals = DataService.getIntervals($scope.deck);
		 $scope.$apply();
	}
});