//defining linegen function
var lineGen = d3.svg.line()
	.x(function(d) {
		return xScale(timeParser(d.time));
	})
	.y(function(d) {
		return yScale(d.reading);
	});

//draw line function
function drawLine(dataObject, sensorTitles){
	for (var i = 0; i < sensorTitles.length; i++){
		canvas.append('svg:path')
			.attr('d', lineGen(dataObject[2][5]))
			.attr("class", sensorTitles[i])
			.attr("id", sensorTitles[i])
			.attr('stroke', sensColors[i])
			.attr('stroke-width', lineStroke)
			.attr('fill', sensColors[i]);
	}
}

