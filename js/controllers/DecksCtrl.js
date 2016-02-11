angular.module('controllers.DecksCtrl', [])

.controller('DecksCtrl', function($scope, DataService, DataService) {
	$scope.decksList = DataService.getDecks();
	$scope.isEmptyDeckList = function() {
		return ($scope.decksList.length == 0)
	}

	$scope.createDeck = function(title) {
		if(title === "") return
		DataService.createDeck(title);
		this.title = '';
	}
	$scope.getNearCardToRepeatTime = function(deckId) {
		var cards = DataService.getDeck(deckId).cards;
		return cards.length ? DataService.getNearCardToRepeat(deckId).timeToRepeat : '';
	}
});