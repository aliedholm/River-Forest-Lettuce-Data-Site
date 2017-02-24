//Parse the Date/Time into plotable data
var timeParser = d3.time.format("%Y-%m-%d %X").parse;
 

function zeroDate (date){
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	}	
