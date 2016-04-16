angular.module('controllers.SettingsCtrl', [])

.controller('SettingsCtrl', function($scope, DataService, jintervals,  $routeParams) {
	$scope.deck = DataService.getDeck($routeParams.deckId);
 	$scope.intervals = DataService.getIntervals($scope.deck);
 	$scope.deckId =  $routeParams.deckId;
	$scope.changeInterval = function(deck, level, nmb, interval) {
		DataService.setInterval(deck, level, nmb, interval)
		$scope.intervals = DataService.getIntervals($scope.deck);
    $scope.$apply()
	}
});