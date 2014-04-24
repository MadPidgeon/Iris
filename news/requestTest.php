<html>
<head>
	<title>API test</title>
</head>
<body>
	<h2>newsRequest test</h2>
	<div id = "result">
		<?php
			ini_set('display_errors', 1);
			include_once( "newsRequest.php" );

			$requestObject = new searchRequest;
			$requestObject->addParameter( "Ukraine" );

			$results = postRequest( $requestObject );

			foreach ( $results as $result ) {
				echo "<h3>" . $result->title . "</h3>";
				echo "<p>" . $result->short . "</p>";
				if( $result->image !== NULL )
					echo "<img src=\"" . $result->image . "\">";
				echo "<p><a href=\"" . $result->webUrl . "\">" . $result->website . "</a></p>";
			}
		?>
	</div>
</body>
</html>