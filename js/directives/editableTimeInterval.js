angular.module('directives.editableTimeInterval', [])

.directive('editableTimeInterval', function(dhmsObjectFilter) {
	return {
		restrict: "A",
    scope: {
      ms: '=',
      onChangeInterval: '&'
    },
    link: function(scope, element,attrs) {
      var form = angular.element('<form name="intervalForm"><div class="labels"><label for="days">дни</label><label for="hours">часы</label><label for="minutes">минуты</label></div><input id="days" type="number" min="0" max="100" ng-model="$parent.days" required></input><input id="hours" type="number" min="0" max="100" ng-model="hours" required></input><input id="minutes" type="number" min="0" max="100" ng-model="minutes" required></input><button type="button" class="btn">ok</button></form>')
      var inputs, inputDays, inputHours, inputMinutes;

      element.on('click', function() {
        editModeOn();
      });

      function editModeOn() {
        var interval = dhmsObjectFilter(scope.ms)
        var days = interval.days
        var hours = interval.hours;
        var minutes = interval.minutes;

        element.addClass('edit-on')
        element.parent()[0].insertBefore(form[0], element.next()[0]);

        inputs = angular.element(element.parent().find('input'));
        inputDays = inputs[0];
        inputHours = inputs[1];
        inputMinutes = inputs[2];

        console.log(inputs)
        angular.element(inputDays).val(days)
        angular.element(inputHours).val(hours)  
        angular.element(inputMinutes).val(minutes) 
        element.parent().find('button').on('click', editModeOff)
      }
      function editModeOff() {
        var days = angular.element(inputDays).val()
        var hours = angular.element(inputHours).val()
        var minutes = angular.element(inputMinutes).val()

        var newInterval = toMilliseconds(days, hours, minutes)
        console.log(newInterval)

        scope.onChangeInterval({interval: newInterval})
        element.removeClass('edit-on')
        element.parent().find('form').remove()
        scope.$apply()
      }
      function toMilliseconds(d, h, m) {
        return ((+d*24 + (+h)) * 60 + (+m)) * 60000
      }
      // function toDhm(ms) {
      //   var minutes = ~~((ms / 60000) % 60);
      //   var hours = ~~((minutes / 60) % 24);
      //   var days = ~~(hours / 24);
      //   return {
      //     days: days,
      //     hours: hours,
      //     minutes: minutes
      //   }
      // }
    }
	}
})