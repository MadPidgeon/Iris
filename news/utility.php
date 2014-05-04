<?php

function getJson( $url ) {
	$ch = curl_init();
	curl_setopt( $ch, CURLOPT_URL, $url );
	curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
	curl_setopt( $ch, CURLOPT_POST, 0 );
	$json = curl_exec( $ch );
	curl_close( $ch );
	$json = mb_convert_encoding( $json, "HTML-ENTITIES", "UTF-8" );
	return $json;
}

function getGoogleDate( $dateStr ) {
	return date_create_from_format( 'D, d M Y H:i:s e', $dateStr )->getTimestamp();
}

function getUSADate( $dateStr ) {
	return date_create_from_format( 'D, j M Y H:i:s e', $dateStr )->getTimestamp();
}

function getISODate( $dateStr ) {
	$myDate = date_create_from_format( 'Y-m-d*H:i:s*', $dateStr );
	if( $myDate )
		return $myDate->getTimestamp();
	else
		return 0;
}

function makeIRISDate( $timestamp ) {
	return date( 'Y-m-d  H:i', $timestamp );
}

?>