<?php

include_once( "utility.php" );
include_once( "newsResult.php" );

class googleNewsResult {
	public 
		$title,
		$date,
		$url,
		$description,
		$site,
		$image;
	function __construct( $jsonData ) {
		$this->jsonDeserialize( $jsonData );
	}
	public function jsonDeserialize( $xml ) {
		$titleStr = $xml->title->__toString();
		$pos = strrpos ( $titleStr, '-' );
		$this->title = substr( $titleStr , 0, $pos - 1 );
		$this->site = substr( $titleStr , $pos + 2, strlen( $titleStr ) - $pos - 2 );
		$this->date = $xml->pubDate->__toString();
		$this->url = $xml->link->__toString();

		$descString = $xml->description->__toString();
		$start = strpos( $descString, '"', strpos( $descString, '<img' ) ) ;
		$end = strpos( $descString, '"', $start + 1 );
		$this->image = substr( $descString, $start + 1, $end - $start );

		$matches = array();
		$start = strpos( $descString, '<br', strpos( $descString, '<br', strpos( $descString, '<br', strpos( $descString, 'td>' ) ) + 1 ) + 1 );
		$end = strpos( $descString, '<br', $start + 1 );
		for( $i = $start; $i < $end; $i = $i + 1 ) {
			if( $descString[$i] == '>' ) {
				$j = $i;
				for( $i = $i + 1 ; $i < strlen( $descString ); $i = $i + 1 ) {
					if( $descString[$i] == '<' ) {
						if( $i - $j > 1 )
							$matches[] = substr( $descString, $j + 1, $i - $j - 1 );
						break;
					}
				}
			}
		}
		$this->description = implode( $matches, "" );
	}
	public function castToNewsResult() {
		$result = new NewsResult;
		$result->title = mb_convert_encoding( $this->title, "HTML-ENTITIES", "UTF-8" );
		$result->short = mb_convert_encoding( $this->description, "HTML-ENTITIES", "UTF-8" );
		$result->image = $this->image;
		$result->date = $this->date;
		$result->wikiPortal = NULL;
		$result->wikiCategory = NULL;
		$result->newsCategory = NULL;
		$result->website =  $this->site . " through Google News";
		$result->webUrl = $this->url;
		$result->apiUrl = NULL;
		// temp
		$result->relevance = rand(1,100);
		return $result;
	}
}

function googleNewsSearch( $requestObject ) {
	$requestUrl = "https://news.google.com/news/feeds?q=" . urlencode( $requestObject->parameters[0]->string ) . "&output=rss";
	$decoded = simplexml_load_file( $requestUrl );
	$classArray = array();
	foreach ( $decoded->channel->item as $googleNews ) {
		$google = new googleNewsResult( $googleNews );
		$classArray[] = $google->castToNewsResult();
	}
	return $classArray;
}

?>