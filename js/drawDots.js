//draw dots function
function drawDots(dataObject, sensorTitles){
	for (var i = 0; i < sensorTitles.length; i++){
		canvas.selectAll("circle")
			.data(dataObject[2][4])
			.enter()
			.append("circle")
			.attr("class", (sensorTitles[i]) + "dots")
			.style("fill", sensColors[i])
			.attr("cx", function(d) {
				return(xScale(timeParser(d.time)));
			})
			.attr("cy", function(d) {
				return(yScale(d.reading));
			})
			.attr("r", circleSize)
	}
}			
