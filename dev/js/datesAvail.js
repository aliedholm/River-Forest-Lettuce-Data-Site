function uniqueDates(rawData){
	for(var i = 0; i < rawData.length; i++){
		var currentDate = rawData[i].time.substring(0,10);
		// currentDate = currentDate.toString;
		// currentDate = currentDate.substring(0, 10);
		if(availableDates.indexOf(currentDate) == -1) {
			availableDates.push(currentDate);
			availableDatesFull.push(rawData[i]);
		}
	}
}

function sortDates(raw1, raw2, raw3, raw4) {
	uniqueDates(raw1);
	uniqueDates(raw2);
	uniqueDates(raw3);
	uniqueDates(raw4);
	today = d3.max(availableDates);
	todayLong = d3.max(availableDatesFull);
}

function splitData(rawData){
	for(var i = 0; i < rawData.length; i++){
		if ((rawData[i].time).substring(0, 10)) 
	}
}