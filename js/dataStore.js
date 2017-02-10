//main data fetching and storing function
function dataStore(sensorPack){
	for (var i = 0; i < sensorPack.length; i++){
		sensorNames.push(sensorPack[i]);
	}

	//ph1 data
	d3.json("php/" + sensorPack[0] + ".php", function(sens1points){
		sens1 = sens1points;
		sensors.push(sens1);
	})
	//ph2 data
	d3.json("php/" + sensorPack[1] + ".php", function(sens2points){
		sens2 = sens2points;
		sensors.push(sens2);
	})
	//ph3 data
	d3.json("php/" + sensorPack[2] + ".php", function(sens3points){
		sens3 = sens3points;
		sensors.push(sens3);
	})
	//ph4 data
	d3.json("php/" + sensorPack[3] + ".php", function(sens4points){
		sens4 = sens4points;
		sensors.push(sens4);
	})
}
