<?php

import "utility.php";
import "newsResult.php";

class newYorkTimesResult {
	public 
		$id
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
	public function jsonDeserialize( $jsonData ) {
		$id = $jsonData['_id'];
		$web_url = $jsonData['web_url'];
		$snippet = $jsonData['snippet'];
		$lead_paragraph = $jsonData['lead_paragraph'];
		$abstract = $jsonData['abstract'];
		$source = $jsonData['source'];
		$headline = $jsonData['headline']['main'];
		$section_name = $jsonData['section_name'];
		$image = $jsonData['multimedia']['url'];
		$image_thumbnail = $jsonData['multimedia']['legacy']['thumbnail'];
		$date = $jsonData['pub_date'];
	}
	public function castToNewsResult() {
		$result = new NewsResult;
		$result->title = $this->headline;
		$result->short = $this->snippet;
		$result->image = $this->image_thumbnail;
		$result->date = $this->date;
		$result->wikiPortal = NULL;
		$result->wikiCategory = NULL;
		$result->newsCategory = $this->section_name;
		$result->website = $this->source;
		$result->webUrl = $this->web_url;
		$result->apiUrl = NULL;
		$result->relevance = 100;
		return result;
	}
}

function newYorkTimesSearch( $requestObject ) {
	$apiKey = "10be8996b9ceb01021004bd54c663ce5:4:68911726";
	$requestUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" . urlencode( $requestObject->parameters[0]->string ) . "&api-key=" . $apiKey;
	$json = getJson( $requestUrl );
	$decoded = json_decode( $json );
	// temp
	var_dump( $decoded );
	// temp
	$classArray = [];
	foreach ( $decoded['results'] as $nytimesNews ) {
		$nytimes = new newYorkTimesResult( $nytimesNews );
		array_push( $classArray, $nytimes.castToNewsResult() );
	}
	return $classArray;
}

?>