function drawatemp(selectionSize, dateChoice) {
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

//Global atemp Variable Settings
					var availableDates = [];
					var availableDatesFull = [];

					var margin = {top: 10, right: 5, bottom: 30, left: 50};
					//var windowWidth = $(window).width(); //get the width of the screen
					var windowWidth = document.getElementById("atempArea").getBoundingClientRect();
					var width = windowWidth.width - margin.left - margin.right;
					var height = 470 - margin.top - margin.bottom;

					var graphPadding = 1;

					var circleSize = 3;
					var lineStroke = 2;
					var atemp1Color = "green";

//Parse the Date/Time into plotable data
	//Parser Function to sort out format from MYSQL
					var timeParser = d3.time.format("%Y-%m-%d %X").parse;

//Create Array Of Available Dates
					atemp1Points.forEach(function(d){
						if (availableDates.indexOf(timeParser(d.time).toString().substring(0, 15)) == -1) {
							availableDates.push(timeParser(d.time).toString().substring(0, 15));
							availableDatesFull.push(d.time);
						}
					})

					console.log(availableDates);
					
					d3.selectAll("div.dateButtons").remove();
					for (i = availableDates.length - 1; i >= 0; i--){
						d3.select("#calRow")
							.append("div")
								.attr("class", "col-xs-6 col-sm-6 col-md-4 col-lg-2 dateButtons")
								.append("input")
									.attr("class", "daySelButton btn btn-warning")
									.attr("type", "button")
									.attr("value", availableDates[i])
									.attr("onclick", "drawatemp(24, '" + availableDatesFull[i] + "')");
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
					var maxdateatemp1 = d3.max(atemp1Points, function(d) {
						return (timeParser(d.time));
					});
					var mindateatemp1 = d3.min(atemp1Points, function(d) {
						return (timeParser(d.time));
					});

					var dateSenseMin = [mindateatemp1]
					var dateSenseMax = [maxdateatemp1]

					mindate = d3.min(dateSenseMin);
					maxdate = d3.max(dateSenseMax);

					if (dateChoice){
						maxdate = timeParser(dateChoice);
						maxdate = d3.time.hour.offset(maxdate, 24);
					}

					rollingselection = d3.time.hour.offset(maxdate, selectionTime)

//filtering out data points outside the current selection time
					atemp1Points = atemp1Points.filter(function(d) {
						return timeParser(d.time) > rollingselection;
					});

//Setting the sensible input of data
					var atempSenseLBatemp1 = d3.min(atemp1Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var atempSenseUBatemp1 = d3.max(atemp1Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var atempSenseLBArr = [atempSenseLBatemp1]
					var atempSenseUBArr = [atempSenseUBatemp1]

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
	//Median	
					var medianatemp1 = d3.median(atemp1Points,function(d) {
						return +d.reading;
					});
					var medianatemp1 = medianatemp1.toFixed(3);					
	//Maxs and Mins
					var maxatemp1 = d3.max(atemp1Points, function(d) {
						return +d.reading;
					});
					var minatemp1 = d3.min(atemp1Points, function(d) {
						return +d.reading;
					});
	//Most Ratempent Date
					maximumdateatemp1 = String(maxdateatemp1).substring(0,25);			

//Filter out obvious errors in data reading
	//Filter out by Lower Bounds
					atemp1Points = atemp1Points.filter(function(d) {
						return +d.reading >= atempSenseLB;
					});
					
	//Filter out by Upper Bounds
					atemp1Points = atemp1Points.filter(function(d) {
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

//Activate Tooltips for atemp
					atempCanvas.call(atempTip1);

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


				
			
		
	}) 
}


