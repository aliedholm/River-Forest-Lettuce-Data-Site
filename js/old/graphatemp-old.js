function drawatemp(selectionSize) {
//Clear graph from last time
	d3.select("#atempspace").remove();
	d3.selectAll(".d3-tip1").remove();
	d3.selectAll(".d3-tip2").remove();
	d3.selectAll(".d3-tip3").remove();
	d3.selectAll(".d3-tip4").remove();
	d3.selectAll(".panel-body").remove();

//Start of atemp Area
	//Get the Data for all atemp series
	atemp1graph = d3.json("php/atemp1.php", function(atemp1Points){
		atemp2graph = d3.json("php/atemp2.php", function(atemp2Points){
			atemp3graph = d3.json("php/atemp3.php", function(atemp3Points){
				atemp4graph = d3.json("php/atemp4.php", function(atemp4Points){

//Global atemp Variable Settings
					var margin = {top: 10, right: 5, bottom: 30, left: 50};
					//var windowWidth = $(window).width(); //get the width of the screen
					var windowWidth = document.getElementById("atempArea").getBoundingClientRect();
					var width = windowWidth.width - margin.left - margin.right;
					var height = 470 - margin.top - margin.bottom;

					var graphPadding = 1;

					var circleSize = 3;
					var lineStroke = 2;
					var atemp1Color = "green";
					var atemp2Color = "indianred";
					var atemp3Color = "lightblue";
					var atemp4Color = "orange";

//Parse the Date/Time into plotable data
	//Parser Function to sort out format from MYSQL
					var timeParser = d3.time.format("%Y-%m-%d %X").parse;

//Calculate the time ranges of input data
					var selectionTime = -(width/500);
						if (selectionSize > 0) {
							selectionTime = -(selectionSize);
						}
					var maxdateatemp1 = d3.max(atemp1Points, function(d) {
						return (timeParser(d.time));
					});
					var mindateatemp1 = d3.min(atemp1Points, function(d) {
						return (timeParser(d.time));
					});
					var maxdateatemp2 = d3.max(atemp2Points, function(d) {
						return (timeParser(d.time));
					});
					var mindateatemp2 = d3.min(atemp2Points, function(d) {
						return (timeParser(d.time));
					});
					var maxdateatemp3 = d3.max(atemp3Points, function(d) {
						return (timeParser(d.time));
					});
					var mindateatemp3 = d3.min(atemp3Points, function(d) {
						return (timeParser(d.time));
					});
					var maxdateatemp4 = d3.max(atemp4Points, function(d) {
						return (timeParser(d.time));
					});
					var mindateatemp4 = d3.min(atemp4Points, function(d) {
						return (timeParser(d.time));
					});

					var dateSenseMin = [mindateatemp1, mindateatemp2, mindateatemp3, mindateatemp4]
					var dateSenseMax = [maxdateatemp1, maxdateatemp2, maxdateatemp3, maxdateatemp4]

					mindate = d3.min(dateSenseMin);
					maxdate = d3.max(dateSenseMax);

					rollingselection = d3.time.hour.offset(maxdate, selectionTime)

//filtering out data points outside the current selection time
					atemp1Points = atemp1Points.filter(function(d) {
						return timeParser(d.time) > rollingselection;
					});
					atemp2Points = atemp2Points.filter(function(d) {
						return timeParser(d.time) > rollingselection;
					});
					atemp3Points = atemp3Points.filter(function(d) {
						return timeParser(d.time) > rollingselection;
					});
					atemp4Points = atemp4Points.filter(function(d) {
						return timeParser(d.time) > rollingselection;
					});

//Setting the sensible input of data
					var atempSenseLBatemp1 = d3.min(atemp1Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var atempSenseUBatemp1 = d3.max(atemp1Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var atempSenseLBatemp2 = d3.min(atemp2Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var atempSenseUBatemp2 = d3.max(atemp2Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var atempSenseLBatemp3 = d3.min(atemp3Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var atempSenseUBatemp3 = d3.max(atemp3Points, function(d) {
						return (+d.reading + graphPadding);
					});					

					var atempSenseLBatemp4 = d3.min(atemp4Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var atempSenseUBatemp4 = d3.max(atemp4Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var atempSenseLBArr = [atempSenseLBatemp1, atempSenseLBatemp2, atempSenseLBatemp3, atempSenseLBatemp4]
					var atempSenseUBArr = [atempSenseUBatemp1, atempSenseUBatemp2, atempSenseUBatemp3, atempSenseUBatemp4]

					atempSenseLB = d3.min(atempSenseLBArr);
					atempSenseUB = d3.max(atempSenseUBArr);

					var xAxisTicks = (width/100);
					var yAxisTicks = 10;

//Calculate the Data Statistics
	//Means
					var meanatemp1 = d3.mean(atemp1Points,function(d) {
						return +d.reading;
					});
					var meanatemp1 = meanatemp1.toFixed(3);
					var meanatemp2 = d3.mean(atemp2Points,function(d) {
						return +d.reading;
					});
					var meanatemp2 = meanatemp2.toFixed(3);
					var meanatemp3 = d3.mean(atemp3Points,function(d) {
						return +d.reading;
					});
					var meanatemp3 = meanatemp3.toFixed(3);
					var meanatemp4 = d3.mean(atemp4Points,function(d) {
						return +d.reading;
					});
					var meanatemp4 = meanatemp4.toFixed(3);
	//Median	
					var medianatemp1 = d3.median(atemp1Points,function(d) {
						return +d.reading;
					});
					var medianatemp1 = medianatemp1.toFixed(3);
					var medianatemp2 = d3.median(atemp2Points,function(d) {
						return +d.reading;
					});
					var medianatemp2 = medianatemp2.toFixed(3);
					var medianatemp3 = d3.median(atemp3Points,function(d) {
						return +d.reading;
					});
					var medianatemp3 = medianatemp3.toFixed(3);
					var medianatemp4 = d3.median(atemp4Points,function(d) {
						return +d.reading;
					});
					var medianatemp4 = medianatemp4.toFixed(3);
	//Standard Deviation	
	/*				var stdDevatemp1 = d3.Deviation(atemp1Points,function(d) {
						return +d.reading;
					});
					var stdDevatemp1 = stdDevatemp1.toFixed(3);
					var stdDevatemp2 = d3.Deviaton(atemp2Points,function(d) {
						return +d.reading;
					});
					var stdDevatemp2 = stdDevatemp2.toFixed(3);
					var stdDevatemp3 = d3.Deviaton(atemp3Points,function(d) {
						return +d.reading;
					});
					var stdDevatemp3 = stdDevatemp3.toFixed(3);
					var stdDevatemp4 = d3.Deviaton(atemp4Points,function(d) {
						return +d.reading;
					});
					var stdDevatemp4 = stdDevatemp4.toFixed(3);    */
	//Maxs and Mins
					var maxatemp1 = d3.max(atemp1Points, function(d) {
						return +d.reading;
					});
					var minatemp1 = d3.min(atemp1Points, function(d) {
						return +d.reading;
					});

					var maxatemp2 = d3.max(atemp2Points, function(d) {
						return +d.reading;
					});
					var minatemp2 = d3.min(atemp2Points, function(d) {
						return +d.reading;
					});

					var maxatemp3 = d3.max(atemp3Points, function(d) {
						return +d.reading;
					});
					var minatemp3 = d3.min(atemp3Points, function(d) {
						return +d.reading;
					});

					var maxatemp4 = d3.max(atemp4Points, function(d) {
						return +d.reading;
					});
					var minatemp4 = d3.min(atemp4Points, function(d) {
						return +d.reading;
					});	
	//Most Ratempent Date
					maximumdateatemp1 = String(maxdateatemp1).substring(0,25);
					maximumdateatemp2 = String(maxdateatemp2).substring(0,25);
					maximumdateatemp3 = String(maxdateatemp3).substring(0,25);
					maximumdateatemp4 = String(maxdateatemp4).substring(0,25);				

//Filter out obvious errors in data reading
	//Filter out by Lower Bounds
					atemp1Points = atemp1Points.filter(function(d) {
						return +d.reading >= atempSenseLB;
					});
					atemp2Points = atemp2Points.filter(function(d) {
						return +d.reading >= atempSenseLB;
					});
					atemp3Points = atemp3Points.filter(function(d) {
						return +d.reading >= atempSenseLB;
					});								
					atemp4Points = atemp4Points.filter(function(d) {
						return +d.reading >= atempSenseLB;
					});

	//Filter out by Upper Bounds
					atemp1Points = atemp1Points.filter(function(d) {
						return +d.reading <= atempSenseUB;
					});
					atemp2Points = atemp2Points.filter(function(d) {
						return +d.reading <= atempSenseUB;
					});
					atemp3Points = atemp3Points.filter(function(d) {
						return +d.reading <= atempSenseUB;
					});								
					atemp4Points = atemp4Points.filter(function(d) {
						return +d.reading <= atempSenseUB;
					});

//Create Scales for atemp
					var atempxScale = d3.time.scale()
						.domain([rollingselection, maxdate])
						.range([margin.left, (width)]);

					var atempyScale = d3.scale.linear()
						.domain([atempSenseLB, atempSenseUB])
						.range([(height - margin.bottom), margin.top]);

//Design Axis for atemp
					var atempxAxis = d3.svg.axis()
						.ticks(xAxisTicks)
						.orient("bottom")
						.scale(atempxScale);

					var atempyAxis = d3.svg.axis()
						.ticks(yAxisTicks)
						.orient("left")
						.scale(atempyScale);

//Create SVG atemp canvas element
					var atempCanvas = d3.select("#atempArea")
						.append("svg")
						.attr("id", "atempspace")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
						.append("g")
						.attr("transform", "translate(0, 0)");

//Build Tooltips for atemp
					var atempTip1 = d3.tip()
						.attr('class', 'd3-tip1')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

					var atempTip2 = d3.tip()
						.attr('class', 'd3-tip2')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

					var atempTip3 = d3.tip()
						.attr('class', 'd3-tip3')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

					var atempTip4 = d3.tip()
						.attr('class', 'd3-tip4')
						.offset([-10, 0])
						.html(function(d) {
							return "<strong>Time: </strong>" + d.time + "<br /><strong>Reading: </strong>" + d.reading + "<br /><strong>ID: </strong>" + d.id;
						})

//Activate Tooltips for atemp
					atempCanvas.call(atempTip1);
					atempCanvas.call(atempTip2);
					atempCanvas.call(atempTip3);
					atempCanvas.call(atempTip4);

//Line Function
					var lineGen = d3.svg.line()
					    .x(function(d) {
					        return atempxScale(timeParser(d.time));
					    })
					    .y(function(d) {
					        return atempyScale(d.reading);
					    });	    

//Handle Graphing atemp1
	//Draw atemp1 Line
					atempCanvas.append('svg:path')
						.attr('d', lineGen(atemp1Points))
						.attr("class", "atempline")
						.attr("id", "atemp1line")
						.attr('stroke', atemp1Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create atemp1 plot dots
					atemp1dots = atempCanvas.selectAll("circle.atemp1Points")
					   	.data(atemp1Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "atemp1points")
					    .style("fill", atemp1Color)
					    .attr("cx", function(d) {
					   		return (atempxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (atempyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', atempTip1.show)  
					    .on('mouseout', atempTip1.hide);

//Handle Graphing atemp2
	//Draw atemp2 Line
					atempCanvas.append('svg:path')
						.attr('d', lineGen(atemp2Points))
						.attr("class", "atempline")
						.attr("id", "atemp2line")
						.attr('stroke', atemp2Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create atemp2 plot dots
					atemp2dots = atempCanvas.selectAll("circle.atemp2Points")
					   	.data(atemp2Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "atemp2points")
					    .style("fill", atemp2Color)
					    .attr("cx", function(d) {
					   		return (atempxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (atempyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', atempTip2.show)  
					    .on('mouseout', atempTip2.hide);
	   								
//Handle Graphing atemp3
	//Draw atemp3 Line
					atempCanvas.append('svg:path')
						.attr('d', lineGen(atemp3Points))
						.attr("class", "atempline")
						.attr("id", "atemp3line")
						.attr('stroke', atemp3Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create atemp3 plot dots
					atemp3dots = atempCanvas.selectAll("circle.atemp3Points")
					   	.data(atemp3Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "atemp3points")
					    .style("fill", atemp3Color)
					    .attr("cx", function(d) {
					   		return (atempxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (atempyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', atempTip3.show)  
					    .on('mouseout', atempTip3.hide);

//Handle Graphing atemp4
	//Draw atemp4 Line
					atempCanvas.append('svg:path')
						.attr('d', lineGen(atemp4Points))
						.attr("class", "atempline")
						.attr("id", "atemp4line")
						.attr('stroke', atemp4Color)
						.attr('stroke-width', lineStroke)
						.attr('fill', 'none');
	//Create atemp4 plot dots
					atemp4dots = atempCanvas.selectAll("circle.atemp4Points")
					   	.data(atemp4Points)
					   	.enter()
					   	.append("circle")
					    .attr("class", "atemp4points")
					    .style("fill", atemp4Color)
					    .attr("cx", function(d) {
					   		return (atempxScale(timeParser(d.time)));
					    })
					    .attr("cy", function(d) {
					   		return (atempyScale(d.reading));
					    })
					    .attr("r", circleSize)
					    .on('mouseover', atempTip4.show)  
					    .on('mouseout', atempTip4.hide);

//Write Out the Data Tables
					var atemp1PointsDesc = atemp1Points.sort(function(a, b){return b.id-a.id});
					var atemp1DataTableHolder = d3.select("#atemp1DataTable")
					var atemp1DataTable = atemp1DataTableHolder.selectAll(".atemp1DataPanel")
						.data(atemp1PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body atemp1DataPanel")
							.text(function(d) {
								return d3.values(d)
							});
					var atemp2PointsDesc = atemp2Points.sort(function(a, b){return b.id-a.id});
					var atemp2DataTableHolder = d3.select("#atemp2DataTable")
					var atemp2DataTable = atemp2DataTableHolder.selectAll(".atemp2DataPanel")
						.data(atemp2PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body atemp2DataPanel")
							.text(function(d) {
								return d3.values(d)
							});
					var atemp3PointsDesc = atemp3Points.sort(function(a, b){return b.id-a.id});
					var atemp3DataTableHolder = d3.select("#atemp3DataTable")
					var atemp3DataTable = atemp3DataTableHolder.selectAll(".atemp3DataPanel")
						.data(atemp3PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body atemp3DataPanel")
							.text(function(d) {
								return d3.values(d)
							});
					var atemp4PointsDesc = atemp4Points.sort(function(a, b){return b.id-a.id});
					var atemp4DataTableHolder = d3.select("#atemp4DataTable")
					var atemp4DataTable = atemp4DataTableHolder.selectAll(".atemp4DataPanel")
						.data(atemp4PointsDesc).enter()
						.append("div")
							.attr("class", "panel-body atemp4DataPanel")
							.text(function(d) {
								return d3.values(d)
							});					

//Draw atemp axis
					atempCanvas.append("g")
						.attr("class", "xAxis")
						.attr("transform", "translate(0, " + (height - margin.bottom) + ")")
						.call(atempxAxis)
						.append("text")
						.attr("x", (width - margin.left))
						.attr("y", margin.bottom)
						.text("Reading Time: ");

					atempCanvas.append("g")
						.attr("class", "yAxis")
						.attr("transform", "translate(" + margin.left + ", 0)")
						.call(atempyAxis)
						.append("text")
						.attr("x", 0)
						.attr("y", margin.top)
						.text("deg C");

//Writing Statistics Data to page
	//atemp1 Statistics
					var atemp1ratempent = d3.select("#atemp1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdateatemp1);					
					var atemp1average = d3.select("#atemp1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meanatemp1 + " | Median: " + medianatemp1);
			/*		var atemp1stdDev = d3.select("#atemp1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevatemp1);		*/
					var atemp1maxmin = d3.select("#atemp1average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxatemp1 + " | Min: " + minatemp1);
	//atemp2 Statistics
					var atemp2ratempent = d3.select("#atemp2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdateatemp2);	
					var atemp2average = d3.select("#atemp2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meanatemp2 + " | Median: " + medianatemp2);
			/*		var atemp2stdDev = d3.select("#atemp2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevatemp2);		*/
					var atemp2maxmin = d3.select("#atemp2average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxatemp2 + " | Min: " + minatemp2);
	//atemp3 Statistics
					var atemp3ratempent = d3.select("#atemp3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdateatemp3);	
					var atemp3average = d3.select("#atemp3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meanatemp3 + " | Median: " + medianatemp3);
			/*		var atemp3stdDev = d3.select("#atemp3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevatemp3);		*/
					var atemp3maxmin = d3.select("#atemp3average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxatemp3 + " | Min: " + minatemp3);
	//atemp4 Statistics
					var atemp4ratempent = d3.select("#atemp4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Latest: " + maximumdateatemp4);	
					var atemp4average = d3.select("#atemp4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Mean: " + meanatemp4 + " | Median: " + medianatemp4);
			/*		var atemp4stdDev = d3.select("#atemp4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Standard Deviation: " + stdDevatemp4);      */
					var atemp4maxmin = d3.select("#atemp4average")
						.append("div")
							.attr("class", "panel-body")
							.text("Max: " + maxatemp4 + " | Min: " + minatemp4);

				})
			})
		})
	}) 
}


