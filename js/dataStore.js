//main data fetching and storing function
function dataStore(sensorPack){
	for (var i = 0; i < sensorPack.length; i++){
		sensorNames.push(sensorPack[i]);
		d3.json("php/" + sensorPack[i] + ".php", function(d){
			sensors.push(d);
		})
	}

}

//function to build data object
function sortByDate(sensorsSet){
	for (var i = 0; i < sensorsSet.length; i++){
		dataByDate["sensor" + i] = {};
		var dateObj = {};
		for (var i2 = 0; i2 < sensorsSet[i].length; i2++){
			currentDate = sensorsSet[i][i2].time.toString().substring(0,10);
			dateObj[currentDate] = [];
		}
		for (var i3 = 0; i3 < sensorsSet[i].length; i3++){
			currentDate = sensorsSet[i][i3].time.toString().substring(0,10);
			dateObj[currentDate].push(sensorsSet[i][i3]);
		}	
		dataByDate["sensor" + i] = dateObj; 
		var dateRange = Object.keys(dataByDate["sensor" + i]);
		for (var i4 = 0; i4 < dateRange.length; i4++){
			if (availableDates.indexOf(dateRange[i4]) == -1){
				availableDates.push(dateRange[i4]);
			}
		}
	}
	currentDate = d3.max(availableDates);
}
