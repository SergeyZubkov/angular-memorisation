angular.module('utils.underscore', [])

.factory('_', ['$window', function($window) {
  	return $window._; 
}]);

