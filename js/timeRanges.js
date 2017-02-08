if(selectionSize) {
	selectionTime = -(selectionSize);
}
//local variables of use for date selections

var maxDate0; 
var maxDate1;
var maxDate2;
var maxDate3;
var minDate0;
var minDate1;
var minDate2;
var minDate3;

var maxDates = [];
var minDates = [];

function sensorArray(){
	sensors = [sens1, sens2, sens3, sens4];
}

//determine the newest timestamp in dataset
function maxDatesCalc(sensorSet){
	for (var i = 0; i < sensorSet.length; i++){
		maxDates[i] = d3.max(sensors[i], function(d) {
			return (timeParser(d.time));
		});
	}
}

//determine the oldest timestamp in dataset
function minDatesCalc(sensorsSet){
	for (var i = 0; i < sensorsSet.length; i++){
		minDates[i] = d3.min(sensors[i], function(d) {
			return (timeParser(d.time));
		});
	}
}

maxDatesCalc(sensors);
minDatesCalc(sensors);

maxDate = d3.max(maxDates);
minDate = d3.min(minDates);
