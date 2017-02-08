//create scale for x axis
var xScale = d3.time.scale()
	.domain([rollingSelection, maxdate])
	.range([margin.left, (width)]);

//create scale for y axis
var yScale = d3.scale.linear()
	.domain([senseLB, senseUB])
	.range([(height - margin.bottom), margin.top]);

//design axis for x
var xAxis = d3.svg.axis()
	.ticks(xAxisTicks)
	.orient("bottom")
	.scale(xScale);

//design axis for y
var yAxis = d3.svg.axis()
	.ticks(yAxisTicks)
	.orient("left")
	.scale(yScale);

