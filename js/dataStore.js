//main data fetching and storing function
function dataStore(sensor1, sensor2, sensor3, sensor4){
	//ph1 data
	d3.json("php/" + sensor1 + ".php", function(sens1points){
		sens1 = sens1points;
		sensors.push(sens1);
		sensor1name = sensor1;
	})
	//ph2 data
	d3.json("php/" + sensor2 + ".php", function(sens2points){
		sens2 = sens2points;
		sensors.push(sens2);
		sensor2name = sensor2;
	})
	//ph3 data
	d3.json("php/" + sensor3 + ".php", function(sens3points){
		sens3 = sens3points;
		sensors.push(sens3);
		sensor3name = sensor3;
	})
	//ph4 data
	d3.json("php/" + sensor4 + ".php", function(sens4points){
		sens4 = sens4points;
		sensors.push(sens4);
		sensor4name = sensor4;
	})
}
