function drawph(selectionSize, dateChoice) {
//Clear graph from last time
	d3.select("#phspace").remove();
	d3.selectAll(".d3-tip1").remove();
	d3.selectAll(".d3-tip2").remove();
	d3.selectAll(".d3-tip3").remove();
	d3.selectAll(".d3-tip4").remove();
	d3.selectAll(".panel-body").remove();

//Start of pH Area
//Get the Data for all pH series
	ph1graph = d3.json("php/ph1.php", function(ph1Points){
		ph2graph = d3.json("php/ph2.php", function(ph2Points){
			ph3graph = d3.json("php/ph3.php", function(ph3Points){
				ph4graph = d3.json("php/ph4.php", function(ph4Points){

//Global pH Variable Settings
					var availableDates = [];
					var availableDatesFull = [];

					var margin = {top: 10, right: 5, bottom: 30, left: 50};
					//var windowWidth = $(window).width(); //get the width of the screen
					var windowWidth = document.getElementById("phArea").getBoundingClientRect();
					var width = windowWidth - margin.left - margin.right;
					var height = 470 - margin.top - margin.bottom;

					var graphPadding = 1;

					var circleSize = 3;
					var lineStroke = 2;
					var ph1Color = "green";
					var ph2Color = "indianred";
					var ph3Color = "lightblue";
					var ph4Color = "orange";

//Parse the Date/Time into plotable data
	//Parser Function to sort out format from MYSQL
					var timeParser = d3.time.format("%Y-%m-%d %X").parse;

//Create Array Of Available Dates
					ph1Points.forEach(function(d){
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
									.attr("onclick", "drawph(24, '" + availableDatesFull[i] + "')");
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

					if (selectionSize) {
						selectionTime = -(selectionSize);
					}
					var maxdateph1 = d3.max(ph1Points, function(d) {
						return (timeParser(d.time));
					});
					var mindateph1 = d3.min(ph1Points, function(d) {
						return (timeParser(d.time));
					});
					var maxdateph2 = d3.max(ph2Points, function(d) {
						return (timeParser(d.time));
					});
					var mindateph2 = d3.min(ph2Points, function(d) {
						return (timeParser(d.time));
					});
					var maxdateph3 = d3.max(ph3Points, function(d) {
						return (timeParser(d.time));
					});
					var mindateph3 = d3.min(ph3Points, function(d) {
						return (timeParser(d.time));
					});
					var maxdateph4 = d3.max(ph4Points, function(d) {
						return (timeParser(d.time));
					});
					var mindateph4 = d3.min(ph4Points, function(d) {
						return (timeParser(d.time));
					});

					var dateSenseMin = [mindateph1, mindateph2, mindateph3, mindateph4]
					var dateSenseMax = [maxdateph1, maxdateph2, maxdateph3, maxdateph4]

					mindate = d3.min(dateSenseMin);
					maxdate = d3.max(dateSenseMax);

					if (dateChoice){
						maxdate = timeParser(dateChoice);
						maxdate = d3.time.hour.offset(maxdate, 24);
					}

					rollingSelection = d3.time.hour.offset(maxdate, selectionTime)

//Setting the sensible input of data
					var phSenseLBph1 = d3.min(ph1Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var phSenseUBph1 = d3.max(ph1Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var phSenseLBph2 = d3.min(ph2Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var phSenseUBph2 = d3.max(ph2Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var phSenseLBph3 = d3.min(ph3Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var phSenseUBph3 = d3.max(ph3Points, function(d) {
						return (+d.reading + graphPadding);
					});					

					var phSenseLBph4 = d3.min(ph4Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var phSenseUBph4 = d3.max(ph4Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var phSenseLBArr = [phSenseLBph1, phSenseLBph2, phSenseLBph3, phSenseLBph4]
					var phSenseUBArr = [phSenseUBph1, phSenseUBph2, phSenseUBph3, phSenseUBph4]

					phSenseLB = d3.min(phSenseLBArr);
					phSenseUB = d3.max(phSenseUBArr);

					var xAxisTicks = (width/100);
					var yAxisTicks = phSenseUB - phSenseLB + 4;

//Calculate the Data Statistics
	//Means
					var meanph1 = d3.mean(ph1Points,function(d) {
						return +d.reading;
					});
					var meanph2 = d3.mean(ph2Points,function(d) {
						return +d.reading;
					});
					var meanph3 = d3.mean(ph3Points,function(d) {
						return +d.reading;
					});
					var meanph4 = d3.mean(ph4Points,function(d) {
						return +d.reading;
					});
	//Maxs and Mins
					var maxph1 = d3.max(ph1Points, function(d) {
						return +d.reading;
					});
					var minph1 = d3.min(ph1Points, function(d) {
						return +d.reading;
					});

					var maxph2 = d3.max(ph2Points, function(d) {
						return +d.reading;
					});
					var minph2 = d3.min(ph2Points, function(d) {
						return +d.reading;
					});

					var maxph3 = d3.max(ph3Points, function(d) {
						return +d.reading;
					});
					var minph3 = d3.min(ph3Points, function(d) {
						return +d.reading;
					});

					var maxph4 = d3.max(ph4Points, function(d) {
						return +d.reading;
					});
					var minph4 = d3.min(ph4Points, function(d) {
						return +d.reading;
					});	
	//Most Recent Reading
					var latestph1 = 				

//Filter out obvious errors in data reading
	//Filter out by Lower Bounds
					ph1Points = ph1Points.filter(function(d) {
						return +d.reading >= phSenseLB;
					});
					ph2Points = ph2Points.filter(function(d) {
						return +d.reading >= phSenseLB;
					});
					ph3Points = ph3Points.filter(function(d) {
						return +d.reading >= phSenseLB;
					});								
					ph4Points = ph4Points.filter(function(d) {
						return +d.reading >= phSenseLB;
					});

	//Filter out by Upper Bounds
					ph1Points = ph1Points.filter(function(d) {
						return +d.reading <= phSenseUB;
					});
					ph2Points = ph2Points.filter(function(d) {
						return +d.reading <= phSenseUB;
					});
					ph3Points = ph3Points.filter(function(d) {
						return +d.reading <= phSenseUB;
					});								
					ph4Points = ph4Points.filter(function(d) {
						return +d.reading <= phSenseUB;
					});

//Create Scales for pH
					var phxScale = d3.time.scale()
						.domain([rollingSelection, maxdate])
						.range([margin.left, (width)]);

					var phyScale = d3.scale.linear()
						.domain([phSenseLB, phSenseUB])
						.range([(height - margin.bottom), margin.top]);

//Design Axis for pH
					var phxAxis = d3.svg.axis()
						.ticks(xAxisTicks)
						.orient("bottom")
						.scale(phxScale);

					var phyAxis = d3.svg.axis()
						.ticks(yAxisTicks)
						.orient("left")
						.scale(phyScale);

//Create SVG pH canvas element
					var phCanvas = d3.select("#phArea")
						.append("svg")
						.attr("id", "phspace")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
						.append("g")
						.attr("transform", "translate(0, 0)");

//Build Tooltips for pH
					var phTip1 = d3.tip()
						.attr('class', 'd3-tip1')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

					var phTip2 = d3.tip()
						.attr('class', 'd3-tip2')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

					var phTip3 = d3.tip()
						.attr('class', 'd3-tip3')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

					var phTip4 = d3.tip()
						.attr('class', 'd3-tip4')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

//Activate Tooltips for pH
					phCanvas.call(phTip1);
					phCanvas.call(phTip2);
					phCanvas.call(phTip3);
					phCanvas.call(phTip4);

//Line Function
					var lineGen = d3.svg.line()
					    .x(function(d) {
					        return phxScale(timeParser(d.time));
					    })
					    .y(function(d) {
					        return phyScale(d.reading);
					    });	    

//Handle Graphing pH1
	//Draw pH1 Line
					phCanvas.append('svg:path')
						.attr('d', lineGen(ph1Points))
						.attr("class", "phline")
						.attr("id", "ph1line")
						.attr('stroke', ph1Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create pH1 plot dots
					ph1dots = phCanvas.selectAll("circle.ph1Points")
					   	.data(ph1Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "ph1points")
					    .style("fill", ph1Color)
					    .attr("cx", function(d) {
					   		return (phxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (phyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', phTip1.show)  
					    .on('mouseout', phTip1.hide);

//Handle Graphing pH2
	//Draw pH2 Line
					phCanvas.append('svg:path')
						.attr('d', lineGen(ph2Points))
						.attr("class", "phline")
						.attr("id", "ph2line")
						.attr('stroke', ph2Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create pH2 plot dots
					ph2dots = phCanvas.selectAll("circle.ph2Points")
					   	.data(ph2Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "ph2points")
					    .style("fill", ph2Color)
					    .attr("cx", function(d) {
					   		return (phxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (phyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', phTip2.show)  
					    .on('mouseout', phTip2.hide);
	   								
//Handle Graphing pH3
	//Draw pH3 Line
					phCanvas.append('svg:path')
						.attr('d', lineGen(ph3Points))
						.attr("class", "phline")
						.attr("id", "ph3line")
						.attr('stroke', ph3Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create pH3 plot dots
					ph3dots = phCanvas.selectAll("circle.ph3Points")
					   	.data(ph3Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "ph3points")
					    .style("fill", ph3Color)
					    .attr("cx", function(d) {
					   		return (phxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (phyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', phTip3.show)  
					    .on('mouseout', phTip3.hide);

//Handle Graphing pH4
	//Draw pH4 Line
					phCanvas.append('svg:path')
						.attr('d', lineGen(ph4Points))
						.attr("class", "phline")
						.attr("id", "ph4line")
						.attr('stroke', ph4Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create pH4 plot dots
					ph4dots = phCanvas.selectAll("circle.ph4Points")
					   	.data(ph4Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "ph4points")
					    .style("fill", ph4Color)
					    .attr("cx", function(d) {
					   		return (phxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (phyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', phTip4.show)  
					    .on('mouseout', phTip4.hide);

//Draw pH axis
					phCanvas.append("g")
						.attr("class", "xAxis")
						.attr("transform", "translate(0, " + (height - margin.bottom) + ")")
						.call(phxAxis)
						.append("text")
						.attr("x", (width - margin.left))
						.attr("y", margin.bottom)
						.text("Reading Time: ");

					phCanvas.append("g")
						.attr("class", "yAxis")
						.attr("transform", "translate(" + margin.left + ", 0)")
						.call(phyAxis)
						.append("text")
						.attr("x", 0)
						.attr("y", margin.top)
						.text("pH");

//Write Out the Data Tables
					var ph1PointsDesc = ph1Points.sort(function(a, b){return b.id-a.id});
					var ph1DataTableHolder = d3.select("#ph1DataTable")
					var ph1DataTable = ph1DataTableHolder.selectAll(".ph1DataPanel")
						.data(ph1PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body ph1DataPanel")
							.text(function(d) {
								return d3.values(d)
							});
					var ph2PointsDesc = ph2Points.sort(function(a, b){return b.id-a.id});
					var ph2DataTableHolder = d3.select("#ph2DataTable")
					var ph2DataTable = ph2DataTableHolder.selectAll(".ph2DataPanel")
						.data(ph2PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body ph2DataPanel")
							.text(function(d) {
								return d3.values(d)
							});
					var ph3PointsDesc = ph3Points.sort(function(a, b){return b.id-a.id});
					var ph3DataTableHolder = d3.select("#ph3DataTable")
					var ph3DataTable = ph3DataTableHolder.selectAll(".ph3DataPanel")
						.data(ph3PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body ph3DataPanel")
							.text(function(d) {
								return d3.values(d)
							});
					var ph4PointsDesc = ph4Points.sort(function(a, b){return b.id-a.id});
					var ph4DataTableHolder = d3.select("#ph4DataTable")
					var ph4DataTable = ph4DataTableHolder.selectAll(".ph4DataPanel")
						.data(ph4PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body ph4DataPanel")
							.text(function(d) {
								return d3.values(d)
							});					

//Writing Statistics Data to page
					var ph1recent = d3.select("#ph1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maxdateph1);					
					var ph1average = d3.select("#ph1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Average: " + meanph1);
					var ph1maxmin = d3.select("#ph1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxph1 + " | Min: " + minph1);
					var ph2recent = d3.select("#ph2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maxdateph2);	
					var ph2average = d3.select("#ph2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Average: " + meanph2);
					var ph2maxmin = d3.select("#ph2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxph2 + " | Min: " + minph2);
					var ph3recent = d3.select("#ph3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maxdateph3);	
					var ph3average = d3.select("#ph3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Average: " + meanph3);
					var ph3maxmin = d3.select("#ph3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxph3 + " | Min: " + minph3);
					var ph4recent = d3.select("#ph4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maxdateph4);	
					var ph4average = d3.select("#ph4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Average: " + meanph4);
					var ph4maxmin = d3.select("#ph4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxph4 + " | Min: " + minph4);

				})
			})
		})
	}) 
}


