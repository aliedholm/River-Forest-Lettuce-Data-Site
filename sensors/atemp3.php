<?php
  $con=mysql_connect("gardenduino.tangentiallyluminous.com","raspberrycake","123454321") or die("Failed to connect with database!!!!");
  mysql_select_db("gardenduino", $con); 
  // The Chart table contains two fields: weekly_task and percentage
  // This example will display a pie chart. If you need other charts such as a Bar chart, you will need to modify the code a little to make it work with bar chart and other charts
  $sth = mysql_query("SELECT * FROM atemp3");

  $rows = array();
  //flag is not needed
  $flag = true;
  $table = array();
  $table['cols'] = array(

      // Labels for your chart, these represent the column titles
      // Note that one column is in "string" format and another one is in "number" format as pie chart only required "numbers" for calculating percentage and string will be used for column title
      array('label' => 'id', 'type' => 'number'),
      array('label' => 'reading', 'type' => 'number')

  );

  $rows = array();
  while($r = mysql_fetch_assoc($sth)) {
      $temp = array();
      // the following line will be used to slice the Pie chart
      $temp[] = array('v' => (array) $r['id']); 

      // Values of each slice
      $temp[] = array('v' => (int) $r['reading']); 
      $rows[] = array('c' => $temp);
  }

  $table['rows'] = $rows;
  $jsonTable = json_encode($table);
  //echo $jsonTable;
?>

<html>
  <head>
    <!--Load the Ajax API-->
    <title>Sensor Readings on Lettuce</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.12.3/jquery.min.js"></script>
    <script type="text/javascript">

    // Load the Visualization API and the piechart package.
    google.load('visualization', '1', {'packages':['corechart', 'line']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.setOnLoadCallback(drawChart);

    function drawChart() {

      // Create our data table out of JSON data loaded from server.
      var data = new google.visualization.DataTable(<?=$jsonTable?>);
      var options = {

          hAxis: {
           	title: 'id'
           },
          vAxis: {
           	title: 'reading'
           },
          explorer: { 
            actions: ['dragToPan', 'rightClickToReset']
          }

        };
      // Instantiate and draw our chart, passing in some options.
      // Do not forget to check your div ID
      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
    </script>
  </head>

  <body>
  	<h1>atemp3</h1>
  	<div id="chart_div"></div>
    <div>
          <?php
                $retval = mysql_query("SELECT * FROM atemp3;", $con );
            if(! $retval )
            {
              die('Could not get data: ' . mysql_error());
            }

            echo "<table>";
            while($row = mysql_fetch_assoc($retval))
            {
                echo "<tr>".
               "<td>ID: {$row['id']}  |   </td>".
               "<td>time: {$row['time']}  |   </td>".
               "<td>reading: {$row['reading']} </td>".
               "</tr>";
            }
            echo "</table>";
          ?>
    </div>
  </body>
</html>
