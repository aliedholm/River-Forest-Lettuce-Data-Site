//Parse the Date/Time into plotable data
var timeParser = d3.time.format("%Y-%m-%d %X").parse;
 

function zeroDate (date){
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	}	

function date24 (date){
	currentDate = new Date(date);
	currentDate.setHours(currentDate.getHours() + currentDate.getTimezoneOffset() / 60);
	zeroDate(currentDate);
	currentDateEnd = d3.time.hour.offset(currentDate, 24);
	n = availableDates.indexOf(date);
	currentDateShort =  availableDates[n];
}
