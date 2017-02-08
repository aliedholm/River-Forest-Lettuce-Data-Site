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
