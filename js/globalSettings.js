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

var selectionTime = -(width/500);
var selectionSize = 12

var margin = {top: 10, right: 5, bottom: 30, left: 50};
var windowWidth = document.getElementById("phArea").getBoundingClientRect();
var width = windowWidth.width - margin.left - margin.right;
var height = 470 - margin.top - margin.bottom;

var graphPadding = 1;

var circleSize = 3;
var lineStroke = 2;
var sens1Color = "green";
var sens2Color = "indianred";
var sens3Color = "lightblue";
var sens4Colro = "orange";
