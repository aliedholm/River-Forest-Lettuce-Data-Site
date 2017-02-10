function drawph(selectionSize, dateChoice) {
//Clear graph from last time
	d3.select("#phspace").remove();
	d3.selectAll(".d3-tip1").remove();
	d3.selectAll(".d3-tip2").remove();
	d3.selectAll(".d3-tip3").remove();
	d3.selectAll(".d3-tip4").remove();
	d3.selectAll(".panel-body").remove();

//Start of pH Area
					
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

