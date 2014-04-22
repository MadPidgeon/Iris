<?php
$q = $_GET['q'];
$json = file_get_contents("http://wikipedia-miner.cms.waikato.ac.nz/services/search?query=".urlencode($q)."&responseFormat=json");
$json = json_decode($json);
//var_dump($json);
if(count($json->labels[0]->senses) == 0) {
	$return = array( 'error' => 'No results',
				'errorCode' => 001 );
	echo json_encode($return);
	exit();	
}

$id = $json->labels[0]->senses[0]->id;
$json =  file_get_contents("http://wikipedia-miner.cms.waikato.ac.nz/services/suggest?queryTopics=".$id."&responseFormat=json");
$json = json_decode($json);
$categories = $json->suggestionCategories;
$suggestions = array();
$weights = array();
foreach ($categories as $keyA => $categorie) {
	foreach ($categorie->suggestions as $keyB => $suggestion) {
		array_push($suggestions, $suggestion);
		array_push($weights, $suggestion->weight);
	}
}

array_multisort($weights, SORT_DESC, SORT_NUMERIC , $suggestions);

for($i = 0; $i < count($suggestions); $i++)
{
	if($suggestions[$i]->id == $suggestions[$i+1]->id)
		unset($suggestions[$i]);
}

$suggestions = array_slice (array_values($suggestions), 0, 40);


echo json_encode($suggestions);

?>