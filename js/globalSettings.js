//set of variables that hold the data sets for resuse
var sensors = [];
var pH = ['ph1', 'ph2', 'ph3', 'ph4'];
var EC = ['ec1', 'ec2', 'ec3', 'ec4'];
var DOx = ['do1', 'do2', 'do3', 'do4'];
var wtemp = ['wtemp1', 'wtemp2', 'wtemp3', 'wtemp4'];
var atemp = ['atemp1'];
var light = ['light1'];
var humidity = ['humidity1'];
var sensorArray =[pH, EC, DOx, wtemp, atemp, light, humidity]
var fullNames = ['pH', 'Electrical Conductivity', 'Disolved Oxygen', 'Water Temp', 'Air Temp', 'Light', 'Humidity'];
var currentSensor; 
var count = 0;
var inputLimit = [9, 1150, 18, 27, 60, 60000, 100];
var inputFloor = [3, 150, 0, 8, 0, 0, 0];
//set of variables that controls most of the behavior of the graph
var availableDates = [];
var rawStatsObject = {};
var statList = ['std', 'max', 'min', 'mean', 'mode', 'median'];
var statsObject = {};
var maxReading;
var minReading;
var currentDate;
var currentDateShort;
var currentDateEnd;
var sensorNames = [];

var dataByDate = {};
var graphSetReading = [];
var graphSetTime = [];
var graphSet = [];

var margin = {top: 40, right: 50, bottom: 50, left: 70};
var width;
var height = 500 - margin.top - margin.bottom;

var canvas;
var xScale, yScale, xAxis, yAxis;
var graphPadding = 1;

var xAxisTicks = 12;
var yAxisTicks = 14; 

var circleSize = 2;
var lineStroke = 2;
var sensColors = ["green", "indianred", "lightblue", "orange"];


//Parse the Date/Time into plotable data
var timeParser = d3.time.format("%Y-%m-%d %X").parse;

function zeroDate (date){
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	}	

function date24 (date){
	currentDate = new Date(date);
	currentDate.setHours(currentDate.getHours() + currentDate.getTimezoneOffset() / 60);
	zeroDate(currentDate);
	currentDateEnd = d3.time.hour.offset(currentDate, 24);
	n = availableDates.indexOf(date);
	currentDateShort =  availableDates[n];
}

function clearGraph() {
	d3.selectAll(".axis").remove();
	d3.select("#lineSpace").remove();
	d3.select("#graphDate").remove();
	d3.selectAll(".statsBox").remove();
	d3.selectAll(".lines").remove();
	d3.selectAll("circle").remove();
	graphSet = [];
	sensorIndex = ''
}

function clearDates() {
	d3.selectAll(".dropdownDate").remove();
	d3.selectAll(".dropdownSensor").remove();
	d3.select("#currentGraphDate").remove();
	availableDates = [];
	availableReadings = [];
	sensorNames = [];
	sensors = [];
	dataByDate = [];
	currentDate = "";
	currentDateEnd = "";
	currentDateShort = "";
	count = 0;
}

function graphByDate(dateChoice){
	if (availableDates.indexOf(dateChoice) == -1){
		return;
	}
	clearGraph();
	drawSVG(width);
	dateInc(dateChoice);
	drawAxis(dateChoice);
	drawLine(dateChoice);
}
