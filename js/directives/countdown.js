angular.module('directives.countdown', [])

.directive('countdown', ['$interval',"$filter", function($interval, $filter) {
	return {
		restrict: 'A',
		scope: {
			date: '@',
			onComplete: '&'
		},
		link: function(scope, element) {
			var future;

			if (scope.date == '' || scope.date == undefined || scope.date == null) return

			future = new Date(scope.date);

			learnOrNotLearn();

			function learnOrNotLearn() {
				var diff = Math.floor((future.getTime() - new Date().getTime()));
				console.log(future)
				if (diff > 0) {
					return element.text( $filter('dhmsFormat1')(diff));
				} else {
					$interval.cancel(interval);
					scope.onComplete({string: 'учить'});
					return element.text('учить');
				}
			};

			var interval = $interval( function() { 
				learnOrNotLearn();
			}, 1000, this);

			element.on('$destroy', function() {
				$interval.cancel(interval);
			})
		}
	}
}]);
