<?php

include_once( "utility.php" );
include_once( "newsResult.php" );

class usaTodayResult {
	public 
		$description,
		$webUrl,
		$date,
		$title;
	function __construct( $jsonData ) {
		$this->jsonDeserialize( $jsonData );
	}
	public function jsonDeserialize( $jsonData ) {
		$this->description = $jsonData['description'];
		$this->webUrl = $jsonData['link'];
		$this->date = $jsonData['pubDate'];
		$this->title = $jsonData['title'];
	}
	public function castToNewsResult() {
		$result = new NewsResult;
		$result->title = mb_convert_encoding( $this->title, "HTML-ENTITIES", "UTF-8" );
		$result->short = mb_convert_encoding( $this->description, "HTML-ENTITIES", "UTF-8" );
		$result->image = NULL;
		$result->date = $this->date;
		$result->wikiPortal = NULL;
		$result->wikiCategory = NULL;
		$result->newsCategory = NULL;
		$result->website = "USA Today";
		$result->webUrl = mb_convert_encoding( $this->webUrl, "HTML-ENTITIES", "UTF-8" );
		$result->apiUrl = NULL;
		// temp
		$result->relevance = rand(1,100);
		return $result;
	}
}

// http://api.usatoday.com/open/articles?keyword=Russia&encoding="json"&api_key=tmyembadp9bed9wbud724htz

function usaTodaySearch( $requestObject ) {
	$apiKey = "tmyembadp9bed9wbud724htz";
	$requestUrl = "http://api.usatoday.com/open/articles?keyword=" . urlencode( $requestObject->parameters[0]->string ) . "&encoding=json&api_key=" . $apiKey;
	$json = getJson( $requestUrl ); 
	$decoded = json_decode( $json, true );
	$classArray = array(); 
	if( !is_array($decoded) or !array_key_exists( 'stories', $decoded ) )
		return $classArray;
	foreach ( $decoded['stories'] as $usaTodayNews ) {
		$usaToday = new usaTodayResult( $usaTodayNews );
		$classArray[] = $usaToday->castToNewsResult();
	}
	return $classArray;
}

?>