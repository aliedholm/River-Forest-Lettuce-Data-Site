function runStats (d){
	var keys = Object.keys(d);
	statsDump = {};
	for (var i = 0; i < keys.length; i++){
		statsDump[keys[i]] = {};
		if (d[keys[i]].length > 0){
		var std = math.std(d[keys[i]]); 
		var max = math.max(d[keys[i]]);
		var min = math.min(d[keys[i]]);
		var mean = math.mean(d[keys[i]]);
		var vari = math.var(d[keys[i]]);
		var mode = math.mode(d[keys[i]]);
		var med = math.median(d[keys[i]]);
		statsDump[keys[i]]['std'] = std;
		statsDump[keys[i]]['max'] = max;
		statsDump[keys[i]]['min'] = min;
		statsDump[keys[i]]['mean'] = mean;
		statsDump[keys[i]]['vari'] = vari;
		statsDump[keys[i]]['mode'] = mode;
		statsDump[keys[i]]['median'] = med;
		}
	}
	statsObject = statsDump;
	writeStats(statsObject);
}

