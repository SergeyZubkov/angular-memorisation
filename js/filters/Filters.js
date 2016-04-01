angular.module('Filters', [])

.filter('dhms', function() {

    return function(t) {
        var days, hours, minutes, seconds;
            days = Math.floor(t / 86400);
            t -= days * 86400;
            hours = Math.floor(t / 3600) % 24;
            t -= hours * 3600;
            minutes = Math.floor(t / 60) % 60;
            t -= minutes * 60;
            seconds = t % 60;

            return [
                days + 'д',
                hours + 'ч',
                minutes + 'м',
                seconds + 'с'
            ].join(' ');
    }

})
.filter('dhmsObject', function() {

    return function(t) {
        var t = t/1000;
        var days, hours, minutes, seconds;
            days = Math.floor(t / 86400);

            t -= days * 86400;
            hours = Math.floor(t / 3600) % 24;
            t -= hours * 3600;
            minutes = Math.floor(t / 60) % 60;
            t -= minutes * 60;
            seconds = t % 60;

            return {
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds
            }
    }

})
.filter('dhmsFormat1', function($filter) {
    return function(ms) {
        var arr, formatArr = [];
        ms = ms /1000;
        arr = $filter('dhms')(ms).split(' ');
        console.log(arr)

        arr.forEach(function(item) {
                if(formatArr.length === 2) {
                    return formatArr
                }
                if(parseInt(item) !== 0) {
                    formatArr.push(item)
                }
            });

        return formatArr.join(' ');
    }
    
});

