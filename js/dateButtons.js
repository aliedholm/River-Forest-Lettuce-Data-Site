function dateDropDown(dates){
	d3.selectAll("div.dateButtons").remove();
	for(var i = 0; i < dates.length; i ++){
		d3.select("#dateDrop")
			.append("a")
				.attr("class", "dropdown-item")
				.attr("href", "#")
				.attr("onclick", "drawGraph('" + dates[i] + "');")
				.append("p")
				.text(dates[i]);
	}
}

