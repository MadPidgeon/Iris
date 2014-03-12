<?php

include_once( "theGuardian.php" );
include_once( "newYorkTimes.php" );
include_once( "usaToday.php" );
include_once( "googleNews.php" );

class SearchParameter {
	public
		$string,
		$priority;
	function __construct( $str, $param ) {
		$this->string = $str;
		$this->priority = $param;
	}
}

class SearchRequest {
	public 
		$parameters,
		$wikiPortal,
		$wikiCategory;
	function __construct() {
		$this->parameters = array();
	}
	public function addParameter( $string, $priority = 100 ) {
		$this->parameters[] = new SearchParameter( $string, $priority );
	}
}

function postRequest( $requestObject ) {
	if( count( $requestObject->parameters ) == 0 )
		return array();
	$theGuardian = theGuardianSearch( $requestObject );
	$nyTimes = newYorkTimesSearch( $requestObject );
	$usaToday = usaTodaySearch( $requestObject );
	$googleNews = googleNewsSearch( $requestObject );
	$result = array_merge( $theGuardian, $nyTimes, $usaToday, $googleNews );
	usort( $result, "NewsResultCompare" );
	return $result;
}

?>