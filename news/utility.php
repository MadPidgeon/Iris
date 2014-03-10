<?php

function getJson( $url ) {
	$ch = curl_init();
	curl_setopt( $ch, CURLOPT_URL, $url );
	curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
	curl_setopt( $ch, CURLOPT_POST, 0 );
	$json = curl_exec( $ch );
	curl_close( $ch );
	return $json;
}

?>