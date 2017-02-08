function drawdo(selectionSize) {
//Clear graph from last time
	d3.select("#dospace").remove();
	d3.selectAll(".d3-tip1").remove();
	d3.selectAll(".d3-tip2").remove();
	d3.selectAll(".d3-tip3").remove();
	d3.selectAll(".d3-tip4").remove();
	d3.selectAll(".panel-body").remove();

//Start of do Area
	//Get the Data for all do series
	do1graph = d3.json("php/do1.php", function(do1Points){
		do2graph = d3.json("php/do2.php", function(do2Points){
			do3graph = d3.json("php/do3.php", function(do3Points){
				do4graph = d3.json("php/do4.php", function(do4Points){

//Global do Variable Settings
					var margin = {top: 10, right: 5, bottom: 30, left: 50};
					//var windowWidth = $(window).width(); //get the width of the screen
					var windowWidth = document.getElementById("doArea").getBoundingClientRect();
					var width = windowWidth.width - margin.left - margin.right;
					var height = 470 - margin.top - margin.bottom;

					var graphPadding = 1;

					var circleSize = 3;
					var lineStroke = 2;
					var do1Color = "green";
					var do2Color = "indianred";
					var do3Color = "lightblue";
					var do4Color = "orange";

//Parse the Date/Time into plotable data
	//Parser Function to sort out format from MYSQL
					var timeParser = d3.time.format("%Y-%m-%d %X").parse;

//Calculate the time ranges of input data
					var selectionTime = -(width/500);
						if (selectionSize > 0) {
							selectionTime = -(selectionSize);
						}
					var maxdatedo1 = d3.max(do1Points, function(d) {
						return (timeParser(d.time));
					});
					var mindatedo1 = d3.min(do1Points, function(d) {
						return (timeParser(d.time));
					});
					var maxdatedo2 = d3.max(do2Points, function(d) {
						return (timeParser(d.time));
					});
					var mindatedo2 = d3.min(do2Points, function(d) {
						return (timeParser(d.time));
					});
					var maxdatedo3 = d3.max(do3Points, function(d) {
						return (timeParser(d.time));
					});
					var mindatedo3 = d3.min(do3Points, function(d) {
						return (timeParser(d.time));
					});
					var maxdatedo4 = d3.max(do4Points, function(d) {
						return (timeParser(d.time));
					});
					var mindatedo4 = d3.min(do4Points, function(d) {
						return (timeParser(d.time));
					});

					var dateSenseMin = [mindatedo1, mindatedo2, mindatedo3, mindatedo4]
					var dateSenseMax = [maxdatedo1, maxdatedo2, maxdatedo3, maxdatedo4]

					mindate = d3.min(dateSenseMin);
					maxdate = d3.max(dateSenseMax);

					rollingSelection = d3.time.hour.offset(maxdate, selectionTime)

//filtering out data points outside the current selection time
					do1Points = do1Points.filter(function(d) {
						return timeParser(d.time) > rollingSelection;
					});
					do2Points = do2Points.filter(function(d) {
						return timeParser(d.time) > rollingSelection;
					});
					do3Points = do3Points.filter(function(d) {
						return timeParser(d.time) > rollingSelection;
					});
					do4Points = do4Points.filter(function(d) {
						return timeParser(d.time) > rollingSelection;
					});

//Setting the sensible input of data
					var doSenseLBdo1 = d3.min(do1Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var doSenseUBdo1 = d3.max(do1Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var doSenseLBdo2 = d3.min(do2Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var doSenseUBdo2 = d3.max(do2Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var doSenseLBdo3 = d3.min(do3Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var doSenseUBdo3 = d3.max(do3Points, function(d) {
						return (+d.reading + graphPadding);
					});					

					var doSenseLBdo4 = d3.min(do4Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var doSenseUBdo4 = d3.max(do4Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var doSenseLBArr = [doSenseLBdo1, doSenseLBdo2, doSenseLBdo3, doSenseLBdo4]
					var doSenseUBArr = [doSenseUBdo1, doSenseUBdo2, doSenseUBdo3, doSenseUBdo4]

					doSenseLB = d3.min(doSenseLBArr);
					doSenseUB = d3.max(doSenseUBArr);

					var xAxisTicks = (width/100);
					var yAxisTicks = doSenseUB - doSenseLB + 4;

//Calculate the Data Statistics
	//Means
					var meando1 = d3.mean(do1Points,function(d) {
						return +d.reading;
					});
					var meando1 = meando1.toFixed(3);
					var meando2 = d3.mean(do2Points,function(d) {
						return +d.reading;
					});
					var meando2 = meando2.toFixed(3);
					var meando3 = d3.mean(do3Points,function(d) {
						return +d.reading;
					});
					var meando3 = meando3.toFixed(3);
					var meando4 = d3.mean(do4Points,function(d) {
						return +d.reading;
					});
					var meando4 = meando4.toFixed(3);
	//Median	
					var mediando1 = d3.median(do1Points,function(d) {
						return +d.reading;
					});
					var mediando1 = mediando1.toFixed(3);
					var mediando2 = d3.median(do2Points,function(d) {
						return +d.reading;
					});
					var mediando2 = mediando2.toFixed(3);
					var mediando3 = d3.median(do3Points,function(d) {
						return +d.reading;
					});
					var mediando3 = mediando3.toFixed(3);
					var mediando4 = d3.median(do4Points,function(d) {
						return +d.reading;
					});
					var mediando4 = mediando4.toFixed(3);
	//Standard Deviation	
	/*				var stdDevdo1 = d3.Deviation(do1Points,function(d) {
						return +d.reading;
					});
					var stdDevdo1 = stdDevdo1.toFixed(3);
					var stdDevdo2 = d3.Deviaton(do2Points,function(d) {
						return +d.reading;
					});
					var stdDevdo2 = stdDevdo2.toFixed(3);
					var stdDevdo3 = d3.Deviaton(do3Points,function(d) {
						return +d.reading;
					});
					var stdDevdo3 = stdDevdo3.toFixed(3);
					var stdDevdo4 = d3.Deviaton(do4Points,function(d) {
						return +d.reading;
					});
					var stdDevdo4 = stdDevdo4.toFixed(3);    */
	//Maxs and Mins
					var maxdo1 = d3.max(do1Points, function(d) {
						return +d.reading;
					});
					var mindo1 = d3.min(do1Points, function(d) {
						return +d.reading;
					});

					var maxdo2 = d3.max(do2Points, function(d) {
						return +d.reading;
					});
					var mindo2 = d3.min(do2Points, function(d) {
						return +d.reading;
					});

					var maxdo3 = d3.max(do3Points, function(d) {
						return +d.reading;
					});
					var mindo3 = d3.min(do3Points, function(d) {
						return +d.reading;
					});

					var maxdo4 = d3.max(do4Points, function(d) {
						return +d.reading;
					});
					var mindo4 = d3.min(do4Points, function(d) {
						return +d.reading;
					});	
	//Most Rdoent Date
					maximumdatedo1 = String(maxdatedo1).substring(0,25);
					maximumdatedo2 = String(maxdatedo2).substring(0,25);
					maximumdatedo3 = String(maxdatedo3).substring(0,25);
					maximumdatedo4 = String(maxdatedo4).substring(0,25);				

//Filter out obvious errors in data reading
	//Filter out by Lower Bounds
					do1Points = do1Points.filter(function(d) {
						return +d.reading >= doSenseLB;
					});
					do2Points = do2Points.filter(function(d) {
						return +d.reading >= doSenseLB;
					});
					do3Points = do3Points.filter(function(d) {
						return +d.reading >= doSenseLB;
					});								
					do4Points = do4Points.filter(function(d) {
						return +d.reading >= doSenseLB;
					});

	//Filter out by Upper Bounds
					do1Points = do1Points.filter(function(d) {
						return +d.reading <= doSenseUB;
					});
					do2Points = do2Points.filter(function(d) {
						return +d.reading <= doSenseUB;
					});
					do3Points = do3Points.filter(function(d) {
						return +d.reading <= doSenseUB;
					});								
					do4Points = do4Points.filter(function(d) {
						return +d.reading <= doSenseUB;
					});

//Create Scales for do
					var doxScale = d3.time.scale()
						.domain([rollingSelection, maxdate])
						.range([margin.left, (width)]);

					var doyScale = d3.scale.linear()
						.domain([doSenseLB, doSenseUB])
						.range([(height - margin.bottom), margin.top]);

//Design Axis for do
					var doxAxis = d3.svg.axis()
						.ticks(xAxisTicks)
						.orient("bottom")
						.scale(doxScale);

					var doyAxis = d3.svg.axis()
						.ticks(yAxisTicks)
						.orient("left")
						.scale(doyScale);

//Create SVG do canvas element
					var doCanvas = d3.select("#doArea")
						.append("svg")
						.attr("id", "dospace")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
						.append("g")
						.attr("transform", "translate(0, 0)");

//Build Tooltips for do
					var doTip1 = d3.tip()
						.attr('class', 'd3-tip1')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

					var doTip2 = d3.tip()
						.attr('class', 'd3-tip2')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

					var doTip3 = d3.tip()
						.attr('class', 'd3-tip3')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

					var doTip4 = d3.tip()
						.attr('class', 'd3-tip4')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

//Activate Tooltips for do
					doCanvas.call(doTip1);
					doCanvas.call(doTip2);
					doCanvas.call(doTip3);
					doCanvas.call(doTip4);

//Line Function
					var lineGen = d3.svg.line()
					    .x(function(d) {
					        return doxScale(timeParser(d.time));
					    })
					    .y(function(d) {
					        return doyScale(d.reading);
					    });	    

//Handle Graphing do1
	//Draw do1 Line
					doCanvas.append('svg:path')
						.attr('d', lineGen(do1Points))
						.attr("class", "doline")
						.attr("id", "do1line")
						.attr('stroke', do1Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create do1 plot dots
					do1dots = doCanvas.selectAll("circle.do1Points")
					   	.data(do1Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "do1points")
					    .style("fill", do1Color)
					    .attr("cx", function(d) {
					   		return (doxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (doyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', doTip1.show)  
					    .on('mouseout', doTip1.hide);

//Handle Graphing do2
	//Draw do2 Line
					doCanvas.append('svg:path')
						.attr('d', lineGen(do2Points))
						.attr("class", "doline")
						.attr("id", "do2line")
						.attr('stroke', do2Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create do2 plot dots
					do2dots = doCanvas.selectAll("circle.do2Points")
					   	.data(do2Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "do2points")
					    .style("fill", do2Color)
					    .attr("cx", function(d) {
					   		return (doxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (doyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', doTip2.show)  
					    .on('mouseout', doTip2.hide);
	   								
//Handle Graphing do3
	//Draw do3 Line
					doCanvas.append('svg:path')
						.attr('d', lineGen(do3Points))
						.attr("class", "doline")
						.attr("id", "do3line")
						.attr('stroke', do3Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create do3 plot dots
					do3dots = doCanvas.selectAll("circle.do3Points")
					   	.data(do3Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "do3points")
					    .style("fill", do3Color)
					    .attr("cx", function(d) {
					   		return (doxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (doyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', doTip3.show)  
					    .on('mouseout', doTip3.hide);

//Handle Graphing do4
	//Draw do4 Line
					doCanvas.append('svg:path')
						.attr('d', lineGen(do4Points))
						.attr("class", "doline")
						.attr("id", "do4line")
						.attr('stroke', do4Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create do4 plot dots
					do4dots = doCanvas.selectAll("circle.do4Points")
					   	.data(do4Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "do4points")
					    .style("fill", do4Color)
					    .attr("cx", function(d) {
					   		return (doxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (doyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', doTip4.show)  
					    .on('mouseout', doTip4.hide);

//Write Out the Data Tables
					var do1PointsDesc = do1Points.sort(function(a, b){return b.id-a.id});
					var do1DataTableHolder = d3.select("#do1DataTable")
					var do1DataTable = do1DataTableHolder.selectAll(".do1DataPanel")
						.data(do1PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body do1DataPanel")
							.text(function(d) {
								return d3.values(d)
							});
					var do2PointsDesc = do2Points.sort(function(a, b){return b.id-a.id});
					var do2DataTableHolder = d3.select("#do2DataTable")
					var do2DataTable = do2DataTableHolder.selectAll(".do2DataPanel")
						.data(do2PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body do2DataPanel")
							.text(function(d) {
								return d3.values(d)
							});
					var do3PointsDesc = do3Points.sort(function(a, b){return b.id-a.id});
					var do3DataTableHolder = d3.select("#do3DataTable")
					var do3DataTable = do3DataTableHolder.selectAll(".do3DataPanel")
						.data(do3PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body do3DataPanel")
							.text(function(d) {
								return d3.values(d)
							});
					var do4PointsDesc = do4Points.sort(function(a, b){return b.id-a.id});
					var do4DataTableHolder = d3.select("#do4DataTable")
					var do4DataTable = do4DataTableHolder.selectAll(".do4DataPanel")
						.data(do4PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body do4DataPanel")
							.text(function(d) {
								return d3.values(d)
							});					

//Draw do axis
					doCanvas.append("g")
						.attr("class", "xAxis")
						.attr("transform", "translate(0, " + (height - margin.bottom) + ")")
						.call(doxAxis)
						.append("text")
						.attr("x", (width - margin.left))
						.attr("y", margin.bottom)
						.text("Reading Time: ");

					doCanvas.append("g")
						.attr("class", "yAxis")
						.attr("transform", "translate(" + margin.left + ", 0)")
						.call(doyAxis)
						.append("text")
						.attr("x", 0)
						.attr("y", margin.top)
						.text("mg/L");

//Writing Statistics Data to page
	//do1 Statistics
					var do1rdoent = d3.select("#do1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdatedo1);					
					var do1average = d3.select("#do1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meando1 + " | Median: " + mediando1);
			/*		var do1stdDev = d3.select("#do1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevdo1);		*/
					var do1maxmin = d3.select("#do1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxdo1 + " | Min: " + mindo1);
	//do2 Statistics
					var do2rdoent = d3.select("#do2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdatedo2);	
					var do2average = d3.select("#do2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meando2 + " | Median: " + mediando2);
			/*		var do2stdDev = d3.select("#do2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevdo2);		*/
					var do2maxmin = d3.select("#do2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxdo2 + " | Min: " + mindo2);
	//do3 Statistics
					var do3rdoent = d3.select("#do3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdatedo3);	
					var do3average = d3.select("#do3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meando3 + " | Median: " + mediando3);
			/*		var do3stdDev = d3.select("#do3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevdo3);		*/
					var do3maxmin = d3.select("#do3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxdo3 + " | Min: " + mindo3);
	//do4 Statistics
					var do4rdoent = d3.select("#do4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdatedo4);	
					var do4average = d3.select("#do4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meando4 + " | Median: " + mediando4);
			/*		var do4stdDev = d3.select("#do4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevdo4);      */
					var do4maxmin = d3.select("#do4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxdo4 + " | Min: " + mindo4);

				})
			})
		})
	}) 
}


