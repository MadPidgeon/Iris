<?php

function getPortal( $category ) {
	$mysqli = new mysqli( "localhost", "iris_portalBot", "PJK1KXi3", "iris_data" );
	if ($mysqli->connect_errno)
    	echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	$statement = $mysqli->prepare( "SELECT P.id, P.title FROM wikiPortal P WHERE P.id IN ( SELECT C.portal FROM wikiCategory C WHERE C.name = ? )" );
	$statement->bind_param("s", $category);
	$statement->execute();
	$statement->bind_result( $index, $name );
	if( !$statement->fetch() ) {
		$index = -1;
		$name = "Unknown";
	}
	$statement->close();
	$mysqli->close();
	return array( 'name' => $name, 'index' => $index );
}

?>