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
		co22graph = d3.json("php/co22.php", function(co22Points){
			co23graph = d3.json("php/co23.php", function(co23Points){
				co24graph = d3.json("php/co24.php", function(co24Points){

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
					var co22Color = "indianred";
					var co23Color = "lightblue";
					var co24Color = "orange";

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
					var maxdateco22 = d3.max(co22Points, function(d) {
						return (timeParser(d.time));
					});
					var mindateco22 = d3.min(co22Points, function(d) {
						return (timeParser(d.time));
					});
					var maxdateco23 = d3.max(co23Points, function(d) {
						return (timeParser(d.time));
					});
					var mindateco23 = d3.min(co23Points, function(d) {
						return (timeParser(d.time));
					});
					var maxdateco24 = d3.max(co24Points, function(d) {
						return (timeParser(d.time));
					});
					var mindateco24 = d3.min(co24Points, function(d) {
						return (timeParser(d.time));
					});

					var dateSenseMin = [mindateco21, mindateco22, mindateco23, mindateco24]
					var dateSenseMax = [maxdateco21, maxdateco22, maxdateco23, maxdateco24]

					mindate = d3.min(dateSenseMin);
					maxdate = d3.max(dateSenseMax);

					rollingselection = d3.time.hour.offset(maxdate, selectionTime)

//filtering out data points outside the current selection time
					co21Points = co21Points.filter(function(d) {
						return timeParser(d.time) > rollingselection;
					});
					co22Points = co22Points.filter(function(d) {
						return timeParser(d.time) > rollingselection;
					});
					co23Points = co23Points.filter(function(d) {
						return timeParser(d.time) > rollingselection;
					});
					co24Points = co24Points.filter(function(d) {
						return timeParser(d.time) > rollingselection;
					});

//Setting the sensible input of data
					var co2SenseLBco21 = d3.min(co21Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var co2SenseUBco21 = d3.max(co21Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var co2SenseLBco22 = d3.min(co22Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var co2SenseUBco22 = d3.max(co22Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var co2SenseLBco23 = d3.min(co23Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var co2SenseUBco23 = d3.max(co23Points, function(d) {
						return (+d.reading + graphPadding);
					});					

					var co2SenseLBco24 = d3.min(co24Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var co2SenseUBco24 = d3.max(co24Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var co2SenseLBArr = [co2SenseLBco21, co2SenseLBco22, co2SenseLBco23, co2SenseLBco24]
					var co2SenseUBArr = [co2SenseUBco21, co2SenseUBco22, co2SenseUBco23, co2SenseUBco24]

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
					var meanco22 = d3.mean(co22Points,function(d) {
						return +d.reading;
					});
					var meanco22 = meanco22.toFixed(3);
					var meanco23 = d3.mean(co23Points,function(d) {
						return +d.reading;
					});
					var meanco23 = meanco23.toFixed(3);
					var meanco24 = d3.mean(co24Points,function(d) {
						return +d.reading;
					});
					var meanco24 = meanco24.toFixed(3);
	//Median	
					var medianco21 = d3.median(co21Points,function(d) {
						return +d.reading;
					});
					var medianco21 = medianco21.toFixed(3);
					var medianco22 = d3.median(co22Points,function(d) {
						return +d.reading;
					});
					var medianco22 = medianco22.toFixed(3);
					var medianco23 = d3.median(co23Points,function(d) {
						return +d.reading;
					});
					var medianco23 = medianco23.toFixed(3);
					var medianco24 = d3.median(co24Points,function(d) {
						return +d.reading;
					});
					var medianco24 = medianco24.toFixed(3);
	//Standard Deviation	
	/*				var stdDevco21 = d3.Deviation(co21Points,function(d) {
						return +d.reading;
					});
					var stdDevco21 = stdDevco21.toFixed(3);
					var stdDevco22 = d3.Deviaton(co22Points,function(d) {
						return +d.reading;
					});
					var stdDevco22 = stdDevco22.toFixed(3);
					var stdDevco23 = d3.Deviaton(co23Points,function(d) {
						return +d.reading;
					});
					var stdDevco23 = stdDevco23.toFixed(3);
					var stdDevco24 = d3.Deviaton(co24Points,function(d) {
						return +d.reading;
					});
					var stdDevco24 = stdDevco24.toFixed(3);    */
	//Maxs and Mins
					var maxco21 = d3.max(co21Points, function(d) {
						return +d.reading;
					});
					var minco21 = d3.min(co21Points, function(d) {
						return +d.reading;
					});

					var maxco22 = d3.max(co22Points, function(d) {
						return +d.reading;
					});
					var minco22 = d3.min(co22Points, function(d) {
						return +d.reading;
					});

					var maxco23 = d3.max(co23Points, function(d) {
						return +d.reading;
					});
					var minco23 = d3.min(co23Points, function(d) {
						return +d.reading;
					});

					var maxco24 = d3.max(co24Points, function(d) {
						return +d.reading;
					});
					var minco24 = d3.min(co24Points, function(d) {
						return +d.reading;
					});	
	//Most Rco2ent Date
					maximumdateco21 = String(maxdateco21).substring(0,25);
					maximumdateco22 = String(maxdateco22).substring(0,25);
					maximumdateco23 = String(maxdateco23).substring(0,25);
					maximumdateco24 = String(maxdateco24).substring(0,25);				

//Filter out obvious errors in data reading
	//Filter out by Lower Bounds
					co21Points = co21Points.filter(function(d) {
						return +d.reading >= co2SenseLB;
					});
					co22Points = co22Points.filter(function(d) {
						return +d.reading >= co2SenseLB;
					});
					co23Points = co23Points.filter(function(d) {
						return +d.reading >= co2SenseLB;
					});								
					co24Points = co24Points.filter(function(d) {
						return +d.reading >= co2SenseLB;
					});

	//Filter out by Upper Bounds
					co21Points = co21Points.filter(function(d) {
						return +d.reading <= co2SenseUB;
					});
					co22Points = co22Points.filter(function(d) {
						return +d.reading <= co2SenseUB;
					});
					co23Points = co23Points.filter(function(d) {
						return +d.reading <= co2SenseUB;
					});								
					co24Points = co24Points.filter(function(d) {
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

					var co2Tip2 = d3.tip()
						.attr('class', 'd3-tip2')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

					var co2Tip3 = d3.tip()
						.attr('class', 'd3-tip3')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

					var co2Tip4 = d3.tip()
						.attr('class', 'd3-tip4')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

//Activate Tooltips for co2
					co2Canvas.call(co2Tip1);
					co2Canvas.call(co2Tip2);
					co2Canvas.call(co2Tip3);
					co2Canvas.call(co2Tip4);

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

//Handle Graphing co22
	//Draw co22 Line
					co2Canvas.append('svg:path')
						.attr('d', lineGen(co22Points))
						.attr("class", "co2line")
						.attr("id", "co22line")
						.attr('stroke', co22Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create co22 plot dots
					co22dots = co2Canvas.selectAll("circle.co22Points")
					   	.data(co22Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "co22points")
					    .style("fill", co22Color)
					    .attr("cx", function(d) {
					   		return (co2xScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (co2yScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', co2Tip2.show)  
					    .on('mouseout', co2Tip2.hide);
	   								
//Handle Graphing co23
	//Draw co23 Line
					co2Canvas.append('svg:path')
						.attr('d', lineGen(co23Points))
						.attr("class", "co2line")
						.attr("id", "co23line")
						.attr('stroke', co23Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create co23 plot dots
					co23dots = co2Canvas.selectAll("circle.co23Points")
					   	.data(co23Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "co23points")
					    .style("fill", co23Color)
					    .attr("cx", function(d) {
					   		return (co2xScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (co2yScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', co2Tip3.show)  
					    .on('mouseout', co2Tip3.hide);

//Handle Graphing co24
	//Draw co24 Line
					co2Canvas.append('svg:path')
						.attr('d', lineGen(co24Points))
						.attr("class", "co2line")
						.attr("id", "co24line")
						.attr('stroke', co24Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create co24 plot dots
					co24dots = co2Canvas.selectAll("circle.co24Points")
					   	.data(co24Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "co24points")
					    .style("fill", co24Color)
					    .attr("cx", function(d) {
					   		return (co2xScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (co2yScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', co2Tip4.show)  
					    .on('mouseout', co2Tip4.hide);

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
					var co22PointsDesc = co22Points.sort(function(a, b){return b.id-a.id});
					var co22DataTableHolder = d3.select("#co22DataTable")
					var co22DataTable = co22DataTableHolder.selectAll(".co22DataPanel")
						.data(co22PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body co22DataPanel")
							.text(function(d) {
								return d3.values(d)
							});
					var co23PointsDesc = co23Points.sort(function(a, b){return b.id-a.id});
					var co23DataTableHolder = d3.select("#co23DataTable")
					var co23DataTable = co23DataTableHolder.selectAll(".co23DataPanel")
						.data(co23PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body co23DataPanel")
							.text(function(d) {
								return d3.values(d)
							});
					var co24PointsDesc = co24Points.sort(function(a, b){return b.id-a.id});
					var co24DataTableHolder = d3.select("#co24DataTable")
					var co24DataTable = co24DataTableHolder.selectAll(".co24DataPanel")
						.data(co24PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body co24DataPanel")
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
	//co22 Statistics
					var co22rco2ent = d3.select("#co22average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdateco22);	
					var co22average = d3.select("#co22average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meanco22 + " | Median: " + medianco22);
			/*		var co22stdDev = d3.select("#co22average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevco22);		*/
					var co22maxmin = d3.select("#co22average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxco22 + " | Min: " + minco22);
	//co23 Statistics
					var co23rco2ent = d3.select("#co23average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdateco23);	
					var co23average = d3.select("#co23average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meanco23 + " | Median: " + medianco23);
			/*		var co23stdDev = d3.select("#co23average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevco23);		*/
					var co23maxmin = d3.select("#co23average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxco23 + " | Min: " + minco23);
	//co24 Statistics
					var co24rco2ent = d3.select("#co24average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdateco24);	
					var co24average = d3.select("#co24average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meanco24 + " | Median: " + medianco24);
			/*		var co24stdDev = d3.select("#co24average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevco24);      */
					var co24maxmin = d3.select("#co24average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxco24 + " | Min: " + minco24);

				})
			})
		})
	}) 
}


