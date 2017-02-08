//Global variables to hold data
	//raw json object arrays from d3.json
var raw1 = '';
var raw2 = '';
var raw3 = '';
var raw4 = '';

	//date arrays
var availableDates = [];
var availableDatesFull = [];
var strippedDatesAll = [];

var today = ''
var todayLong = ''


//Retrieve the data from the database and store in variables
function imbue() {
	d3.json("php/ph1.php", function(error, phpData1){
		if (error) {return console.warn(error);}
		raw1 = phpData1;
	})	
	d3.json("php/ph2.php", function(error, phpData2){
		if (error) {return console.warn(error);}
		raw2 = phpData2;
	})	
	d3.json("php/ph3.php", function(error, phpData3){
		if (error) {return console.warn(error);}
		raw3 = phpData3;
	})	
	d3.json("php/ph4.php", function(error, phpData4){
		if (error) {return console.warn(error);}
		raw4 = phpData4;
		sortDates(raw1, raw2, raw3, raw4);
	})
}
