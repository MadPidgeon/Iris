<?php

include_once( "theGuardian.php" );
include_once( "newYorkTimes.php" );
include_once( "usaToday.php" );
include_once( "googleNews.php" );

class searchParameter {
	public
		$string,
		$priority;
	function __construct( $str, $param ) {
		$this->string = $str;
		$this->priority = $param;
	}
}

class searchRequest {
	public 
		$parameters,
		$wikiPortal,
		$wikiCategory;
	function __construct() {
		$this->parameters = array();
	}
	public function addParameter( $string, $priority = 100 ) {
		$this->parameters[] = new searchParameter( $string, $priority );
	}
}

function postRequest( $requestObject, $numberOfResults ) {
	if( count( $requestObject->parameters ) == 0 )
		return array();
	$theGuardian = theGuardianSearch( $requestObject );
	$nyTimes = newYorkTimesSearch( $requestObject );
	$usaToday = usaTodaySearch( $requestObject );
	$googleNews = googleNewsSearch( $requestObject );
	$result =  array_merge( $theGuardian, $nyTimes, $usaToday, $googleNews );
	usort( $result, "NewsResultCompare" );
	return array_slice( $result, 0, $numberOfResults, true );
}

?>