//defining linegen function
var lineGen = d3.svg.line()
	.x(function(d) {
		return xScale(timeParser(d.time));
	})
	.y(function(d) {
		return yScale(parseFloat(d.reading));
	});

//draw line function
function drawLine(dateChoice){
	if (dateChoice){
		currentDateShort = dateChoice;
	}
	var availableReadings = {};
	for (var i = 0; i < sensorNames.length; i++){
		if (dataByDate[sensorNames[i]][currentDateShort]){
			graphSet = dataByDate[sensorNames[i]][currentDateShort];
			badReadingsFilter(graphSet);
			var srs = [];
			graphSet.forEach(function(d, i2){
				srs.push(parseFloat(d.reading));
			})
			availableReadings[sensorNames[i]] = srs;
				canvas.append('svg:path')
					.attr('d', lineGen(graphSet))
					.attr("class", sensorNames[i] + " lines")
					.attr("id", sensorNames[i])
					.attr('stroke', sensColors[i])
					.attr('stroke-width', lineStroke)
					.attr('fill', "none");
				var dots = canvas.selectAll("circle.points" + i)
					.data(graphSet)
					.enter()
					.append("circle")
					.attr("class", "points" + i + " points")
					.style("fill", sensColors[i])
					.attr("cx", function(d){
						return xScale(timeParser(d.time));
					})
					.attr("cy", function(d){
						return yScale(parseFloat(d.reading));
					})
					.attr("r", circleSize);
		}
	}
	//rawStatsObject = availableReadings; 
	runStats(availableReadings);
	console.log(statsObject);
}
					
