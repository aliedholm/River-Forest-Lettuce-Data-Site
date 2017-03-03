function dateDropDown (dates){
	for(var i = 0; i < dates.length; i ++){
		d3.select("#dateDrop")
			.append("a")
				.attr("class", "dropdown-item dropdownDate")
				.attr("href", "#")
				.attr("onclick", "graphByDate('" + dates[i] + "');")
				.append("p")
					.attr("class", "dropdown-text")
					.text(dates[i]);
	}
}

function dateInc (dateChoice){
	d3.select("#dateDropMenu")
		.append("div")
		.attr("id","graphDate")
		.text(dateChoice + "  ")
		.append("span")
		.attr("class", "glyphicon glyphicon-chevron-down");
	dateIndex = availableDates.indexOf(dateChoice);
	d3.select("#dateLeft")
		.attr("onclick", "graphByDate('" + availableDates[dateIndex + 1] + "');");
	d3.select("#dateRight")
		.attr("onclick", "graphByDate('" + availableDates[dateIndex - 1] + "');");
}		

function sensorButtons (d){
	for(var i = 0; i < d.length; i++){
		d3.select("#sensorDrop")
			.append("a")
				.attr("class", "dropdown-item dropdownSensor")
				.attr("href", "#")
				.attr("onclick", "dataStore(sensorArray[" + i + "], fullNames[" + i + "], sortByDate)")
				.append("p")
					.attr("class", "dropdown-text")
					.text(fullNames[i]);
	}
} 
