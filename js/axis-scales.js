//Draw the Axis fcn
function drawAxis(){
	//create scale for x axis
	xScale = d3.time.scale()
		.domain([currentDate, currentDateEnd])
		.range([margin.left, width]);

	//create scale for y axis
	yScale = d3.scale.linear()
		.domain([0, 14])
		.range([(height - margin.bottom), margin.top]);

	//design axis for x
	xAxis = d3.svg.axis()
		.ticks(xAxisTicks)
		.orient("bottom")
		.scale(xScale);

	//design axis for y
	yAxis = d3.svg.axis()
		.ticks(yAxisTicks)
		.orient("left")
		.scale(yScale);

	canvas.append("g")
		.attr("class", "xAxis")
		.attr("transform", "translate(0, " + (height - margin.bottom) + ")")
		.call(xAxis)
		.append("text")
		.attr("x", (width - margin.left))
		.attr("y", margin.bottom)
		.text("reading time: ");

	canvas.append("g")
		.attr("class", "yAxis")
		.attr("transform", "translate(" + margin.left + ", 0)")
		.call(yAxis)
		.append("text")
		.attr("x", 0)
		.attr("y", margin.top)
		.text(sensorNames[0]);
}
