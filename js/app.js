angular.module('app',[
	'ngRoute',
	'controllers.CardCtrl',
	'controllers.CreateCardCtrl',
	'controllers.DeckCtrl',
	'controllers.DecksCtrl',
	'controllers.EditCardCtrl',
	'directives.countdown',
	'services.dataService',
	'utils.Utils'
	])
.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'tpls/decks-list.html',
			controller: 'DecksCtrl'
		})
		.when('/deck/:deckId',{
			templateUrl: 'tpls/deck-menu.html',
			controller: 'DeckCtrl'
		})
		.when('/deck/:deckId/cards', {
			templateUrl: 'tpls/cards.html',
			controller: 'DeckCtrl'
		})
		.when('/deck/:deckId/create-card', {
			templateUrl: 'tpls/create-or-edit-card.html',
			controller: 'CreateCardCtrl'
		})
		.when('/deck/:deckId/edit-card/:cardId', {
			templateUrl: 'tpls/create-or-edit-card.html',
			controller: 'EditCardCtrl'
		})
		.when('/deck/:deckId/card/:cardId', {
			templateUrl: 'tpls/card.html',
			controller: 'CardCtrl'
		})
		.when('/deck/:deckId/repeat-card', {
			templateUrl: 'tpls/stack.html',
			controller: 'DeckCtrl'
		}) 
		.otherwise({redirectTo: '/'})
});



