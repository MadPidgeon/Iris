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
		$result->title = mb_convert_encoding( $this->webTitle, "HTML-ENTITIES", "UTF-8" );
		$result->short = NULL;
		$result->image = NULL;
		$result->date = makeIRISDate( getISODate( $this->webPublicationDate ) );
		$result->wikiPortal = NULL;
		$result->wikiCategory = NULL;
		$result->newsCategory = mb_convert_encoding( $this->sectionName, "HTML-ENTITIES", "UTF-8" );
		$result->website = "The Guardian";
		$result->webUrl = mb_convert_encoding( $this->webUrl, "HTML-ENTITIES", "UTF-8" );
		$result->apiUrl = mb_convert_encoding( $this->apiUrl, "HTML-ENTITIES", "UTF-8" );
		$result->relevance = getISODate( $this->webPublicationDate );
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