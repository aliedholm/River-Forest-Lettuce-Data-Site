//main data fetching and storing function
function datastore(sensor1, sensor2, sensor3, sensor4){
	//ph1 data
	d3.json("php/" + sensor1 + ".php", function(sens1points){sens1 = sens1points;})
	//ph2 data
	d3.json("php/" + sensor2 + ".php", function(sens2points){sens2 = sens2points;})
	//ph3 data
	d3.json("php/" + sensor3 + ".php", function(sens3points){sens3 = sens3points;})
	//ph4 data
	d3.json("php/" + sensor4 + ".php", function(sens4points){sens4 = sens4points;})
}

function sensorArray(){
	sensors = [sens1, sens2, sens3, sens4];
}

setTimeout(sensorArray(), 5000);
