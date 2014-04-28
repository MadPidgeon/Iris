<?php
include_once( "twitterRequest.php" );

// Error function
function fail( $str ) {
	echo "[{error: " . $str . "}]";
	die();
}

// Get number of parameters
if( !array_key_exists( "par", $_GET ) )
	fail( "No par found!" );
$parameter = (int) $_GET[ "par" ];
if( $parameter < 1 )
	fail( "Illegal par!" );

// Get search request parameters
$array = array();
for( $i = 0; $i < $parameter; $i += 1 ) {
	if( array_key_exists( "q" . $i, $_GET ) ) {
		$array[] = urlencode( $_GET[ "q" . $i ] );
	} else
		fail( "Invalid number of parameters!" );
}

// Request data
$request = new tweetRequest( $array );
requestTweets( $request );

?>