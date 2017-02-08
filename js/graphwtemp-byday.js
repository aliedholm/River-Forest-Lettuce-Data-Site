function drawwtemp(selectionSize, dateChoice) {
//Clear graph from last time
	d3.select("#wtempspace").remove();
	d3.selectAll(".d3-tip1").remove();
	d3.selectAll(".d3-tip2").remove();
	d3.selectAll(".d3-tip3").remove();
	d3.selectAll(".d3-tip4").remove();
	d3.selectAll(".panel-body").remove();

//Start of wtemp Area
	//Get the Data for all wtemp series
	wtemp1graph = d3.json("php/wtemp1.php", function(wtemp1Points){
		wtemp2graph = d3.json("php/wtemp2.php", function(wtemp2Points){
			wtemp3graph = d3.json("php/wtemp3.php", function(wtemp3Points){
				wtemp4graph = d3.json("php/wtemp4.php", function(wtemp4Points){

//Global wtemp Variable Settings
					var availableDates = [];
					var availableDatesFull = [];

					var margin = {top: 10, right: 5, bottom: 30, left: 50};
					//var windowWidth = $(window).width(); //get the width of the screen
					var windowWidth = document.getElementById("wtempArea").getBoundingClientRect();
					var width = windowWidth.width - margin.left - margin.right;
					var height = 470 - margin.top - margin.bottom;

					var graphPadding = 1;

					var circleSize = 3;
					var lineStroke = 2;
					var wtemp1Color = "green";
					var wtemp2Color = "indianred";
					var wtemp3Color = "lightblue";
					var wtemp4Color = "orange";

//Parse the Date/Time into plotable data
	//Parser Function to sort out format from MYSQL
					var timeParser = d3.time.format("%Y-%m-%d %X").parse;

//Create Array Of Available Dates
					wtemp1Points.forEach(function(d){
						if (availableDates.indexOf(timeParser(d.time).toString().substring(0, 15)) == -1) {
							availableDates.push(timeParser(d.time).toString().substring(0, 15));
							availableDatesFull.push(d.time);
						}
					})
					
					d3.selectAll("div.dateButtons").remove();
					for (i = availableDates.length - 1; i >= 0; i--){
						d3.select("#calRow")
							.append("div")
								.attr("class", "col-xs-6 col-sm-6 col-md-4 col-lg-2 dateButtons")
								.append("input")
									.attr("class", "daySelButton btn btn-warning")
									.attr("type", "button")
									.attr("value", availableDates[i])
									.attr("onclick", "drawwtemp(24, '" + availableDatesFull[i] + "')");
					}

					d3.select("#dateDisplay").remove();
					if (dateChoice){
						d3.select("#currentDate")
							.append("div")
								.attr("class", "col-xs-12 dates")
								.attr("id", "dateDisplay")
								.text(timeParser(dateChoice).toString().substring(0, 15));
					}

//Calculate the time ranges of input data
					var selectionTime = -(width/500);
						if (selectionSize > 0) {
							selectionTime = -(selectionSize);
						}
					var maxdatewtemp1 = d3.max(wtemp1Points, function(d) {
						return (timeParser(d.time));
					});
					var mindatewtemp1 = d3.min(wtemp1Points, function(d) {
						return (timeParser(d.time));
					});
					var maxdatewtemp2 = d3.max(wtemp2Points, function(d) {
						return (timeParser(d.time));
					});
					var mindatewtemp2 = d3.min(wtemp2Points, function(d) {
						return (timeParser(d.time));
					});
					var maxdatewtemp3 = d3.max(wtemp3Points, function(d) {
						return (timeParser(d.time));
					});
					var mindatewtemp3 = d3.min(wtemp3Points, function(d) {
						return (timeParser(d.time));
					});
					var maxdatewtemp4 = d3.max(wtemp4Points, function(d) {
						return (timeParser(d.time));
					});
					var mindatewtemp4 = d3.min(wtemp4Points, function(d) {
						return (timeParser(d.time));
					});

					var dateSenseMin = [mindatewtemp1, mindatewtemp2, mindatewtemp3, mindatewtemp4]
					var dateSenseMax = [maxdatewtemp1, maxdatewtemp2, maxdatewtemp3, maxdatewtemp4]

					mindate = d3.min(dateSenseMin);
					maxdate = d3.max(dateSenseMax);

					if (dateChoice){
						maxdate = timeParser(dateChoice);
						maxdate = d3.time.hour.offset(maxdate, 24);
					}

					rollingSelection = d3.time.hour.offset(maxdate, selectionTime)

//filtering out data points outside the current selection time
					wtemp1Points = wtemp1Points.filter(function(d) {
						return timeParser(d.time) > rollingSelection;
					});
					wtemp2Points = wtemp2Points.filter(function(d) {
						return timeParser(d.time) > rollingSelection;
					});
					wtemp3Points = wtemp3Points.filter(function(d) {
						return timeParser(d.time) > rollingSelection;
					});
					wtemp4Points = wtemp4Points.filter(function(d) {
						return timeParser(d.time) > rollingSelection;
					});

//Setting the sensible input of data
					var wtempSenseLBwtemp1 = d3.min(wtemp1Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var wtempSenseUBwtemp1 = d3.max(wtemp1Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var wtempSenseLBwtemp2 = d3.min(wtemp2Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var wtempSenseUBwtemp2 = d3.max(wtemp2Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var wtempSenseLBwtemp3 = d3.min(wtemp3Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var wtempSenseUBwtemp3 = d3.max(wtemp3Points, function(d) {
						return (+d.reading + graphPadding);
					});					

					var wtempSenseLBwtemp4 = d3.min(wtemp4Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var wtempSenseUBwtemp4 = d3.max(wtemp4Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var wtempSenseLBArr = [wtempSenseLBwtemp1, wtempSenseLBwtemp2, wtempSenseLBwtemp3, wtempSenseLBwtemp4]
					var wtempSenseUBArr = [wtempSenseUBwtemp1, wtempSenseUBwtemp2, wtempSenseUBwtemp3, wtempSenseUBwtemp4]

					wtempSenseLB = d3.min(wtempSenseLBArr);
					wtempSenseUB = d3.max(wtempSenseUBArr);

					var xAxisTicks = (width/100);
					var yAxisTicks = 10;

//Calculate the Data Statistics
	//Means
					var meanwtemp1 = d3.mean(wtemp1Points,function(d) {
						return +d.reading;
					});
					var meanwtemp1 = meanwtemp1.toFixed(3);
					var meanwtemp2 = d3.mean(wtemp2Points,function(d) {
						return +d.reading;
					});
					var meanwtemp2 = meanwtemp2.toFixed(3);
					var meanwtemp3 = d3.mean(wtemp3Points,function(d) {
						return +d.reading;
					});
					var meanwtemp3 = meanwtemp3.toFixed(3);
					var meanwtemp4 = d3.mean(wtemp4Points,function(d) {
						return +d.reading;
					});
					var meanwtemp4 = meanwtemp4.toFixed(3);
	//Median	
					var medianwtemp1 = d3.median(wtemp1Points,function(d) {
						return +d.reading;
					});
					var medianwtemp1 = medianwtemp1.toFixed(3);
					var medianwtemp2 = d3.median(wtemp2Points,function(d) {
						return +d.reading;
					});
					var medianwtemp2 = medianwtemp2.toFixed(3);
					var medianwtemp3 = d3.median(wtemp3Points,function(d) {
						return +d.reading;
					});
					var medianwtemp3 = medianwtemp3.toFixed(3);
					var medianwtemp4 = d3.median(wtemp4Points,function(d) {
						return +d.reading;
					});
					var medianwtemp4 = medianwtemp4.toFixed(3);
	//Standard Deviation	
	/*				var stdDevwtemp1 = d3.Deviation(wtemp1Points,function(d) {
						return +d.reading;
					});
					var stdDevwtemp1 = stdDevwtemp1.toFixed(3);
					var stdDevwtemp2 = d3.Deviaton(wtemp2Points,function(d) {
						return +d.reading;
					});
					var stdDevwtemp2 = stdDevwtemp2.toFixed(3);
					var stdDevwtemp3 = d3.Deviaton(wtemp3Points,function(d) {
						return +d.reading;
					});
					var stdDevwtemp3 = stdDevwtemp3.toFixed(3);
					var stdDevwtemp4 = d3.Deviaton(wtemp4Points,function(d) {
						return +d.reading;
					});
					var stdDevwtemp4 = stdDevwtemp4.toFixed(3);    */
	//Maxs and Mins
					var maxwtemp1 = d3.max(wtemp1Points, function(d) {
						return +d.reading;
					});
					var minwtemp1 = d3.min(wtemp1Points, function(d) {
						return +d.reading;
					});

					var maxwtemp2 = d3.max(wtemp2Points, function(d) {
						return +d.reading;
					});
					var minwtemp2 = d3.min(wtemp2Points, function(d) {
						return +d.reading;
					});

					var maxwtemp3 = d3.max(wtemp3Points, function(d) {
						return +d.reading;
					});
					var minwtemp3 = d3.min(wtemp3Points, function(d) {
						return +d.reading;
					});

					var maxwtemp4 = d3.max(wtemp4Points, function(d) {
						return +d.reading;
					});
					var minwtemp4 = d3.min(wtemp4Points, function(d) {
						return +d.reading;
					});	
	//Most Rwtempent Date
					maximumdatewtemp1 = String(maxdatewtemp1).substring(0,25);
					maximumdatewtemp2 = String(maxdatewtemp2).substring(0,25);
					maximumdatewtemp3 = String(maxdatewtemp3).substring(0,25);
					maximumdatewtemp4 = String(maxdatewtemp4).substring(0,25);				

//Filter out obvious errors in data reading
	//Filter out by Lower Bounds
					wtemp1Points = wtemp1Points.filter(function(d) {
						return +d.reading >= wtempSenseLB;
					});
					wtemp2Points = wtemp2Points.filter(function(d) {
						return +d.reading >= wtempSenseLB;
					});
					wtemp3Points = wtemp3Points.filter(function(d) {
						return +d.reading >= wtempSenseLB;
					});								
					wtemp4Points = wtemp4Points.filter(function(d) {
						return +d.reading >= wtempSenseLB;
					});

	//Filter out by Upper Bounds
					wtemp1Points = wtemp1Points.filter(function(d) {
						return +d.reading <= wtempSenseUB;
					});
					wtemp2Points = wtemp2Points.filter(function(d) {
						return +d.reading <= wtempSenseUB;
					});
					wtemp3Points = wtemp3Points.filter(function(d) {
						return +d.reading <= wtempSenseUB;
					});								
					wtemp4Points = wtemp4Points.filter(function(d) {
						return +d.reading <= wtempSenseUB;
					});

//Create Scales for wtemp
					var wtempxScale = d3.time.scale()
						.domain([rollingSelection, maxdate])
						.range([margin.left, (width)]);

					var wtempyScale = d3.scale.linear()
						.domain([wtempSenseLB, wtempSenseUB])
						.range([(height - margin.bottom), margin.top]);

//Design Axis for wtemp
					var wtempxAxis = d3.svg.axis()
						.ticks(xAxisTicks)
						.orient("bottom")
						.scale(wtempxScale);

					var wtempyAxis = d3.svg.axis()
						.ticks(yAxisTicks)
						.orient("left")
						.scale(wtempyScale);

//Create SVG wtemp canvas element
					var wtempCanvas = d3.select("#wtempArea")
						.append("svg")
						.attr("id", "wtempspace")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
						.append("g")
						.attr("transform", "translate(0, 0)");

//Build Tooltips for wtemp
					var wtempTip1 = d3.tip()
						.attr('class', 'd3-tip1')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

					var wtempTip2 = d3.tip()
						.attr('class', 'd3-tip2')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

					var wtempTip3 = d3.tip()
						.attr('class', 'd3-tip3')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

					var wtempTip4 = d3.tip()
						.attr('class', 'd3-tip4')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

//Activate Tooltips for wtemp
					wtempCanvas.call(wtempTip1);
					wtempCanvas.call(wtempTip2);
					wtempCanvas.call(wtempTip3);
					wtempCanvas.call(wtempTip4);

//Line Function
					var lineGen = d3.svg.line()
					    .x(function(d) {
					        return wtempxScale(timeParser(d.time));
					    })
					    .y(function(d) {
					        return wtempyScale(d.reading);
					    });	    

//Handle Graphing wtemp1
	//Draw wtemp1 Line
					wtempCanvas.append('svg:path')
						.attr('d', lineGen(wtemp1Points))
						.attr("class", "wtempline")
						.attr("id", "wtemp1line")
						.attr('stroke', wtemp1Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create wtemp1 plot dots
					wtemp1dots = wtempCanvas.selectAll("circle.wtemp1Points")
					   	.data(wtemp1Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "wtemp1points")
					    .style("fill", wtemp1Color)
					    .attr("cx", function(d) {
					   		return (wtempxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (wtempyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', wtempTip1.show)  
					    .on('mouseout', wtempTip1.hide);

//Handle Graphing wtemp2
	//Draw wtemp2 Line
					wtempCanvas.append('svg:path')
						.attr('d', lineGen(wtemp2Points))
						.attr("class", "wtempline")
						.attr("id", "wtemp2line")
						.attr('stroke', wtemp2Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create wtemp2 plot dots
					wtemp2dots = wtempCanvas.selectAll("circle.wtemp2Points")
					   	.data(wtemp2Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "wtemp2points")
					    .style("fill", wtemp2Color)
					    .attr("cx", function(d) {
					   		return (wtempxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (wtempyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', wtempTip2.show)  
					    .on('mouseout', wtempTip2.hide);
	   								
//Handle Graphing wtemp3
	//Draw wtemp3 Line
					wtempCanvas.append('svg:path')
						.attr('d', lineGen(wtemp3Points))
						.attr("class", "wtempline")
						.attr("id", "wtemp3line")
						.attr('stroke', wtemp3Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create wtemp3 plot dots
					wtemp3dots = wtempCanvas.selectAll("circle.wtemp3Points")
					   	.data(wtemp3Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "wtemp3points")
					    .style("fill", wtemp3Color)
					    .attr("cx", function(d) {
					   		return (wtempxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (wtempyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', wtempTip3.show)  
					    .on('mouseout', wtempTip3.hide);

//Handle Graphing wtemp4
	//Draw wtemp4 Line
					wtempCanvas.append('svg:path')
						.attr('d', lineGen(wtemp4Points))
						.attr("class", "wtempline")
						.attr("id", "wtemp4line")
						.attr('stroke', wtemp4Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create wtemp4 plot dots
					wtemp4dots = wtempCanvas.selectAll("circle.wtemp4Points")
					   	.data(wtemp4Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "wtemp4points")
					    .style("fill", wtemp4Color)
					    .attr("cx", function(d) {
					   		return (wtempxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (wtempyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', wtempTip4.show)  
					    .on('mouseout', wtempTip4.hide);

//Write Out the Data Tables
					var wtemp1PointsDesc = wtemp1Points.sort(function(a, b){return b.id-a.id});
					var wtemp1DataTableHolder = d3.select("#wtemp1DataTable")
					var wtemp1DataTable = wtemp1DataTableHolder.selectAll(".wtemp1DataPanel")
						.data(wtemp1PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body wtemp1DataPanel")
							.text(function(d) {
								return d3.values(d)
							});
					var wtemp2PointsDesc = wtemp2Points.sort(function(a, b){return b.id-a.id});
					var wtemp2DataTableHolder = d3.select("#wtemp2DataTable")
					var wtemp2DataTable = wtemp2DataTableHolder.selectAll(".wtemp2DataPanel")
						.data(wtemp2PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body wtemp2DataPanel")
							.text(function(d) {
								return d3.values(d)
							});
					var wtemp3PointsDesc = wtemp3Points.sort(function(a, b){return b.id-a.id});
					var wtemp3DataTableHolder = d3.select("#wtemp3DataTable")
					var wtemp3DataTable = wtemp3DataTableHolder.selectAll(".wtemp3DataPanel")
						.data(wtemp3PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body wtemp3DataPanel")
							.text(function(d) {
								return d3.values(d)
							});
					var wtemp4PointsDesc = wtemp4Points.sort(function(a, b){return b.id-a.id});
					var wtemp4DataTableHolder = d3.select("#wtemp4DataTable")
					var wtemp4DataTable = wtemp4DataTableHolder.selectAll(".wtemp4DataPanel")
						.data(wtemp4PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body wtemp4DataPanel")
							.text(function(d) {
								return d3.values(d)
							});					

//Draw wtemp axis
					wtempCanvas.append("g")
						.attr("class", "xAxis")
						.attr("transform", "translate(0, " + (height - margin.top) + ")")
						.call(wtempxAxis)
						.append("text")
						.attr("x", (width - margin.left))
						.attr("y", margin.bottom)
						.text("Reading Time: ");

					wtempCanvas.append("g")
						.attr("class", "yAxis")
						.attr("transform", "translate(" + margin.left + ", 0)")
						.call(wtempyAxis)
						.append("text")
						.attr("x", 0)
						.attr("y", margin.top)
						.text("deg C");

//Writing Statistics Data to page
	//wtemp1 Statistics
					var wtemp1rwtempent = d3.select("#wtemp1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdatewtemp1);					
					var wtemp1average = d3.select("#wtemp1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meanwtemp1 + " | Median: " + medianwtemp1);
			/*		var wtemp1stdDev = d3.select("#wtemp1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevwtemp1);		*/
					var wtemp1maxmin = d3.select("#wtemp1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxwtemp1 + " | Min: " + minwtemp1);
	//wtemp2 Statistics
					var wtemp2rwtempent = d3.select("#wtemp2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdatewtemp2);	
					var wtemp2average = d3.select("#wtemp2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meanwtemp2 + " | Median: " + medianwtemp2);
			/*		var wtemp2stdDev = d3.select("#wtemp2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevwtemp2);		*/
					var wtemp2maxmin = d3.select("#wtemp2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxwtemp2 + " | Min: " + minwtemp2);
	//wtemp3 Statistics
					var wtemp3rwtempent = d3.select("#wtemp3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdatewtemp3);	
					var wtemp3average = d3.select("#wtemp3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meanwtemp3 + " | Median: " + medianwtemp3);
			/*		var wtemp3stdDev = d3.select("#wtemp3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevwtemp3);		*/
					var wtemp3maxmin = d3.select("#wtemp3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxwtemp3 + " | Min: " + minwtemp3);
	//wtemp4 Statistics
					var wtemp4rwtempent = d3.select("#wtemp4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdatewtemp4);	
					var wtemp4average = d3.select("#wtemp4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meanwtemp4 + " | Median: " + medianwtemp4);
			/*		var wtemp4stdDev = d3.select("#wtemp4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevwtemp4);      */
					var wtemp4maxmin = d3.select("#wtemp4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxwtemp4 + " | Min: " + minwtemp4);

				})
			})
		})
	}) 
}


