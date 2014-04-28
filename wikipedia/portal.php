<?php

function getPortal( $category ) {
	$mysqli = new mysqli( "164.138.25.134", "iris_portalBot", "bxCvj1rw", "iris_data" );
	if ($mysqli->connect_errno)
    	echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	$statement = $mysqli->prepare( "SELECT P.id, P.title FROM wikiPortal P WHERE P.id IN ( SELECT C.portal FROM wikiCategory C WHERE C.name = ? )" );
	$statement->bind_param("s", $category);
	$statement->execute();
	$statement->bind_result( $id, $name );
	$portal = new Portal;
	if( !$statement->fetch() ) {
		$index = 0;
		$portal->name = "Unknown";
	}
	$statement->close();
	$mysqli->close();
	return array( 'name' => $name, 'index' => $index );
}

?>