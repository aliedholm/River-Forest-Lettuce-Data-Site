//function to build data object
function sortByDate(sensorsSet){
	for (var i = 0; i < sensorsSet.length; i++){
		dataByDate["sensor" + i] = [];
		var dateObj = {};
		for (var i2 = 0; i2 < sensorsSet[i].length; i2++){
			currentDate = sensorsSet[i][i2].time.toString().substring(0,10);
			dateObj[currentDate] = [];
		}
		for (var i3 = 0; i3 < sensorsSet[i].length; i3++){
			currentDate = sensorsSet[i][i3].time.toString().substring(0,10);
			dateObj[currentDate].push(sensorsSet[i][i3]);
		}	
		dataByDate = dateObj; 
		availableDates = Object.keys(dataByDate);
	}
}
