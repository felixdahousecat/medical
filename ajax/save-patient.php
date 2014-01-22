<?php

$link = mysqli_connect("192.168.0.5","grant","sarah69","medapp") or die("Error " . mysqli_error($link));

foreach ($_POST as $key => $value) {
	if ($key != 'files') {
		$values .= '"'.$value.'",'; 
		$column .= $key.",";
	}
}

$query = 'INSERT INTO patients ('.rtrim($column, ",").') VALUES ('.rtrim($values, ",").')';
//echo $query;
$result = $link->query($query);
if ($result) {
	echo '{"status":"success"}';
} else {
	echo '{"status":"fail"}';

}








?>