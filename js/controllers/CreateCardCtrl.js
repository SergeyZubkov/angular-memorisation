angular.module('controllers.CreateCardCtrl', [])

.controller('CreateCardCtrl', function($scope, DataService, $routeParams, $location) {

	$scope.submit = function(title,description) {
		if($scope.createCardForm.$valid) {
			DataService.createCard($routeParams.deckId, {title: title, description: description});
		}
		$scope.title = '';
		$scope.description = '';
		$location.path('/deck/'+ $routeParams.deckId)
	}
});
