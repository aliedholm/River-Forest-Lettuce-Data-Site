function runStats (d){
	var keys = Object.keys(d);
	statsDump = {};
	for (var i = 0; i < keys.length; i++){
		statsDump[keys[i]] = {};
		if (d[keys[i]].length > 0){
			var std = math.round(math.std(d[keys[i]]), 4); 
			var max = math.max(d[keys[i]]);
			var min = math.min(d[keys[i]]);
			var mean = math.round(math.mean(d[keys[i]]), 4);
			var vari = math.round(math.var(d[keys[i]]), 4);
			var mode = math.mode(d[keys[i]]);
			var med = math.median(d[keys[i]]);
			var setLength = d[keys[i]].length;
			statsDump[keys[i]]['Standard Deviation'] = std;
			statsDump[keys[i]]['Max Reading'] = max;
			statsDump[keys[i]]['Min Reading'] = min;
			statsDump[keys[i]]['mean'] = mean;
			statsDump[keys[i]]['Set Variance'] = vari;
			statsDump[keys[i]]['Set Mode'] = mode;
			statsDump[keys[i]]['Set Median'] = med;
			if (setLength > 0){
				statsDump[keys[i]]['# of readings'] = setLength; 
			}
		}
	}
	statsObject = statsDump;
	writeStats(statsObject);
}

