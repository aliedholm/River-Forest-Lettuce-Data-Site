//Write the data out to tables
function writeData(d, senseNum) {
	d3.selectAll(".dataTable" + senseNum).remove();
	for (i = 0; i < d.length; i++) {
		d3.select("#table" + senseNum)
			.append("div")
				.attr("class", "panel-body dataTable" + senseNum)
				.text(timeParser(d[i].time));
	}
}
