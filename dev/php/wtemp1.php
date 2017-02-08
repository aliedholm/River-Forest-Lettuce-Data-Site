<?php
    $username = "raspberrycake"; 
    $password = "123454321";   
    $host = "gardenduino.tangentiallyluminous.com";
    $Database="gardenduino";
    
    $server = mysql_connect($host, $username, $password);
    $connection = mysql_select_db($Database, $server);

    $myquery = "
        SELECT * FROM wtemp1
    ";
    $query = mysql_query($myquery);
    
    if ( ! $query ) {
        echo mysql_error();
        die;
    }
    
    $wtemp1points = array();
    
    for ($x = 0; $x < mysql_num_rows($query); $x++) {
        $wtemp1points[] = mysql_fetch_assoc($query);
    }
    
    echo json_encode($wtemp1points);     
     
    mysql_close($server);
?>