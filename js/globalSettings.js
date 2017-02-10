//set of variables that hold the data sets for resuse
var sens1, sens2, sens3, sens4;
var sensors = [];
//set of variables that controls most of the behavior of the graph
var availableDates = [];
var availableDatesFull = [];
var maxDate;
var minDate;
var maxDates = [];
var minDates = [];
var maxDate0, maxDate1, maxDate2, maxDate3, minDate0, minDate1, minDate2, minDate3;
var currentDatePrev;
var currentDate;
var currentDateEnd;

var sensorNames = [];

var dateArray = [];
var sensArray = [];
var dataByDate = [];
var storeCount = 0;

sensArray.push(dateArray);
dataByDate.push(sensArray);

var selectionTime = -(width/500);
var selectionSize = 12;

var margin = {top: 10, right: 5, bottom: 30, left: 50};
//var windowWidth = document.getElementById("area").getBoundingClientRect();
var windowWidth = $(window).width(); 
var width = windowWidth - margin.left - margin.right;
var height = 470 - margin.top - margin.bottom;

var canvas;
var xScale, yScale, xAxis, yAxis;
var graphPadding = 1;

var xAxisTicks = 12;
var yAxisTicks = 14; 

var circleSize = 3;
var lineStroke = 2;
var sensColors = ["green", "indianred", "lightblue", "orange"];
