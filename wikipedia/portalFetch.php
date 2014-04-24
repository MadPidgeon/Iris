<?php

include_once( "portal.php" );

// change $_GET to $_POST

// Error function
function fail( $str ) {
	echo "FAIL: " . $str ;
	die();
}

// Get category
if( !array_key_exists( "category", $_GET ) )
	fail( "No category found!" );

// Find portal
$portal = getPortal( $_GET["category"] );

// Echo results
echo json_encode( $portal );

?>