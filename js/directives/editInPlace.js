angular.module('directives.editInPlace', [])
	
.directive('editInPlace', function(dhmsObjectFilter) {
	return {
		restrict: 'A',
		link: function($scope, element, attrs) {

			var form = angular.element( element.find('form')[0]);
			var btnSubmit = form.find('button');
			var input = angular.element(element.find('input'))[0];
			

			function initTime() {
				angular.extend($scope.intervalForm, dhmsObjectFilter($scope.interval))
				console.log($scope.intervalForm)
			};

			initTime();
			btnSubmit.on('click', function() {
				console.log($scope)
				var newIntervalValue = toMin($scope.intervalForm.days, $scope.intervalForm.hours, $scope.intervalForm.minutes);
				$scope.setInterval($scope.level, $scope.nmb, newIntervalValue)

				function toMin(days, hours, minutes) {
					console.log(days, hours, minutes)
					hours += days * 24;
					minutes += hours*60;
					console.log(minutes )
            		return minutes
				}

				close();
			})
			console.log(dhmsObjectFilter)
			
			element.addClass('edit-in-place');

			$scope.editing = false;

			$scope.edit = function() {
				$scope.editing = true;
				angular.element(document.querySelectorAll('.interval')).removeClass('active');
				element.addClass('active');
				input.focus();

			};

			form.on('keypress', function(e) {
				if(e.keyCode != 13) return 
				console.log(e.keyCode )
				close();
			});

			function close() {
				$scope.editing = false;
				element.removeClass('active')
			}

		}
	}
})