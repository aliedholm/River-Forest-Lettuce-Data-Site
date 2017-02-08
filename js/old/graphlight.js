function drawlight(selectionSize) {
//Clear graph from last time
	d3.select("#lightspace").remove();
	d3.selectAll(".d3-tip1").remove();
	d3.selectAll(".d3-tip2").remove();
	d3.selectAll(".d3-tip3").remove();
	d3.selectAll(".d3-tip4").remove();
	d3.selectAll(".panel-body").remove();

//Start of light Area
	//Get the Data for all light series
	light1graph = d3.json("php/light1.php", function(light1Points){

//Global light Variable Settings
					var margin = {top: 10, right: 5, bottom: 30, left: 50};
					//var windowWidth = $(window).width(); //get the width of the screen
					var windowWidth = document.getElementById("lightArea").getBoundingClientRect();
					var width = windowWidth.width - margin.left - margin.right;
					var height = 470 - margin.top - margin.bottom;

					var graphPadding = 1;

					var circleSize = 3;
					var lineStroke = 2;
					var light1Color = "green";

//Parse the Date/Time into plotable data
	//Parser Function to sort out format from MYSQL
					var timeParser = d3.time.format("%Y-%m-%d %X").parse;

//Calculate the time ranges of input data
					var selectionTime = -(width/500);
						if (selectionSize > 0) {
							selectionTime = -(selectionSize);
						}
					var maxdatelight1 = d3.max(light1Points, function(d) {
						return (timeParser(d.time));
					});
					var mindatelight1 = d3.min(light1Points, function(d) {
						return (timeParser(d.time));
					});

					var dateSenseMin = [mindatelight1]
					var dateSenseMax = [maxdatelight1]

					mindate = d3.min(dateSenseMin);
					maxdate = d3.max(dateSenseMax);

					rollingselection = d3.time.hour.offset(maxdate, selectionTime)

//filtering out data points outside the current selection time
					light1Points = light1Points.filter(function(d) {
						return timeParser(d.time) > rollingselection;
					});

//Setting the sensible input of data
					var lightSenseLBlight1 = d3.min(light1Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var lightSenseUBlight1 = d3.max(light1Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var lightSenseLBArr = [lightSenseLBlight1]
					var lightSenseUBArr = [lightSenseUBlight1]

					lightSenseLB = d3.min(lightSenseLBArr);
					lightSenseUB = 54511//d3.max(lightSenseUBArr);

					var xAxisTicks = (width/100);
					var yAxisTicks = 10;

//Calculate the Data Statistics
	//Means
					var meanlight1 = d3.mean(light1Points,function(d) {
						return +d.reading;
					});
					var meanlight1 = meanlight1.toFixed(3);

	//Median	
					var medianlight1 = d3.median(light1Points,function(d) {
						return +d.reading;
					});
					var medianlight1 = medianlight1.toFixed(3);
	
	//Maxs and Mins
					var maxlight1 = d3.max(light1Points, function(d) {
						return +d.reading;
					});
					var minlight1 = d3.min(light1Points, function(d) {
						return +d.reading;
					});

	//Most Rlightent Date
					maximumdatelight1 = String(maxdatelight1).substring(0,25);			

//Filter out obvious errors in data reading
	//Filter out by Lower Bounds
					light1Points = light1Points.filter(function(d) {
						return +d.reading >= lightSenseLB;
					});

	//Filter out by Upper Bounds
					light1Points = light1Points.filter(function(d) {
						return +d.reading <= lightSenseUB;
					});

//Create Scales for light
					var lightxScale = d3.time.scale()
						.domain([rollingselection, maxdate])
						.range([margin.left, (width)]);

					var lightyScale = d3.scale.linear()
						.domain([lightSenseLB, lightSenseUB])
						.range([(height - margin.bottom), margin.top]);

//Design Axis for light
					var lightxAxis = d3.svg.axis()
						.ticks(xAxisTicks)
						.orient("bottom")
						.scale(lightxScale);

					var lightyAxis = d3.svg.axis()
						.ticks(yAxisTicks)
						.orient("left")
						.scale(lightyScale);

//Create SVG light canvas element
					var lightCanvas = d3.select("#lightArea")
						.append("svg")
						.attr("id", "lightspace")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
						.append("g")
						.attr("transform", "translate(0, 0)");

//Build Tooltips for light
					var lightTip1 = d3.tip()
						.attr('class', 'd3-tip1')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

//Activate Tooltips for light
					lightCanvas.call(lightTip1);

//Line Function
					var lineGen = d3.svg.line()
					    .x(function(d) {
					        return lightxScale(timeParser(d.time));
					    })
					    .y(function(d) {
					        return lightyScale(d.reading);
					    });	    

//Handle Graphing light1
	//Draw light1 Line
					lightCanvas.append('svg:path')
						.attr('d', lineGen(light1Points))
						.attr("class", "lightline")
						.attr("id", "light1line")
						.attr('stroke', light1Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create light1 plot dots
					light1dots = lightCanvas.selectAll("circle.light1Points")
					   	.data(light1Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "light1points")
					    .style("fill", light1Color)
					    .attr("cx", function(d) {
					   		return (lightxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (lightyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', lightTip1.show)  
					    .on('mouseout', lightTip1.hide);

//Write Out the Data Tables
					var light1PointsDesc = light1Points.sort(function(a, b){return b.id-a.id});
					var light1DataTableHolder = d3.select("#light1DataTable")
					var light1DataTable = light1DataTableHolder.selectAll(".light1DataPanel")
						.data(light1PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body light1DataPanel")
							.text(function(d) {
								return d3.values(d)
							});

//Draw light axis
					lightCanvas.append("g")
						.attr("class", "xAxis")
						.attr("transform", "translate(0, " + (height - margin.bottom) + ")")
						.call(lightxAxis)
						.append("text")
						.attr("x", (width - margin.left))
						.attr("y", margin.bottom)
						.text("Reading Time: ");

					lightCanvas.append("g")
						.attr("class", "yAxis")
						.attr("transform", "translate(" + margin.left + ", 0)")
						.call(lightyAxis)
						.append("text")
						.attr("x", 0)
						.attr("y", margin.top)
						.text("lux");

//Writing Statistics Data to page
	//light1 Statistics
					var light1rlightent = d3.select("#light1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdatelight1);					
					var light1average = d3.select("#light1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meanlight1 + " | Median: " + medianlight1);
			/*		var light1stdDev = d3.select("#light1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevlight1);		*/
					var light1maxmin = d3.select("#light1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxlight1 + " | Min: " + minlight1);

	}) 
}


