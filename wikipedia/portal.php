<?php

class Portal implements JsonSerializable{
	public 
		$name,
		$index
	public function jsonSerialize() {
		return array( 'name' : $this->name, 'index' : $this->index );
	}
}

function getPortal( $category ) {
	$mysqli = new mysqli( "164.138.25.134", "iris_portalBot", "bxCvj1rw", "iris_data" );
	if ($mysqli->connect_errno)
    	echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	$statement = mysqli->prepare( "SELECT P.id, P.title FROM wikiPortal P WHERE P.id IN ( SELECT C.portal FROM wikiCategory C WHERE C.name = $category )" );
	$statement->bind_param("s", $category);
	$statement->execute();
	$result = $statement->get_result();
	$row = $result->mysqli_fetch_array( MYSQLI_NUM );
	$portal = new Portal;
	if( $row !== FALSE ) {
		$portal->index = $row[0];
		$portal->name = $row[1];
	} else {
		$portal->index = 0;
		$portal->name = "Unknown";
	}
	$statement->close();
	$mysqli->close();
	return $portal;
}


?>