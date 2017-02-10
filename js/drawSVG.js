//create SVG element in the HTML
function drawSVG(){
	canvas = d3.select('#area')
		.append("svg")
		.attr("id", "lineSpace")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(0,0)");	

	//line function for drawing the line
	var lineGen = d3.svg.line()
		.x(function(d) {
			return xScale(timeParser(d.time));
		})
		.y(function(d) {
			return yScale(d.reading);
		});
}
