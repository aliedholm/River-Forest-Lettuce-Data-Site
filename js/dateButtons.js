function dateDropDown(dates){
	d3.selectAll("div.dateButtons").remove();
	for(var i = 0; i < dates.length; i ++){
		d3.select("#dateDrop")
			.append("a")
				.attr("class", "dropdown-item")
				.attr("href", "#")
				.attr("onclick", "graphByDate('" + dates[i] + "');")
				.append("p")
					.attr("class", "dropdown-text")
					.text(dates[i]);
	}
}
