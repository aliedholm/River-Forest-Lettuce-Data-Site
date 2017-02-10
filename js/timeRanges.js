//determine the newest timestamp in dataset
function maxDatesCalc(sensorsSet){
	for (var i = 0; i < sensorsSet.length; i++){
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

//determine all unique dates in database
function uniqueDates(sensorsSet){
	for (var i = 0; i < sensorsSet.length; i++){
		sensorsSet[i].forEach(function(d){
			if(availableDates.indexOf(timeParser(d.time).toString().substring(0,15)) == -1){
				availableDates.push(timeParser(d.time).toString().substring(0,15));
				availableDatesFull.push(d.time);
			}
		})
	}
}

//sort each sensors data into arrays by date
function sortByDate(sensorsSet, dataDates){
	for (var i = 0; i < sensorsSet.length; i++){
		for (var i2 = 0; i < dataDates.length; i++){
			for (var i3 = 0; i < sensorsSet[i3].length; i++){
				if(dataDates[i2] == timeParser(sensorsSet[i][i3].time).toString().substring(0,15)){
debugger;
					dataByDate[i][i2].push(sensorsSet[i][i3]);
				}
			}
		}
	}
}
