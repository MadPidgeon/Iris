<?php
	class Term {
		public $id;
		public $title;
		public $weight;

		function __construct($myTitle, $id) {
			$this->title = $myTitle;
			$this->weight = 0.75;
			$this->id = $id;
		}
	}

    $topic = $_GET['q'];
    $topic = str_replace(' ', '_', $topic);

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
			$term = new Term($links[$i]->title, $i);
			array_push($terms, $term);
		}
	}

	//var_dump(shuffle($terms));
	shuffle($terms);
	
	/*
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
	*/
	if(count($terms) == 0) {
		$return = array( 'error' => 'No results',
						'errorCode' => 001 );
		echo json_encode($return);
	}
	else
		echo json_encode(array_values($terms));

?>