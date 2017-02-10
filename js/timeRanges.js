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
console.log("start of i");
		if(i > 0){
			dataByDate.push([]);
		}
		for (var i2 = 0; i2 < dataDates.length; i2++){
console.log("start of i2");
console.log("i2 = " + i2);
			if(i2 > 0){
				dataByDate[i].push([]);
console.log("pushed empty array");
			}
			for (var i3 = 0; i3 < sensorsSet[i].length; i3++){
console.log("start of i3");
				if(dataDates[i2] == timeParser(sensorsSet[i][i3].time).toString().substring(0,15)){
console.log(i + "i");
console.log(i2 + "i2");
console.log(i3 + "i3");
					dataByDate[i][i2].push(sensorsSet[i][i3]);
console.log("post push");
				}
			}
		}
	}
}
