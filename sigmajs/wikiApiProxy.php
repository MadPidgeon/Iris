<?php
	ini_set('display_errors', 1);
	class Term {
		public $title;
		public $size;

		function __construct($myTitle) {
			$this->title = $myTitle;
		}
	}

/*
	 $ch = curl_init("http://en.wikipedia.org/w/api.php?action=query&titles=Dynamic_DNS&prop=links&format=json&pllimit=max");
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $output = curl_exec($ch);       
    curl_close($ch);
    echo $output;
*/
    $topic = $_GET['q'];

	$json =  file_get_contents("http://en.wikipedia.org/w/api.php?action=query&titles=".$topic."&prop=links&format=json&pllimit=max");
	$json = json_decode($json);

	foreach ($json->query->pages as $key => $page) {
		$links = $page->links;
	}
	//$links = $json->query->pages->{80150}->links;
	$count = count($links);
	$terms = array();
	for( $i = 0; $i < $count ; ++$i) {
		if( strpos($links[$i]->title, 'Wikipedia') === false
		&&  strpos($links[$i]->title, 'Category') === false 
		&&  strpos($links[$i]->title, 'Help') === false 
		&&  strpos($links[$i]->title, 'Template') === false 
		&&  strpos($links[$i]->title, 'Portal') === false ) {
			$term = new Term($links[$i]->title);
			array_push($terms, $term);
		}
	}
	
	$count = count($terms);
	$requests = ceil($count/50);
	for( $i = 0; $i < $requests; ++$i) {
		//$over = $count - 50*$i;
		$requestTerms = array_slice($terms, $i * 50, 50);
		$requestTermsString = array();
		foreach ($requestTerms as $key => $term) {
			$requestTermsString[$key] = $term->title;
		}
		$requestTermsString = urlencode(join($requestTermsString, '|'));
		$lengths =  file_get_contents("http://en.wikipedia.org/w/api.php?format=json&action=query&titles=".$requestTermsString."&prop=revisions&rvprop=size");
		$lengths = json_decode($lengths);
		$pages = $lengths->query->pages;
		$j = 50*$i;
		foreach ($pages as $key => $page) {
			
			if( isset( $page->revisions) && ($page->revisions[0]->size != "null") ) {
				$terms[$j]->size = $page->revisions[0]->size;
				++$j;
			}
			else if ( isset( $page->revisions ) ) {
				unset($terms[$j]);
				++$j;
			}
			else {
				unset($terms[$j]);
				++$j;
			}
		}
	}
	echo json_encode(array_values($terms));

?>