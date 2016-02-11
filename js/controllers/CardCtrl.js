angular.module('controllers.CardCtrl',[])

.controller('CardCtrl', function($scope,DataService,$routeParams, $location ) {
	$scope.deck = DataService.getDeck($routeParams.deckId);
	$scope.cardData = DataService.getCard($scope.deck.id, $routeParams.cardId);
	console.log($scope.active)
	if($scope.cardData !== undefined) {
		angular.extend($scope,$scope.cardData);
	} else {
		angular.extend($scope,$scope.card);
	}
	$scope.learnMode = false;

	$scope.ok = function() {
		$scope.isFlipped = true
	}
	$scope.close = function() {
		$location.path('deck/' + $routeParams.deckId +'/cards')
	}
	$scope.iKnowIt = function() {
		DataService.setTimeToRepeat($scope.deck.id, $scope.activeItem.id, true)
		$scope.isFlipped = true
	}
	$scope.iDontKnowIt = function() {
		DataService.setTimeToRepeat($scope.deck.id, $scope.activeItem.id, false)
		$scope.isFlipped = true
	}
	$scope.toRepeatNextCard = function() {
		$scope.selectActive()
	}
});