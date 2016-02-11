angular.module('utils.Utils', [])

.factory('Util', [function() {
	return {
        dhms: function (t) {
            var days, hours, minutes, seconds, formatArr =[];
            days = Math.floor(t / 86400);
            t -= days * 86400;
            hours = Math.floor(t / 3600) % 24;
            t -= hours * 3600;
            minutes = Math.floor(t / 60) % 60;
            t -= minutes * 60;
            seconds = t % 60;

            [
                days + 'd',
                hours + 'h',
                minutes + 'm',
                seconds + 's'
            ].forEach(function(item) {
            	if(formatArr.length === 2) {
            		return formatArr
            	}
            	if(parseInt(item) !== 0) {
            		formatArr.push(item)
            	}
            });

            return formatArr.join(' ')
        },
        dateAdd: function(date, interval, units) {
        	var ret = new Date(date); //don't change original date
        	console.log('ret ' + ret)
  			switch(interval.toLowerCase()) {
    			case 'year'   :  ret.setFullYear(ret.getFullYear() + units);  break;
    			case 'quarter':  ret.setMonth(ret.getMonth() + 3*units);  break;
    			case 'month'  :  ret.setMonth(ret.getMonth() + units);  break;
    			case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
    			case 'day'    :  ret.setDate(ret.getDate() + units);  break;
    			case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
    			case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
    			case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
    			default       :  ret = undefined;  break;
  			}
  			return ret;
        }
  	};	
}]);