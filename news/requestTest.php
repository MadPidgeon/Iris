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
			$requestObject->addParameter( "Russia" );

			$results = postRequest( $requestObject );

			foreach ( $results as $result ) {
				echo "<h3>" . $result->title . "</h3>";
				echo "<p>" . $result->short . "</p>";
				echo "<p>" . $result->website . "</p>";
			}
		?>
	</div>
</body>
</html>