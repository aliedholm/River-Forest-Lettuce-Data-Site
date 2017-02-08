function drawco2(selectionSize) {
//Clear graph from last time
	d3.select("#co2space").remove();
	d3.selectAll(".d3-tip1").remove();
	d3.selectAll(".d3-tip2").remove();
	d3.selectAll(".d3-tip3").remove();
	d3.selectAll(".d3-tip4").remove();
	d3.selectAll(".panel-body").remove();

//Start of co2 Area
	//Get the Data for all co2 series
	co21graph = d3.json("php/co21.php", function(co21Points){

//Global co2 Variable Settings
					var margin = {top: 10, right: 5, bottom: 30, left: 50};
					//var windowWidth = $(window).width(); //get the width of the screen
					var windowWidth = document.getElementById("co2Area").getBoundingClientRect();
					var width = windowWidth.width - margin.left - margin.right;
					var height = 470 - margin.top - margin.bottom;

					var graphPadding = 1;

					var circleSize = 3;
					var lineStroke = 2;
					var co21Color = "green";

//Parse the Date/Time into plotable data
	//Parser Function to sort out format from MYSQL
					var timeParser = d3.time.format("%Y-%m-%d %X").parse;

//Calculate the time ranges of input data
					var selectionTime = -(width/500);
						if (selectionSize > 0) {
							selectionTime = -(selectionSize);
						}
					var maxdateco21 = d3.max(co21Points, function(d) {
						return (timeParser(d.time));
					});
					var mindateco21 = d3.min(co21Points, function(d) {
						return (timeParser(d.time));
					});

					var dateSenseMin = [mindateco21]
					var dateSenseMax = [maxdateco21]

					mindate = d3.min(dateSenseMin);
					maxdate = d3.max(dateSenseMax);

					rollingselection = d3.time.hour.offset(maxdate, selectionTime)

//filtering out data points outside the current selection time
					co21Points = co21Points.filter(function(d) {
						return timeParser(d.time) > rollingselection;
					});

//Setting the sensible input of data
					var co2SenseLBco21 = d3.min(co21Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var co2SenseUBco21 = d3.max(co21Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var co2SenseLBArr = [co2SenseLBco21]
					var co2SenseUBArr = [co2SenseUBco21]

					co2SenseLB = d3.min(co2SenseLBArr);
					co2SenseUB = d3.max(co2SenseUBArr);

					var xAxisTicks = (width/100);
					var yAxisTicks = 10;

//Calculate the Data Statistics
	//Means
					var meanco21 = d3.mean(co21Points,function(d) {
						return +d.reading;
					});
					var meanco21 = meanco21.toFixed(3);
				
	//Median	
					var medianco21 = d3.median(co21Points,function(d) {
						return +d.reading;
					});
					var medianco21 = medianco21.toFixed(3);

	//Maxs and Mins
					var maxco21 = d3.max(co21Points, function(d) {
						return +d.reading;
					});
					var minco21 = d3.min(co21Points, function(d) {
						return +d.reading;
					});

	//Most Rco2ent Date
					maximumdateco21 = String(maxdateco21).substring(0,25);			

//Filter out obvious errors in data reading
	//Filter out by Lower Bounds
					co21Points = co21Points.filter(function(d) {
						return +d.reading >= co2SenseLB;
					});

	//Filter out by Upper Bounds
					co21Points = co21Points.filter(function(d) {
						return +d.reading <= co2SenseUB;
					});
	
//Create Scales for co2
					var co2xScale = d3.time.scale()
						.domain([rollingselection, maxdate])
						.range([margin.left, (width)]);

					var co2yScale = d3.scale.linear()
						.domain([co2SenseLB, co2SenseUB])
						.range([(height - margin.bottom), margin.top]);

//Design Axis for co2
					var co2xAxis = d3.svg.axis()
						.ticks(xAxisTicks)
						.orient("bottom")
						.scale(co2xScale);

					var co2yAxis = d3.svg.axis()
						.ticks(yAxisTicks)
						.orient("left")
						.scale(co2yScale);

//Create SVG co2 canvas element
					var co2Canvas = d3.select("#co2Area")
						.append("svg")
						.attr("id", "co2space")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
						.append("g")
						.attr("transform", "translate(0, 0)");

//Build Tooltips for co2
					var co2Tip1 = d3.tip()
						.attr('class', 'd3-tip1')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

//Activate Tooltips for co2
					co2Canvas.call(co2Tip1);

//Line Function
					var lineGen = d3.svg.line()
					    .x(function(d) {
					        return co2xScale(timeParser(d.time));
					    })
					    .y(function(d) {
					        return co2yScale(d.reading);
					    });	    

//Handle Graphing co21
	//Draw co21 Line
					co2Canvas.append('svg:path')
						.attr('d', lineGen(co21Points))
						.attr("class", "co2line")
						.attr("id", "co21line")
						.attr('stroke', co21Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create co21 plot dots
					co21dots = co2Canvas.selectAll("circle.co21Points")
					   	.data(co21Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "co21points")
					    .style("fill", co21Color)
					    .attr("cx", function(d) {
					   		return (co2xScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (co2yScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', co2Tip1.show)  
					    .on('mouseout', co2Tip1.hide);

//Write Out the Data Tables
					var co21PointsDesc = co21Points.sort(function(a, b){return b.id-a.id});
					var co21DataTableHolder = d3.select("#co21DataTable")
					var co21DataTable = co21DataTableHolder.selectAll(".co21DataPanel")
						.data(co21PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body co21DataPanel")
							.text(function(d) {
								return d3.values(d)
							});					

//Draw co2 axis
					co2Canvas.append("g")
						.attr("class", "xAxis")
						.attr("transform", "translate(0, " + (height - margin.bottom) + ")")
						.call(co2xAxis)
						.append("text")
						.attr("x", (width - margin.left))
						.attr("y", margin.bottom)
						.text("Reading Time: ");

					co2Canvas.append("g")
						.attr("class", "yAxis")
						.attr("transform", "translate(" + margin.left + ", 0)")
						.call(co2yAxis)
						.append("text")
						.attr("x", 0)
						.attr("y", margin.top)
						.text("Sensor Voltage");

//Writing Statistics Data to page
	//co21 Statistics
					var co21rco2ent = d3.select("#co21average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdateco21);					
					var co21average = d3.select("#co21average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meanco21 + " | Median: " + medianco21);
			/*		var co21stdDev = d3.select("#co21average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevco21);		*/
					var co21maxmin = d3.select("#co21average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxco21 + " | Min: " + minco21);
	}) 
}


