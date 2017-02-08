function drawhumidity(selectionSize) {
//Clear graph from last time
	d3.select("#humidityspace").remove();
	d3.selectAll(".d3-tip1").remove();
	d3.selectAll(".d3-tip2").remove();
	d3.selectAll(".d3-tip3").remove();
	d3.selectAll(".d3-tip4").remove();
	d3.selectAll(".panel-body").remove();

//Start of humidity Area
	//Get the Data for all humidity series
	humidity1graph = d3.json("php/humidity1.php", function(humidity1Points){
		humidity2graph = d3.json("php/humidity2.php", function(humidity2Points){
			humidity3graph = d3.json("php/humidity3.php", function(humidity3Points){
				humidity4graph = d3.json("php/humidity4.php", function(humidity4Points){

//Global humidity Variable Settings
					var margin = {top: 10, right: 5, bottom: 30, left: 50};
					//var windowWidth = $(window).width(); //get the width of the screen
					var windowWidth = document.getElementById("humidityArea").getBoundingClientRect();
					var width = windowWidth.width - margin.left - margin.right;
					var height = 470 - margin.top - margin.bottom;

					var graphPadding = 1;

					var circleSize = 3;
					var lineStroke = 2;
					var humidity1Color = "green";
					var humidity2Color = "indianred";
					var humidity3Color = "lightblue";
					var humidity4Color = "orange";

//Parse the Date/Time into plotable data
	//Parser Function to sort out format from MYSQL
					var timeParser = d3.time.format("%Y-%m-%d %X").parse;

//Calculate the time ranges of input data
					var selectionTime = -(width/500);
						if (selectionSize > 0) {
							selectionTime = -(selectionSize);
						}
					var maxdatehumidity1 = d3.max(humidity1Points, function(d) {
						return (timeParser(d.time));
					});
					var mindatehumidity1 = d3.min(humidity1Points, function(d) {
						return (timeParser(d.time));
					});
					var maxdatehumidity2 = d3.max(humidity2Points, function(d) {
						return (timeParser(d.time));
					});
					var mindatehumidity2 = d3.min(humidity2Points, function(d) {
						return (timeParser(d.time));
					});
					var maxdatehumidity3 = d3.max(humidity3Points, function(d) {
						return (timeParser(d.time));
					});
					var mindatehumidity3 = d3.min(humidity3Points, function(d) {
						return (timeParser(d.time));
					});
					var maxdatehumidity4 = d3.max(humidity4Points, function(d) {
						return (timeParser(d.time));
					});
					var mindatehumidity4 = d3.min(humidity4Points, function(d) {
						return (timeParser(d.time));
					});

					var dateSenseMin = [mindatehumidity1, mindatehumidity2, mindatehumidity3, mindatehumidity4]
					var dateSenseMax = [maxdatehumidity1, maxdatehumidity2, maxdatehumidity3, maxdatehumidity4]

					mindate = d3.min(dateSenseMin);
					maxdate = d3.max(dateSenseMax);

					rollingselection = d3.time.hour.offset(maxdate, selectionTime)

//filtering out data points outside the current selection time
					humidity1Points = humidity1Points.filter(function(d) {
						return timeParser(d.time) > rollingselection;
					});
					humidity2Points = humidity2Points.filter(function(d) {
						return timeParser(d.time) > rollingselection;
					});
					humidity3Points = humidity3Points.filter(function(d) {
						return timeParser(d.time) > rollingselection;
					});
					humidity4Points = humidity4Points.filter(function(d) {
						return timeParser(d.time) > rollingselection;
					});

//Setting the sensible input of data
					var humiditySenseLBhumidity1 = d3.min(humidity1Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var humiditySenseUBhumidity1 = d3.max(humidity1Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var humiditySenseLBhumidity2 = d3.min(humidity2Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var humiditySenseUBhumidity2 = d3.max(humidity2Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var humiditySenseLBhumidity3 = d3.min(humidity3Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var humiditySenseUBhumidity3 = d3.max(humidity3Points, function(d) {
						return (+d.reading + graphPadding);
					});					

					var humiditySenseLBhumidity4 = d3.min(humidity4Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var humiditySenseUBhumidity4 = d3.max(humidity4Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var humiditySenseLBArr = [humiditySenseLBhumidity1, humiditySenseLBhumidity2, humiditySenseLBhumidity3, humiditySenseLBhumidity4]
					var humiditySenseUBArr = [humiditySenseUBhumidity1, humiditySenseUBhumidity2, humiditySenseUBhumidity3, humiditySenseUBhumidity4]

					humiditySenseLB = d3.min(humiditySenseLBArr);
					humiditySenseUB = d3.max(humiditySenseUBArr);

					var xAxisTicks = (width/100);
					var yAxisTicks = 10;

//Calculate the Data Statistics
	//Means
					var meanhumidity1 = d3.mean(humidity1Points,function(d) {
						return +d.reading;
					});
					var meanhumidity1 = meanhumidity1.toFixed(3);
					var meanhumidity2 = d3.mean(humidity2Points,function(d) {
						return +d.reading;
					});
					var meanhumidity2 = meanhumidity2.toFixed(3);
					var meanhumidity3 = d3.mean(humidity3Points,function(d) {
						return +d.reading;
					});
					var meanhumidity3 = meanhumidity3.toFixed(3);
					var meanhumidity4 = d3.mean(humidity4Points,function(d) {
						return +d.reading;
					});
					var meanhumidity4 = meanhumidity4.toFixed(3);
	//Median	
					var medianhumidity1 = d3.median(humidity1Points,function(d) {
						return +d.reading;
					});
					var medianhumidity1 = medianhumidity1.toFixed(3);
					var medianhumidity2 = d3.median(humidity2Points,function(d) {
						return +d.reading;
					});
					var medianhumidity2 = medianhumidity2.toFixed(3);
					var medianhumidity3 = d3.median(humidity3Points,function(d) {
						return +d.reading;
					});
					var medianhumidity3 = medianhumidity3.toFixed(3);
					var medianhumidity4 = d3.median(humidity4Points,function(d) {
						return +d.reading;
					});
					var medianhumidity4 = medianhumidity4.toFixed(3);
	//Standard Deviation	
	/*				var stdDevhumidity1 = d3.Deviation(humidity1Points,function(d) {
						return +d.reading;
					});
					var stdDevhumidity1 = stdDevhumidity1.toFixed(3);
					var stdDevhumidity2 = d3.Deviaton(humidity2Points,function(d) {
						return +d.reading;
					});
					var stdDevhumidity2 = stdDevhumidity2.toFixed(3);
					var stdDevhumidity3 = d3.Deviaton(humidity3Points,function(d) {
						return +d.reading;
					});
					var stdDevhumidity3 = stdDevhumidity3.toFixed(3);
					var stdDevhumidity4 = d3.Deviaton(humidity4Points,function(d) {
						return +d.reading;
					});
					var stdDevhumidity4 = stdDevhumidity4.toFixed(3);    */
	//Maxs and Mins
					var maxhumidity1 = d3.max(humidity1Points, function(d) {
						return +d.reading;
					});
					var minhumidity1 = d3.min(humidity1Points, function(d) {
						return +d.reading;
					});

					var maxhumidity2 = d3.max(humidity2Points, function(d) {
						return +d.reading;
					});
					var minhumidity2 = d3.min(humidity2Points, function(d) {
						return +d.reading;
					});

					var maxhumidity3 = d3.max(humidity3Points, function(d) {
						return +d.reading;
					});
					var minhumidity3 = d3.min(humidity3Points, function(d) {
						return +d.reading;
					});

					var maxhumidity4 = d3.max(humidity4Points, function(d) {
						return +d.reading;
					});
					var minhumidity4 = d3.min(humidity4Points, function(d) {
						return +d.reading;
					});	
	//Most Rhumidityent Date
					maximumdatehumidity1 = String(maxdatehumidity1).substring(0,25);
					maximumdatehumidity2 = String(maxdatehumidity2).substring(0,25);
					maximumdatehumidity3 = String(maxdatehumidity3).substring(0,25);
					maximumdatehumidity4 = String(maxdatehumidity4).substring(0,25);				

//Filter out obvious errors in data reading
	//Filter out by Lower Bounds
					humidity1Points = humidity1Points.filter(function(d) {
						return +d.reading >= humiditySenseLB;
					});
					humidity2Points = humidity2Points.filter(function(d) {
						return +d.reading >= humiditySenseLB;
					});
					humidity3Points = humidity3Points.filter(function(d) {
						return +d.reading >= humiditySenseLB;
					});								
					humidity4Points = humidity4Points.filter(function(d) {
						return +d.reading >= humiditySenseLB;
					});

	//Filter out by Upper Bounds
					humidity1Points = humidity1Points.filter(function(d) {
						return +d.reading <= humiditySenseUB;
					});
					humidity2Points = humidity2Points.filter(function(d) {
						return +d.reading <= humiditySenseUB;
					});
					humidity3Points = humidity3Points.filter(function(d) {
						return +d.reading <= humiditySenseUB;
					});								
					humidity4Points = humidity4Points.filter(function(d) {
						return +d.reading <= humiditySenseUB;
					});

//Create Scales for humidity
					var humidityxScale = d3.time.scale()
						.domain([rollingselection, maxdate])
						.range([margin.left, (width)]);

					var humidityyScale = d3.scale.linear()
						.domain([humiditySenseLB, humiditySenseUB])
						.range([(height - margin.bottom), margin.top]);

//Design Axis for humidity
					var humidityxAxis = d3.svg.axis()
						.ticks(xAxisTicks)
						.orient("bottom")
						.scale(humidityxScale);

					var humidityyAxis = d3.svg.axis()
						.ticks(yAxisTicks)
						.orient("left")
						.scale(humidityyScale);

//Create SVG humidity canvas element
					var humidityCanvas = d3.select("#humidityArea")
						.append("svg")
						.attr("id", "humidityspace")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
						.append("g")
						.attr("transform", "translate(0, 0)");

//Build Tooltips for humidity
					var humidityTip1 = d3.tip()
						.attr('class', 'd3-tip1')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

					var humidityTip2 = d3.tip()
						.attr('class', 'd3-tip2')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

					var humidityTip3 = d3.tip()
						.attr('class', 'd3-tip3')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

					var humidityTip4 = d3.tip()
						.attr('class', 'd3-tip4')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

//Activate Tooltips for humidity
					humidityCanvas.call(humidityTip1);
					humidityCanvas.call(humidityTip2);
					humidityCanvas.call(humidityTip3);
					humidityCanvas.call(humidityTip4);

//Line Function
					var lineGen = d3.svg.line()
					    .x(function(d) {
					        return humidityxScale(timeParser(d.time));
					    })
					    .y(function(d) {
					        return humidityyScale(d.reading);
					    });	    

//Handle Graphing humidity1
	//Draw humidity1 Line
					humidityCanvas.append('svg:path')
						.attr('d', lineGen(humidity1Points))
						.attr("class", "humidityline")
						.attr("id", "humidity1line")
						.attr('stroke', humidity1Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create humidity1 plot dots
					humidity1dots = humidityCanvas.selectAll("circle.humidity1Points")
					   	.data(humidity1Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "humidity1points")
					    .style("fill", humidity1Color)
					    .attr("cx", function(d) {
					   		return (humidityxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (humidityyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', humidityTip1.show)  
					    .on('mouseout', humidityTip1.hide);

//Handle Graphing humidity2
	//Draw humidity2 Line
					humidityCanvas.append('svg:path')
						.attr('d', lineGen(humidity2Points))
						.attr("class", "humidityline")
						.attr("id", "humidity2line")
						.attr('stroke', humidity2Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create humidity2 plot dots
					humidity2dots = humidityCanvas.selectAll("circle.humidity2Points")
					   	.data(humidity2Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "humidity2points")
					    .style("fill", humidity2Color)
					    .attr("cx", function(d) {
					   		return (humidityxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (humidityyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', humidityTip2.show)  
					    .on('mouseout', humidityTip2.hide);
	   								
//Handle Graphing humidity3
	//Draw humidity3 Line
					humidityCanvas.append('svg:path')
						.attr('d', lineGen(humidity3Points))
						.attr("class", "humidityline")
						.attr("id", "humidity3line")
						.attr('stroke', humidity3Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create humidity3 plot dots
					humidity3dots = humidityCanvas.selectAll("circle.humidity3Points")
					   	.data(humidity3Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "humidity3points")
					    .style("fill", humidity3Color)
					    .attr("cx", function(d) {
					   		return (humidityxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (humidityyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', humidityTip3.show)  
					    .on('mouseout', humidityTip3.hide);

//Handle Graphing humidity4
	//Draw humidity4 Line
					humidityCanvas.append('svg:path')
						.attr('d', lineGen(humidity4Points))
						.attr("class", "humidityline")
						.attr("id", "humidity4line")
						.attr('stroke', humidity4Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create humidity4 plot dots
					humidity4dots = humidityCanvas.selectAll("circle.humidity4Points")
					   	.data(humidity4Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "humidity4points")
					    .style("fill", humidity4Color)
					    .attr("cx", function(d) {
					   		return (humidityxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (humidityyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', humidityTip4.show)  
					    .on('mouseout', humidityTip4.hide);

//Write Out the Data Tables
					var humidity1PointsDesc = humidity1Points.sort(function(a, b){return b.id-a.id});
					var humidity1DataTableHolder = d3.select("#humidity1DataTable")
					var humidity1DataTable = humidity1DataTableHolder.selectAll(".humidity1DataPanel")
						.data(humidity1PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body humidity1DataPanel")
							.text(function(d) {
								return d3.values(d)
							});
					var humidity2PointsDesc = humidity2Points.sort(function(a, b){return b.id-a.id});
					var humidity2DataTableHolder = d3.select("#humidity2DataTable")
					var humidity2DataTable = humidity2DataTableHolder.selectAll(".humidity2DataPanel")
						.data(humidity2PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body humidity2DataPanel")
							.text(function(d) {
								return d3.values(d)
							});
					var humidity3PointsDesc = humidity3Points.sort(function(a, b){return b.id-a.id});
					var humidity3DataTableHolder = d3.select("#humidity3DataTable")
					var humidity3DataTable = humidity3DataTableHolder.selectAll(".humidity3DataPanel")
						.data(humidity3PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body humidity3DataPanel")
							.text(function(d) {
								return d3.values(d)
							});
					var humidity4PointsDesc = humidity4Points.sort(function(a, b){return b.id-a.id});
					var humidity4DataTableHolder = d3.select("#humidity4DataTable")
					var humidity4DataTable = humidity4DataTableHolder.selectAll(".humidity4DataPanel")
						.data(humidity4PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body humidity4DataPanel")
							.text(function(d) {
								return d3.values(d)
							});					

//Draw humidity axis
					humidityCanvas.append("g")
						.attr("class", "xAxis")
						.attr("transform", "translate(0, " + (height - margin.bottom) + ")")
						.call(humidityxAxis)
						.append("text")
						.attr("x", (width - margin.left))
						.attr("y", margin.bottom)
						.text("Reading Time: ");

					humidityCanvas.append("g")
						.attr("class", "yAxis")
						.attr("transform", "translate(" + margin.left + ", 0)")
						.call(humidityyAxis)
						.append("text")
						.attr("x", 0)
						.attr("y", margin.top)
						.text("% humidity");

//Writing Statistics Data to page
	//humidity1 Statistics
					var humidity1rhumidityent = d3.select("#humidity1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdatehumidity1);					
					var humidity1average = d3.select("#humidity1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meanhumidity1 + " | Median: " + medianhumidity1);
			/*		var humidity1stdDev = d3.select("#humidity1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevhumidity1);		*/
					var humidity1maxmin = d3.select("#humidity1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxhumidity1 + " | Min: " + minhumidity1);
	//humidity2 Statistics
					var humidity2rhumidityent = d3.select("#humidity2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdatehumidity2);	
					var humidity2average = d3.select("#humidity2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meanhumidity2 + " | Median: " + medianhumidity2);
			/*		var humidity2stdDev = d3.select("#humidity2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevhumidity2);		*/
					var humidity2maxmin = d3.select("#humidity2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxhumidity2 + " | Min: " + minhumidity2);
	//humidity3 Statistics
					var humidity3rhumidityent = d3.select("#humidity3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdatehumidity3);	
					var humidity3average = d3.select("#humidity3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meanhumidity3 + " | Median: " + medianhumidity3);
			/*		var humidity3stdDev = d3.select("#humidity3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevhumidity3);		*/
					var humidity3maxmin = d3.select("#humidity3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxhumidity3 + " | Min: " + minhumidity3);
	//humidity4 Statistics
					var humidity4rhumidityent = d3.select("#humidity4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdatehumidity4);	
					var humidity4average = d3.select("#humidity4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meanhumidity4 + " | Median: " + medianhumidity4);
			/*		var humidity4stdDev = d3.select("#humidity4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevhumidity4);      */
					var humidity4maxmin = d3.select("#humidity4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxhumidity4 + " | Min: " + minhumidity4);

				})
			})
		})
	}) 
}


