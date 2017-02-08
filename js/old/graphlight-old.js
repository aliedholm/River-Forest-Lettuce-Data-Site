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
		light2graph = d3.json("php/light2.php", function(light2Points){
			light3graph = d3.json("php/light3.php", function(light3Points){
				light4graph = d3.json("php/light4.php", function(light4Points){

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
					var light2Color = "indianred";
					var light3Color = "lightblue";
					var light4Color = "orange";

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
					var maxdatelight2 = d3.max(light2Points, function(d) {
						return (timeParser(d.time));
					});
					var mindatelight2 = d3.min(light2Points, function(d) {
						return (timeParser(d.time));
					});
					var maxdatelight3 = d3.max(light3Points, function(d) {
						return (timeParser(d.time));
					});
					var mindatelight3 = d3.min(light3Points, function(d) {
						return (timeParser(d.time));
					});
					var maxdatelight4 = d3.max(light4Points, function(d) {
						return (timeParser(d.time));
					});
					var mindatelight4 = d3.min(light4Points, function(d) {
						return (timeParser(d.time));
					});

					var dateSenseMin = [mindatelight1, mindatelight2, mindatelight3, mindatelight4]
					var dateSenseMax = [maxdatelight1, maxdatelight2, maxdatelight3, maxdatelight4]

					mindate = d3.min(dateSenseMin);
					maxdate = d3.max(dateSenseMax);

					rollingselection = d3.time.hour.offset(maxdate, selectionTime)

//filtering out data points outside the current selection time
					light1Points = light1Points.filter(function(d) {
						return timeParser(d.time) > rollingselection;
					});
					light2Points = light2Points.filter(function(d) {
						return timeParser(d.time) > rollingselection;
					});
					light3Points = light3Points.filter(function(d) {
						return timeParser(d.time) > rollingselection;
					});
					light4Points = light4Points.filter(function(d) {
						return timeParser(d.time) > rollingselection;
					});

//Setting the sensible input of data
					var lightSenseLBlight1 = d3.min(light1Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var lightSenseUBlight1 = d3.max(light1Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var lightSenseLBlight2 = d3.min(light2Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var lightSenseUBlight2 = d3.max(light2Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var lightSenseLBlight3 = d3.min(light3Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var lightSenseUBlight3 = d3.max(light3Points, function(d) {
						return (+d.reading + graphPadding);
					});					

					var lightSenseLBlight4 = d3.min(light4Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var lightSenseUBlight4 = d3.max(light4Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var lightSenseLBArr = [lightSenseLBlight1, lightSenseLBlight2, lightSenseLBlight3, lightSenseLBlight4]
					var lightSenseUBArr = [lightSenseUBlight1, lightSenseUBlight2, lightSenseUBlight3, lightSenseUBlight4]

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
					var meanlight2 = d3.mean(light2Points,function(d) {
						return +d.reading;
					});
					var meanlight2 = meanlight2.toFixed(3);
					var meanlight3 = d3.mean(light3Points,function(d) {
						return +d.reading;
					});
					var meanlight3 = meanlight3.toFixed(3);
					var meanlight4 = d3.mean(light4Points,function(d) {
						return +d.reading;
					});
					var meanlight4 = meanlight4.toFixed(3);
	//Median	
					var medianlight1 = d3.median(light1Points,function(d) {
						return +d.reading;
					});
					var medianlight1 = medianlight1.toFixed(3);
					var medianlight2 = d3.median(light2Points,function(d) {
						return +d.reading;
					});
					var medianlight2 = medianlight2.toFixed(3);
					var medianlight3 = d3.median(light3Points,function(d) {
						return +d.reading;
					});
					var medianlight3 = medianlight3.toFixed(3);
					var medianlight4 = d3.median(light4Points,function(d) {
						return +d.reading;
					});
					var medianlight4 = medianlight4.toFixed(3);
	//Standard Deviation	
	/*				var stdDevlight1 = d3.Deviation(light1Points,function(d) {
						return +d.reading;
					});
					var stdDevlight1 = stdDevlight1.toFixed(3);
					var stdDevlight2 = d3.Deviaton(light2Points,function(d) {
						return +d.reading;
					});
					var stdDevlight2 = stdDevlight2.toFixed(3);
					var stdDevlight3 = d3.Deviaton(light3Points,function(d) {
						return +d.reading;
					});
					var stdDevlight3 = stdDevlight3.toFixed(3);
					var stdDevlight4 = d3.Deviaton(light4Points,function(d) {
						return +d.reading;
					});
					var stdDevlight4 = stdDevlight4.toFixed(3);    */
	//Maxs and Mins
					var maxlight1 = d3.max(light1Points, function(d) {
						return +d.reading;
					});
					var minlight1 = d3.min(light1Points, function(d) {
						return +d.reading;
					});

					var maxlight2 = d3.max(light2Points, function(d) {
						return +d.reading;
					});
					var minlight2 = d3.min(light2Points, function(d) {
						return +d.reading;
					});

					var maxlight3 = d3.max(light3Points, function(d) {
						return +d.reading;
					});
					var minlight3 = d3.min(light3Points, function(d) {
						return +d.reading;
					});

					var maxlight4 = d3.max(light4Points, function(d) {
						return +d.reading;
					});
					var minlight4 = d3.min(light4Points, function(d) {
						return +d.reading;
					});	
	//Most Rlightent Date
					maximumdatelight1 = String(maxdatelight1).substring(0,25);
					maximumdatelight2 = String(maxdatelight2).substring(0,25);
					maximumdatelight3 = String(maxdatelight3).substring(0,25);
					maximumdatelight4 = String(maxdatelight4).substring(0,25);				

//Filter out obvious errors in data reading
	//Filter out by Lower Bounds
					light1Points = light1Points.filter(function(d) {
						return +d.reading >= lightSenseLB;
					});
					light2Points = light2Points.filter(function(d) {
						return +d.reading >= lightSenseLB;
					});
					light3Points = light3Points.filter(function(d) {
						return +d.reading >= lightSenseLB;
					});								
					light4Points = light4Points.filter(function(d) {
						return +d.reading >= lightSenseLB;
					});

	//Filter out by Upper Bounds
					light1Points = light1Points.filter(function(d) {
						return +d.reading <= lightSenseUB;
					});
					light2Points = light2Points.filter(function(d) {
						return +d.reading <= lightSenseUB;
					});
					light3Points = light3Points.filter(function(d) {
						return +d.reading <= lightSenseUB;
					});								
					light4Points = light4Points.filter(function(d) {
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

					var lightTip2 = d3.tip()
						.attr('class', 'd3-tip2')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

					var lightTip3 = d3.tip()
						.attr('class', 'd3-tip3')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

					var lightTip4 = d3.tip()
						.attr('class', 'd3-tip4')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

//Activate Tooltips for light
					lightCanvas.call(lightTip1);
					lightCanvas.call(lightTip2);
					lightCanvas.call(lightTip3);
					lightCanvas.call(lightTip4);

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

//Handle Graphing light2
	//Draw light2 Line
					lightCanvas.append('svg:path')
						.attr('d', lineGen(light2Points))
						.attr("class", "lightline")
						.attr("id", "light2line")
						.attr('stroke', light2Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create light2 plot dots
					light2dots = lightCanvas.selectAll("circle.light2Points")
					   	.data(light2Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "light2points")
					    .style("fill", light2Color)
					    .attr("cx", function(d) {
					   		return (lightxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (lightyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', lightTip2.show)  
					    .on('mouseout', lightTip2.hide);
	   								
//Handle Graphing light3
	//Draw light3 Line
					lightCanvas.append('svg:path')
						.attr('d', lineGen(light3Points))
						.attr("class", "lightline")
						.attr("id", "light3line")
						.attr('stroke', light3Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create light3 plot dots
					light3dots = lightCanvas.selectAll("circle.light3Points")
					   	.data(light3Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "light3points")
					    .style("fill", light3Color)
					    .attr("cx", function(d) {
					   		return (lightxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (lightyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', lightTip3.show)  
					    .on('mouseout', lightTip3.hide);

//Handle Graphing light4
	//Draw light4 Line
					lightCanvas.append('svg:path')
						.attr('d', lineGen(light4Points))
						.attr("class", "lightline")
						.attr("id", "light4line")
						.attr('stroke', light4Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create light4 plot dots
					light4dots = lightCanvas.selectAll("circle.light4Points")
					   	.data(light4Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "light4points")
					    .style("fill", light4Color)
					    .attr("cx", function(d) {
					   		return (lightxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (lightyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', lightTip4.show)  
					    .on('mouseout', lightTip4.hide);

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
					var light2PointsDesc = light2Points.sort(function(a, b){return b.id-a.id});
					var light2DataTableHolder = d3.select("#light2DataTable")
					var light2DataTable = light2DataTableHolder.selectAll(".light2DataPanel")
						.data(light2PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body light2DataPanel")
							.text(function(d) {
								return d3.values(d)
							});
					var light3PointsDesc = light3Points.sort(function(a, b){return b.id-a.id});
					var light3DataTableHolder = d3.select("#light3DataTable")
					var light3DataTable = light3DataTableHolder.selectAll(".light3DataPanel")
						.data(light3PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body light3DataPanel")
							.text(function(d) {
								return d3.values(d)
							});
					var light4PointsDesc = light4Points.sort(function(a, b){return b.id-a.id});
					var light4DataTableHolder = d3.select("#light4DataTable")
					var light4DataTable = light4DataTableHolder.selectAll(".light4DataPanel")
						.data(light4PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body light4DataPanel")
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
	//light2 Statistics
					var light2rlightent = d3.select("#light2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdatelight2);	
					var light2average = d3.select("#light2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meanlight2 + " | Median: " + medianlight2);
			/*		var light2stdDev = d3.select("#light2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevlight2);		*/
					var light2maxmin = d3.select("#light2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxlight2 + " | Min: " + minlight2);
	//light3 Statistics
					var light3rlightent = d3.select("#light3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdatelight3);	
					var light3average = d3.select("#light3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meanlight3 + " | Median: " + medianlight3);
			/*		var light3stdDev = d3.select("#light3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevlight3);		*/
					var light3maxmin = d3.select("#light3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxlight3 + " | Min: " + minlight3);
	//light4 Statistics
					var light4rlightent = d3.select("#light4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdatelight4);	
					var light4average = d3.select("#light4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meanlight4 + " | Median: " + medianlight4);
			/*		var light4stdDev = d3.select("#light4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevlight4);      */
					var light4maxmin = d3.select("#light4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxlight4 + " | Min: " + minlight4);

				})
			})
		})
	}) 
}


