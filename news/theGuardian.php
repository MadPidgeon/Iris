<?php

include_once( "utility.php" );
include_once( "newsResult.php" );

class theGuardianResult {
	public 
		$id,
		$sectionId,
		$sectionName,
		$webPublicationDate,
		$webTitle,
		$webUrl,
		$apiUrl;
	function __construct( $jsonData ) {
		$this->jsonDeserialize( $jsonData );
	}
	public function jsonDeserialize( $jsonData ) {
		$this->id = $jsonData['id'];
		$this->sectionId = $jsonData['sectionId'];
		$this->sectionName = $jsonData['sectionName'];
		$this->webPublicationDate = $jsonData['webPublicationDate'];
		$this->webTitle = $jsonData['webTitle'];
		$this->webUrl = $jsonData['webUrl'];
		$this->apiUrl = $jsonData['apiUrl'];
	}
	public function castToNewsResult() {
		$result = new NewsResult;
		$result->title = $this->webTitle;
		$result->short = NULL;
		$result->image = NULL;
		$result->date = $this->webPublicationDate;
		$result->wikiPortal = NULL;
		$result->wikiCategory = NULL;
		$result->newsCategory = $this->sectionName;
		$result->website = "The Guardian";
		$result->webUrl = $this->webUrl;
		$result->apiUrl = $this->apiUrl;
		// temp
		$result->relevance = rand(1,100);
		return $result;
	}
}

function theGuardianSearch( $requestObject ) {
	$apiKey = "hp4qgwnnt2q6thdbwgy83fg8";
	$requestUrl = "http://content.guardianapis.com/search?q=" . urlencode( $requestObject->parameters[0]->string ) . "&api-key=" . $apiKey;
	$json = getJson( $requestUrl ); 
	$decoded = json_decode( $json, true );
	$classArray = array(); 
	foreach ( $decoded['response']['results'] as $guardianNews ) {
		$theGuardian = new theGuardianResult( $guardianNews );
		$classArray[] = $theGuardian->castToNewsResult();
	}
	return $classArray;
}

?>