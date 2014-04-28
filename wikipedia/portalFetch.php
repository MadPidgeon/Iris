<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include_once( "portal.php" );

// Error function
function fail( $str ) {
	echo "[{ error: " . $str . "}]";
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