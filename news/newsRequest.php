<?php

import "theGuardian.php";
import "newYorkTimes.php";

class SearchParameter {
	public
		$string,
		$priority;
	function __construct( $str, $param ) {
		$string = $str;
		$priority = $param;
	}
}

class SearchRequest {
	public 
		$parameters,
		$wikiPortal,
		$wikiCategory;
	public function addParameter( $string, $priority = 100 ) {
		$parameters[] = new SearchParameter( $string, $priority );
	}
}

function postRequest( $requestObject ) {
	$theGuardian = theGuardianSearch( $requestObject );
	$nyTimes = newYorkTimesSearch( $requestObject );
	$result = array_merge( $theGuardian, $nyTimes );
	asort( $result, "NewsResultCompare" );
	return result;
}

?>