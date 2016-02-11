angular.module('controllers.DeckCtrl', ['controllers.RepeatCardsCtrl'])

.controller('DeckCtrl', function($scope, DataService, $routeParams, $location, $filter) {
	$scope.deck = DataService.getDeck($routeParams.deckId);
	$scope.learnMode = false;
	if ($scope.deck.cards.length) {
		$scope.numberCards = $scope.deck.cards.length;
		$scope.repeatCards = DataService.getRepeatCards($scope.deck.id);
	} else {
		$scope.numberCards = null;
		$scope.repeatCards = null;
	}


	$scope.getNearCardToRepeatTime = function(deckId) {
		
		return $scope.deck.cards.length ? DataService.getNearCardToRepeat(deckId).timeToRepeat : '';
	}
	console.log($scope.getNearCardToRepeatTime($scope.deck.id))

	$scope.deleteDeck = function() {
		DataService.deleteDeck($scope.deck.id);
		$location.path('/')
	}


	$scope.enableLearnMode = function() {
		console.log($scope.repeatCards)
		$scope.learnMode = true;
	}


	$scope.removeCard = function(cardId) {
		DataService.deleteCard($scope.deck.id, cardId)
	}

});