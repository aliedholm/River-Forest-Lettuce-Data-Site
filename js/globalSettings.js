//set of variables that hold the data sets for resuse
var sensors = [];
var pH = ['ph1', 'ph2', 'ph3', 'ph4'];
var EC = ['ec1', 'ec2', 'ec3', 'ec4'];
var DO = ['do1', 'do2', 'do3', 'do4'];
var wtemp = ['wtemp1', 'wtemp2', 'wtemp3', 'wtemp4']
 
//set of variables that controls most of the behavior of the graph
var availableDates = [];
var activeDay;
var currentDate;
var currentDateShort;
var currentDateEnd;
var sensorNames = [];

var dataByDate = {};
var graphSetReading = [];
var graphSetTime = [];
var storeCount = 0;

var margin = {top: 10, right: 50, bottom: 30, left: 50};
var windowWidth = 1200 //$(window).width(); 
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
