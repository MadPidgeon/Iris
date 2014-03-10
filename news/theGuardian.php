<?php

import "utility.php";
import "newsResult.php";

class theGuardianResult {
	public 
		$id,
		$sectionId,
		$sectionName,
		$webPublicationDate,
		$webTitle,
		$webUrl,
		$apiUrl;
	public function jsonDeserialize( $jsonData ) {
		$id = $jsonData['id'];
		$sectionId = $jsonData['sectionId'];
		$sectionName = $jsonData['sectionName'];
		$webPublicationDate = $jsonData['webPublicationDate'];
		$webTitle = $jsonData['webTitle'];
		$webUrl = $jsonData['webUrl'];
		$apiUrl = $jsonData['apiUrl'];
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
		$result->website = "http://www.theguardian.com";
		$result->webUrl = $webUrl;
		$result->apiUrl = $apiUrl;
		$result->relevance = 100;
		return result;
	}
}

function theGuardianSearch( $requestObject ) {
	$apiKey = "hp4qgwnnt2q6thdbwgy83fg8";
	$requestUrl = "http://content.guardianapis.com/search?q=" . urlencode( $requestObject->parameters[0]->string ) . "&api-key=" . $apiKey;
	$json = getJson( $requestUrl ); 
	$decoded = json_decode( $json );
	// temp
	var_dump( $decoded );
	// temp
	$classArray = [];
	foreach ( $decoded['results'] as $guardianNews ) {
		$theGuardian = new theGuardianResult( $guardianNews );
		array_push( $classArray, $theGuardian.castToNewsResult() );
	}
	return $classArray;
}

?>