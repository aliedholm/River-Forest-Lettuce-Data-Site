<?php
    $username = "raspberrycake"; 
    $password = "123454321";   
    $host = "gardenduino.tangentiallyluminous.com";
    $Database="gardenduino";
    
    $server = mysql_connect($host, $username, $password);
    $connection = mysql_select_db($Database, $server);

    $myquery = "
        SELECT * FROM ec1
    ";
    $query = mysql_query($myquery);
    
    if ( ! $query ) {
        echo mysql_error();
        die;
    }
    
    $ec1points = array();
    
    for ($x = 0; $x < mysql_num_rows($query); $x++) {
        $ec1points[] = mysql_fetch_assoc($query);
    }
    
    echo json_encode($ec1points);     
     
    mysql_close($server);
?>