//set of variables that hold the data sets for resuse
var sens1, sens2, sens3, sens4;
var sensors = [];
//set of variables that controls most of the behavior of the graph
var availableDates = [];

var sensorNames = [];

var dataByDate = {};
var storeCount = 0;

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
