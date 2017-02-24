//main data fetching and storing function
function dataStore(sensorPack, callback){
	for (var i = 0; i < sensorPack.length; i++){
		var count = 0;
		sensorNames.push(sensorPack[i]);
		d3.json("php/" + sensorPack[i] + ".php", function(d){
			sensors.push(d);
			count++;
			if (count == (sensorPack.length)){
				callback(sensors);
			}
		})
	}
}

//function to build data object
function sortByDate(sensorsSet){
	//loop through each sensor's
	for (var i = 0; i < sensorsSet.length; i++){
		dataByDate["sensor" + i] = {};
		var dateObj = {};
		//loop through each sensor's data and create empty arrays for it
		for (var i2 = 0; i2 < sensorsSet[i].length; i2++){
			currentDate = sensorsSet[i][i2].time.toString().substring(0,10);
			dateObj[currentDate] = [];
		}
		//reloop through each sensor's data and sort the reading objects into proper objects
		for (var i3 = 0; i3 < sensorsSet[i].length; i3++){
			currentDate = sensorsSet[i][i3].time.toString().substring(0,10);
			dateObj[currentDate].push(sensorsSet[i][i3]);
		}	
		//loop to deterimine full set of dates with available data
		dataByDate["sensor" + i] = dateObj; 
		dateRange = Object.keys(dataByDate["sensor" + i]);
		for (var i4 = 0; i4 < dateRange.length; i4++){
			if (availableDates.indexOf(dateRange[i4]) === -1){
				availableDates.push(dateRange[i4]);
			}
		}
	}
	currentDate = d3.max(availableDates);
	availableDates.sort();
	currentDateShort = currentDate;
	currentDate = new Date(currentDate);
	currentDate.setHours(currentDate.getHours() + currentDate.getTimezoneOffset() / 60);
	zeroDate(currentDate);
	currentDateEnd = d3.time.hour.offset(currentDate, 24);
	dateDropDown(availableDates);
	drawSVG();
	drawAxis();
	console.log("sorted");
}
