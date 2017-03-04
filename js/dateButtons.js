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

function writeStats(d){
	var keys = Object.keys(d);
	for (var i = 0; i < keys.length; i++){
		var keys2 = Object.keys(d[keys[i]]);
		if (d[keys[i]].mean > 0){
		d3.select("#statsRow")
			.append("div")
				.attr("class", "col-xs-3 statsBox")
				.append("div")
					.attr("class", "dropdown dropdownStats")
					.attr("id", "sensor" + i + "Stats")
					.append("button")
						.style("background-color", sensColors[i])
						.attr("class", "btn dropdown-toggle statsButton")
						.attr("type", "button")
						.attr("id", "sens" + i + "Stats")
						.attr("data-toggle", "dropdown")
						.attr("aria-haspopup", "true")
						.attr("aria-expanded", "false")
						.append("div")
							.text("Sensor " + (i+1) + " Stats  ")
							.append("span")
								.attr("class", "glyphicon glyphicon-chevron-down")
														
		d3.select("#sensor" + i + "Stats")
			.append("div")
				.attr("class", "dropdown-menu")
				.attr("aria-labelledby", "sensor" + i +"Stats")
				.attr("id", "sensors" + i +"Stats")
				
		for (var i2 = 0; i2 < keys2.length; i2++){
			d3.select("#sensors" + i + "Stats")
				.append("a")
					.attr("class", "dropdown-item dropdownStats")
					.attr("href", "#")
					.append("p")
						.attr("class", "dropdownText statsText")
						.text((keys2[i2]) + " : " + (d[keys[i]][keys2[i2]]));
		}
		}
	}
}
