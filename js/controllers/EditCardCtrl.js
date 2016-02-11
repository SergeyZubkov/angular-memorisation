angular.module('controllers.EditCardCtrl', [])

.controller('EditCardCtrl', function($scope, DataService, $routeParams, $location, $window) {
	$scope.card = DataService.getCard($routeParams.deckId, $routeParams.cardId);
	$scope.title = $scope.card.title;
	$scope.description = $scope.card.description;

	$scope.submit = function(title,description) {
		
		DataService.editCard($routeParams.deckId, $routeParams.cardId ,{title: title, description: description});
		$scope.title = '';
		$scope.description = '';
		$window.history.back();
	}
});