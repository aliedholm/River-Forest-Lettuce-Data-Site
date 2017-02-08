<?php

include('user.php');

$user1 = new Member('Andy', 'aliedholm@gmail.com', 'Nov 15th 2052');
$user2 = new Admin('Dan', 'Shiter@gmail.com', 2);

echo $user1->getType();
echo '<br /><br />';
echo $user2->getType();