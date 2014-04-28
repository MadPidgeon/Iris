<?php

include_once( "newsRequest.php" );

// change $_GET to $_POST

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
$request = new searchRequest;
for( $i = 0; $i < $parameter; $i = $i + 1 ) {
	if( array_key_exists( "q" . $i, $_GET ) and array_key_exists( "r" . $i, $_GET ) ) {
		$request->addParameter( $_GET[ "q" . $i ], (int) $_GET[ "r" . $i ] );
	}
	else
		fail( "No q# and i# found!" );
}

// Get number of results to return (default = 10)
$number = 10;
if( array_key_exists( "num", $_GET ) )
	$number = (int) $_GET[ "num" ];

// Fetch data
$data = postRequest( $request, $number );

// Echo joson data
echo json_encode( $data );

?>