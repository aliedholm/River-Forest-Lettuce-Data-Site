function drawec(selectionSize) {
//Clear graph from last time
	d3.select("#ecspace").remove();
	d3.selectAll(".d3-tip1").remove();
	d3.selectAll(".d3-tip2").remove();
	d3.selectAll(".d3-tip3").remove();
	d3.selectAll(".d3-tip4").remove();
	d3.selectAll(".panel-body").remove();

//Start of EC Area
	//Get the Data for all EC series
	ec1graph = d3.json("php/ec1.php", function(ec1Points){
		ec2graph = d3.json("php/ec2.php", function(ec2Points){
			ec3graph = d3.json("php/ec3.php", function(ec3Points){
				ec4graph = d3.json("php/ec4.php", function(ec4Points){

//Global EC Variable Settings
					var margin = {top: 10, right: 5, bottom: 30, left: 50};
					//var windowWidth = $(window).width(); //get the width of the screen
					var windowWidth = document.getElementById("ecArea").getBoundingClientRect();
					var width = windowWidth.width - margin.left - margin.right;
					var height = 470 - margin.top - margin.bottom;

					var graphPadding = 1;

					var circleSize = 3;
					var lineStroke = 2;
					var ec1Color = "green";
					var ec2Color = "indianred";
					var ec3Color = "lightblue";
					var ec4Color = "orange";

//Parse the Date/Time into plotable data
	//Parser Function to sort out format from MYSQL
					var timeParser = d3.time.format("%Y-%m-%d %X").parse;

//Calculate the time ranges of input data
					var selectionTime = -(width/500);
						if (selectionSize > 0) {
							selectionTime = -(selectionSize);
						}
					var maxdateec1 = d3.max(ec1Points, function(d) {
						return (timeParser(d.time));
					});
					var mindateec1 = d3.min(ec1Points, function(d) {
						return (timeParser(d.time));
					});
					var maxdateec2 = d3.max(ec2Points, function(d) {
						return (timeParser(d.time));
					});
					var mindateec2 = d3.min(ec2Points, function(d) {
						return (timeParser(d.time));
					});
					var maxdateec3 = d3.max(ec3Points, function(d) {
						return (timeParser(d.time));
					});
					var mindateec3 = d3.min(ec3Points, function(d) {
						return (timeParser(d.time));
					});
					var maxdateec4 = d3.max(ec4Points, function(d) {
						return (timeParser(d.time));
					});
					var mindateec4 = d3.min(ec4Points, function(d) {
						return (timeParser(d.time));
					});

					var dateSenseMin = [mindateec1, mindateec2, mindateec3, mindateec4]
					var dateSenseMax = [maxdateec1, maxdateec2, maxdateec3, maxdateec4]

					mindate = d3.min(dateSenseMin);
					maxdate = d3.max(dateSenseMax);

					rollingSelection = d3.time.hour.offset(maxdate, selectionTime)

//decrease 10x multiply sensor error readings
/*)					ec1Points = ec1Points.filter(function(d) {
						if (d.reading > 1000) {
							d.reading = d.reading / 10;
							return (d.reading);
						}
						else {
							return d.reading;
						}
					});
					ec2Points = ec2Points.filter(function(d) {
						if (d.reading > 1000) {
							d.reading = d.reading / 10;
							return (d.reading);
						}
						else {
							return d.reading;
						}
					});
					ec3Points = ec3Points.filter(function(d) {
						if (d.reading > 1000) {
							d.reading = d.reading / 10;
							return (d.reading);
						}
						else {
							return d.reading;
						}
					});							
					ec4Points = ec4Points.filter(function(d) {
						if (d.reading > 1000) {
							d.reading = d.reading / 10;
							return (d.reading);
						}
						else {
							return d.reading;
						}
					});
*/
//increase 10x multiply sensor error readings
/*					ec1Points = ec1Points.filter(function(d) {
						if (+d.reading < 40) {
							return;
						}
						else {
							return +d.reading;
						}
					});
					ec2Points = ec2Points.filter(function(d) {
						if (+d.reading < 40) {
						return;
						}
						else {
							return +d.reading;
						}
					});
					ec3Points = ec3Points.filter(function(d) {
						if (+d.reading < 40) {
						return;
						}
						else {
							return +d.reading;
						}
					});							
					ec4Points = ec4Points.filter(function(d) {
						if (+d.reading < 40) {
						return;
						}
						else {
							return +d.reading;
						}
					});
*/
//filtering out data points outside the current selection time
					ec1Points = ec1Points.filter(function(d) {
						return timeParser(d.time) > rollingSelection;
					});
					ec2Points = ec2Points.filter(function(d) {
						return timeParser(d.time) > rollingSelection;
					});
					ec3Points = ec3Points.filter(function(d) {
						return timeParser(d.time) > rollingSelection;
					});
					ec4Points = ec4Points.filter(function(d) {
						return timeParser(d.time) > rollingSelection;
					});

//Setting the sensible input of data
					var ecSenseLBec1 = d3.min(ec1Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var ecSenseUBec1 = d3.max(ec1Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var ecSenseLBec2 = d3.min(ec2Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var ecSenseUBec2 = d3.max(ec2Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var ecSenseLBec3 = d3.min(ec3Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var ecSenseUBec3 = d3.max(ec3Points, function(d) {
						return (+d.reading + graphPadding);
					});					

					var ecSenseLBec4 = d3.min(ec4Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var ecSenseUBec4 = d3.max(ec4Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var ecSenseLBArr = [ecSenseLBec1, ecSenseLBec2, ecSenseLBec3, ecSenseLBec4]
					var ecSenseUBArr = [ecSenseUBec1, ecSenseUBec2, ecSenseUBec3, ecSenseUBec4]

					ecSenseLB = 40//d3.min(ecSenseLBArr);
					ecSenseUB = d3.max(ecSenseUBArr);

					var xAxisTicks = (width/100);
					var yAxisTicks = 10;

//Calculate the Data Statistics
	//Means
					var meanec1 = d3.mean(ec1Points,function(d) {
						return +d.reading;
					});
					var meanec1 = meanec1.toFixed(3);
					var meanec2 = d3.mean(ec2Points,function(d) {
						return +d.reading;
					});
					var meanec2 = meanec2.toFixed(3);
					var meanec3 = d3.mean(ec3Points,function(d) {
						return +d.reading;
					});
					var meanec3 = meanec3.toFixed(3);
					var meanec4 = d3.mean(ec4Points,function(d) {
						return +d.reading;
					});
					var meanec4 = meanec4.toFixed(3);
	//Median	
					var medianec1 = d3.median(ec1Points,function(d) {
						return +d.reading;
					});
					var medianec1 = medianec1.toFixed(3);
					var medianec2 = d3.median(ec2Points,function(d) {
						return +d.reading;
					});
					var medianec2 = medianec2.toFixed(3);
					var medianec3 = d3.median(ec3Points,function(d) {
						return +d.reading;
					});
					var medianec3 = medianec3.toFixed(3);
					var medianec4 = d3.median(ec4Points,function(d) {
						return +d.reading;
					});
					var medianec4 = medianec4.toFixed(3);
	//Standard Deviation	
	/*				var stdDevec1 = d3.Deviation(ec1Points,function(d) {
						return +d.reading;
					});
					var stdDevec1 = stdDevec1.toFixed(3);
					var stdDevec2 = d3.Deviaton(ec2Points,function(d) {
						return +d.reading;
					});
					var stdDevec2 = stdDevec2.toFixed(3);
					var stdDevec3 = d3.Deviaton(ec3Points,function(d) {
						return +d.reading;
					});
					var stdDevec3 = stdDevec3.toFixed(3);
					var stdDevec4 = d3.Deviaton(ec4Points,function(d) {
						return +d.reading;
					});
					var stdDevec4 = stdDevec4.toFixed(3);    */
	//Maxs and Mins
					var maxec1 = d3.max(ec1Points, function(d) {
						return +d.reading;
					});
					var minec1 = d3.min(ec1Points, function(d) {
						return +d.reading;
					});

					var maxec2 = d3.max(ec2Points, function(d) {
						return +d.reading;
					});
					var minec2 = d3.min(ec2Points, function(d) {
						return +d.reading;
					});

					var maxec3 = d3.max(ec3Points, function(d) {
						return +d.reading;
					});
					var minec3 = d3.min(ec3Points, function(d) {
						return +d.reading;
					});

					var maxec4 = d3.max(ec4Points, function(d) {
						return +d.reading;
					});
					var minec4 = d3.min(ec4Points, function(d) {
						return +d.reading;
					});	
	//Most Recent Date
					maximumdateec1 = String(maxdateec1).substring(0,25);
					maximumdateec2 = String(maxdateec2).substring(0,25);
					maximumdateec3 = String(maxdateec3).substring(0,25);
					maximumdateec4 = String(maxdateec4).substring(0,25);				

//Filter out obvious errors in data reading
	//Filter out by Lower Bounds
/*					ec1Points = ec1Points.filter(function(d) {
						return +d.reading >= ecSenseLB;
					});
					ec2Points = ec2Points.filter(function(d) {
						return +d.reading >= ecSenseLB;
					});
					ec3Points = ec3Points.filter(function(d) {
						return +d.reading >= ecSenseLB;
					});								
					ec4Points = ec4Points.filter(function(d) {
						return +d.reading >= ecSenseLB;
					});

	//Filter out by Upper Bounds
					ec1Points = ec1Points.filter(function(d) {
						return +d.reading <= ecSenseUB;
					});
					ec2Points = ec2Points.filter(function(d) {
						return +d.reading <= ecSenseUB;
					});
					ec3Points = ec3Points.filter(function(d) {
						return +d.reading <= ecSenseUB;
					});								
					ec4Points = ec4Points.filter(function(d) {
						return +d.reading <= ecSenseUB;
					});
*/
//Create Scales for EC
					var ecxScale = d3.time.scale()
						.domain([rollingSelection, maxdate])
						.range([margin.left, (width)]);

					var ecyScale = d3.scale.linear()
						.domain([ecSenseLB, ecSenseUB])
						.range([(height - margin.bottom), margin.top]);

//Design Axis for EC
					var ecxAxis = d3.svg.axis()
						.ticks(xAxisTicks)
						.orient("bottom")
						.scale(ecxScale);

					var ecyAxis = d3.svg.axis()
						.ticks(yAxisTicks)
						.orient("left")
						.scale(ecyScale);

//Create SVG EC canvas element
					var ecCanvas = d3.select("#ecArea")
						.append("svg")
						.attr("id", "ecspace")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
						.append("g")
						.attr("transform", "translate(0, 0)");

//Build Tooltips for EC
					var ecTip1 = d3.tip()
						.attr('class', 'd3-tip1')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

					var ecTip2 = d3.tip()
						.attr('class', 'd3-tip2')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

					var ecTip3 = d3.tip()
						.attr('class', 'd3-tip3')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

					var ecTip4 = d3.tip()
						.attr('class', 'd3-tip4')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

//Activate Tooltips for EC
					ecCanvas.call(ecTip1);
					ecCanvas.call(ecTip2);
					ecCanvas.call(ecTip3);
					ecCanvas.call(ecTip4);

//Line Function
					var lineGen = d3.svg.line()
					    .x(function(d) {
					        return ecxScale(timeParser(d.time));
					    })
					    .y(function(d) {
					        return ecyScale(d.reading);
					    });	    

//Handle Graphing ec1
	//Draw ec1 Line
					ecCanvas.append('svg:path')
						.attr('d', lineGen(ec1Points))
						.attr("class", "ecline")
						.attr("id", "ec1line")
						.attr('stroke', ec1Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create ec1 plot dots
					ec1dots = ecCanvas.selectAll("circle.ec1Points")
					   	.data(ec1Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "ec1points")
					    .style("fill", ec1Color)
					    .attr("cx", function(d) {
					   		return (ecxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (ecyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', ecTip1.show)  
					    .on('mouseout', ecTip1.hide);

//Handle Graphing ec2
	//Draw ec2 Line
					ecCanvas.append('svg:path')
						.attr('d', lineGen(ec2Points))
						.attr("class", "ecline")
						.attr("id", "ec2line")
						.attr('stroke', ec2Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create ec2 plot dots
					ec2dots = ecCanvas.selectAll("circle.ec2Points")
					   	.data(ec2Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "ec2points")
					    .style("fill", ec2Color)
					    .attr("cx", function(d) {
					   		return (ecxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (ecyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', ecTip2.show)  
					    .on('mouseout', ecTip2.hide);
	   								
//Handle Graphing ec3
	//Draw ec3 Line
					ecCanvas.append('svg:path')
						.attr('d', lineGen(ec3Points))
						.attr("class", "ecline")
						.attr("id", "ec3line")
						.attr('stroke', ec3Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create ec3 plot dots
					ec3dots = ecCanvas.selectAll("circle.ec3Points")
					   	.data(ec3Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "ec3points")
					    .style("fill", ec3Color)
					    .attr("cx", function(d) {
					   		return (ecxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (ecyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', ecTip3.show)  
					    .on('mouseout', ecTip3.hide);

//Handle Graphing ec4
	//Draw ec4 Line
					ecCanvas.append('svg:path')
						.attr('d', lineGen(ec4Points))
						.attr("class", "ecline")
						.attr("id", "ec4line")
						.attr('stroke', ec4Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create ec4 plot dots
					ec4dots = ecCanvas.selectAll("circle.ec4Points")
					   	.data(ec4Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "ec4points")
					    .style("fill", ec4Color)
					    .attr("cx", function(d) {
					   		return (ecxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (ecyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', ecTip4.show)  
					    .on('mouseout', ecTip4.hide);

//Write Out the Data Tables
					var ec1PointsDesc = ec1Points.sort(function(a, b){return b.id-a.id});
					var ec1DataTableHolder = d3.select("#ec1DataTable")
					var ec1DataTable = ec1DataTableHolder.selectAll(".ec1DataPanel")
						.data(ec1PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body ec1DataPanel")
							.text(function(d) {
								return d3.values(d)
							});
					var ec2PointsDesc = ec2Points.sort(function(a, b){return b.id-a.id});
					var ec2DataTableHolder = d3.select("#ec2DataTable")
					var ec2DataTable = ec2DataTableHolder.selectAll(".ec2DataPanel")
						.data(ec2PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body ec2DataPanel")
							.text(function(d) {
								return d3.values(d)
							});
					var ec3PointsDesc = ec3Points.sort(function(a, b){return b.id-a.id});
					var ec3DataTableHolder = d3.select("#ec3DataTable")
					var ec3DataTable = ec3DataTableHolder.selectAll(".ec3DataPanel")
						.data(ec3PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body ec3DataPanel")
							.text(function(d) {
								return d3.values(d)
							});
					var ec4PointsDesc = ec4Points.sort(function(a, b){return b.id-a.id});
					var ec4DataTableHolder = d3.select("#ec4DataTable")
					var ec4DataTable = ec4DataTableHolder.selectAll(".ec4DataPanel")
						.data(ec4PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body ec4DataPanel")
							.text(function(d) {
								return d3.values(d)
							});					

//Draw EC axis
					ecCanvas.append("g")
						.attr("class", "xAxis")
						.attr("transform", "translate(0, " + (height - margin.bottom) + ")")
						.call(ecxAxis)
						.append("text")
						.attr("x", (width - margin.left))
						.attr("y", margin.bottom)
						.text("Reading Time: ");

					ecCanvas.append("g")
						.attr("class", "yAxis")
						.attr("transform", "translate(" + margin.left + ", 0)")
						.call(ecyAxis)
						.append("text")
						.attr("x", 0)
						.attr("y", margin.top)
						.text("Micro s/cm");

//Writing Statistics Data to page
	//ec1 Statistics
					var ec1recent = d3.select("#ec1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdateec1);					
					var ec1average = d3.select("#ec1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meanec1 + " | Median: " + medianec1);
			/*		var ec1stdDev = d3.select("#ec1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevec1);		*/
					var ec1maxmin = d3.select("#ec1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxec1 + " | Min: " + minec1);
	//ec2 Statistics
					var ec2recent = d3.select("#ec2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdateec2);	
					var ec2average = d3.select("#ec2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meanec2 + " | Median: " + medianec2);
			/*		var ec2stdDev = d3.select("#ec2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevec2);		*/
					var ec2maxmin = d3.select("#ec2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxec2 + " | Min: " + minec2);
	//ec3 Statistics
					var ec3recent = d3.select("#ec3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdateec3);	
					var ec3average = d3.select("#ec3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meanec3 + " | Median: " + medianec3);
			/*		var ec3stdDev = d3.select("#ec3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevec3);		*/
					var ec3maxmin = d3.select("#ec3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxec3 + " | Min: " + minec3);
	//ec4 Statistics
					var ec4recent = d3.select("#ec4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdateec4);	
					var ec4average = d3.select("#ec4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meanec4 + " | Median: " + medianec4);
			/*		var ec4stdDev = d3.select("#ec4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevec4);      */
					var ec4maxmin = d3.select("#ec4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxec4 + " | Min: " + minec4);

				})
			})
		})
	}) 
}


