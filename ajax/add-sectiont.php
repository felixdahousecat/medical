<?php




if ($_POST['type'] == 'mdt') {
	$link = mysqli_connect("192.168.0.5","grant","sarah69","medapp") or die("Error " . mysqli_error($link));
	$query = 'select max(rank) as rank from sections where pid='.$_POST['pid'];
	$result = $link->query($query);
	$rank = mysqli_fetch_assoc($result);
	$newrank = $rank['rank'] + 1;
	
	$date = date("Y-m-d");
	
	
	$query = 'insert into sections (name, date, pid, rank) values ( "MDT" , "'.$date.'", "'.$_POST['pid'].'", "'.$newrank.'")';
	$result = $link->query($query);
	$sectid = mysqli_insert_id($link) ;
	
	
	$query = 'insert into subsections (name, sid, rank) values ( "MDT" , "'.$sectid.'", "1")';
	$result = $link->query($query);
	$subsecid = mysqli_insert_id($link) ;
	
		
	$headings = array ( 
		"Date:" => "3",
		"Preliminary Info" => "1",
		"Report from MDT" => "1"
	);
	$i = 1;
	foreach ($headings as $title => $type) {
		$query = 'insert into headings (name, parent, rank) values ( "'.$title.'" , "'.$subsecid.'", "'.$i.'")';
		$result = $link->query($query);
		$headingid = mysqli_insert_id($link);
		
		$query = 'insert into data (data, ref, type, rank) values ( "" , "'.$headingid.'", "'.$type.'", "'.$i.'")';
		$result = $link->query($query);
		
		$i++;
	}
	
	
	echo '{"status":"success"}';
	
	
	
}


exit;








//echo $query;
$result = $link->query($query);
if ($result) {
	echo '{"status":"success"}';
} else {
	echo '{"status":"fail"}';

}








?>