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
function uniqueDates(sensorsSet, callback){
	for (var i = 0; i < sensorsSet.length; i++){
		sensorsSet[i].forEach(function(d){
			if(availableDates.indexOf(timeParser(d.time).toString().substring(0,15)) == -1){
				availableDates.push(timeParser(d.time).toString().substring(0,15));
				availableDatesFull.push(d.time);
			}
		})
	}
	availableDates.sort(function(a,b){
		return new Date(b) - new Date(a);
	});
	availableDatesFull.sort(function(a,b){
		return new Date(b) - new Date(a);
	});
	currentDate = d3.time.day.floor(timeParser(availableDatesFull[0]));
	currentDateEnd = d3.time.hour.offset(currentDate, 24);
	currentDatePrev = d3.time.hour.offset(currentDate, -24);
	callback(sensors, availableDates);
}

//sort each sensors data into arrays by date
function sortByDate(sensorsSet, dataDates){
	for (var i = 0; i < sensorsSet.length; i++){
		if(i > 0){
			dataByDate.push([]);
		}
		for (var i2 = 0; i2 < dataDates.length; i2++){
				dataByDate[i].push([]);
			for (var i3 = 0; i3 < sensorsSet[i].length; i3++){
				if(dataDates[i2] == timeParser(sensorsSet[i][i3].time).toString().substring(0,15)){
					dataByDate[i][i2].push(sensorsSet[i][i3]);
				}
			}
		}
	}
}

