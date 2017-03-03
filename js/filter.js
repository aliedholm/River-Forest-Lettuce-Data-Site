//function to filter readings that are obviously reported in error
function badReadingsFilter(d){
	var graphSetFilter = [];
	d.forEach(function(object, i){
		point = parseFloat(object.reading);
		if(point < inputLimit[sensorIndex] && point > inputFloor[sensorIndex]){
			graphSetFilter.push(object);
		}
	})
	graphSet = graphSetFilter;
}

//function to set the scale of the y axis
function inputLimitFilter(d){
	d.forEach(function(q, i){
		if (q[0] == currentSensorShort){
			sensorIndex = i;
			maxReading = inputLimit[i];
			minReading = inputFloor[i];
		}
	})
}
