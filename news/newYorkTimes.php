<?php

include_once( "utility.php" );
include_once( "newsResult.php" );

class newYorkTimesResult {
	public 
		$id,
		$web_url,
		$snippet,
		$lead_paragraph,
		$abstract,
		$source,
		$headline,
		$section_name,
		$image,
		$image_thumbnail,
		$date;
	function __construct( $jsonData ) {
		$this->jsonDeserialize( $jsonData );
	}
	public function jsonDeserialize( $jsonData ) {
		$this->id = $jsonData['_id'];
		$this->web_url = $jsonData['web_url'];
		$this->snippet = $jsonData['snippet'];
		$this->lead_paragraph = $jsonData['lead_paragraph'];
		$this->this->abstract = $jsonData['abstract'];
		$this->source = $jsonData['source'];
		$this->headline = $jsonData['headline']['main'];
		$this->section_name = $jsonData['section_name'];
		if( array_key_exists('multimedia', $jsonData ) and array_key_exists( 0, $jsonData['multimedia'] ) ) {
			if( array_key_exists('url', $jsonData['multimedia'][0] ) )
				$this->image = $jsonData['multimedia'][0]['url'];
			if( array_key_exists('legacy', $jsonData['multimedia'][0] ) and array_key_exists('thumbnail', $jsonData['multimedia'][0]['legacy'] ) )
				$this->image_thumbnail = $jsonData['multimedia'][0]['legacy']['thumbnail'];
		}
		$this->date = $jsonData['pub_date'];
	}
	public function castToNewsResult() {
		$result = new NewsResult;
		$result->title = $this->headline;
		$result->short = $this->snippet;
		if( $this->image_thumbnail !== NULL )
			$result->image = $this->image_thumbnail;
		else
			$result->image = $this->image;
		$result->date = $this->date;
		$result->wikiPortal = NULL;
		$result->wikiCategory = NULL;
		$result->newsCategory = $this->section_name;
		$result->website = $this->source;
		$result->webUrl = $this->web_url;
		$result->apiUrl = NULL;
		// temp
		$result->relevance = rand(1,100);
		return $result;
	}
}

function newYorkTimesSearch( $requestObject ) {
	$apiKey = "10be8996b9ceb01021004bd54c663ce5:4:68911726";
	$requestUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" . urlencode( $requestObject->parameters[0]->string ) . "&api-key=" . $apiKey;
	$json = getJson( $requestUrl );
	$decoded = json_decode( $json, true );
	$classArray = array();
	foreach ( $decoded['response']['docs'] as $nytimesNews ) {
		$nytimes = new newYorkTimesResult( $nytimesNews );
		$classArray[] = $nytimes->castToNewsResult();
	}
	return $classArray;
}

?>