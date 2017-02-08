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

					var dateSenseMin = [mindatehumidity1]
					var dateSenseMax = [maxdatehumidity1]

					mindate = d3.min(dateSenseMin);
					maxdate = d3.max(dateSenseMax);

					rollingselection = d3.time.hour.offset(maxdate, selectionTime)

//filtering out data points outside the current selection time
					humidity1Points = humidity1Points.filter(function(d) {
						return timeParser(d.time) > rollingselection;
					});

//Setting the sensible input of data
					var humiditySenseLBhumidity1 = d3.min(humidity1Points, function(d) {
						return (+d.reading - graphPadding);
					});
					var humiditySenseUBhumidity1 = d3.max(humidity1Points, function(d) {
						return (+d.reading + graphPadding);
					});

					var humiditySenseLBArr = [humiditySenseLBhumidity1]
					var humiditySenseUBArr = [humiditySenseUBhumidity1]

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
	//Median	
					var medianhumidity1 = d3.median(humidity1Points,function(d) {
						return +d.reading;
					});
					var medianhumidity1 = medianhumidity1.toFixed(3);
					
	//Maxs and Mins
					var maxhumidity1 = d3.max(humidity1Points, function(d) {
						return +d.reading;
					});
					var minhumidity1 = d3.min(humidity1Points, function(d) {
						return +d.reading;
					});

	//Most Rhumidityent Date
					maximumdatehumidity1 = String(maxdatehumidity1).substring(0,25);			

//Filter out obvious errors in data reading
	//Filter out by Lower Bounds
					humidity1Points = humidity1Points.filter(function(d) {
						return +d.reading >= humiditySenseLB;
					});

	//Filter out by Upper Bounds
					humidity1Points = humidity1Points.filter(function(d) {
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

//Activate Tooltips for humidity
					humidityCanvas.call(humidityTip1);

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
	}) 
}


