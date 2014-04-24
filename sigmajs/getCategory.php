<?php
	ini_set('display_errors', 1);
    $topic = $_GET['q'];
	$json =  file_get_contents("http://en.wikipedia.org/w/api.php?action=parse&page=".$topic."&prop=categories&format=json");
	$json = json_decode($json);
	if(!property_exists($json, "error") ){
		$json = $json->parse->categories;

		$categories = array();
		for( $i = 0; $i < count($json); ++$i) {
			if(!property_exists($json[$i], "hidden") ){
				$categories[] = $json[$i]->{'*'};
			}
		}
		echo json_encode($categories);

	}
	else
		echo json_encode(array());
	
?>