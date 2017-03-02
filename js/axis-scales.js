//create SVG element in the DOM
function drawSVG(theWidth){
	canvas = d3.select('#area')
		.append("svg")
		.attr("id", "lineSpace")
		.attr("width", theWidth)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(0,0)");
}

//Draw the Axis fcn
function drawAxis(dateChoice){
	if (dateChoice){
		date24(dateChoice);
	}
	//create scale for x axis
	xScale = d3.time.scale()
		.domain([currentDate, currentDateEnd])
		.range([margin.left, width]);

	//create scale for y axis
	yScale = d3.scale.linear()
		.domain([0, (maxReading * 1.1)])
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
		.attr("class", "xAxis axis")
		.attr("transform", "translate(0, " + (height - margin.bottom) + ")")
		.call(xAxis)
		.append("text")
		.attr("x", (width - margin.left - margin.right))
		.attr("y", margin.bottom - 5)
		.text("reading time: ");

	canvas.append("g")
		.attr("class", "yAxis axis")
		.attr("transform", "translate(" + margin.left + ", 0)")
		.call(yAxis)
		.append("text")
		.attr("x", margin.left)
		.attr("y", margin.top - 20)
		.text(currentSensor);
}
