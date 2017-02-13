function dateButtons(dates){
	d3.selectAll("div.dateButtons").remove();
	for(var i = 0; i < dates.length; i++){
		d3.select("#calRow")
			.append("div")
				.attr("class", "col-xs-6 col-sm-6 col-md-4 col-lg-2 dateButtons")
			.append("input")
				.attr("class", "daySelButton btn btn-warning")
				.attr("type", "button")
				.attr("value", dates[i])
				.attr("onclick", "drawGraph('" + dates[i] + "');");
	}
}

