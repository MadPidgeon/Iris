<!--

function getTextHeight( str ) {
    return $("#strLengthTest").html( str ).height();
}

function getTitleHeight( str ) {
	return $("#ttlLengthTest").html( str ).height();
}

function addNewsDiv( title, content, image, date, wikiPortal, wikiCategory, newsCategory, website, webUrl, apiUrl, relevance ) {
	// Generate content
	if( website != undefined && website != "" )
		contentString = "<a href=\"" + webUrl + "\"><b>" + website + "</b></a> ";
	if( content != undefined )
		contentString += content;

	// Calculate size
	divSize = 0;
	contentHeight = getTextHeight( contentString );
	titleHeight = getTitleHeight( title );
	if( contentHeight + titleHeight > 52 || ( image != undefined && image != "" ) ) 
		divSize = 1;

	// Create divs
	divString = "<div class=\"bgcolor1 newsItem " + ( divSize ? "newsLarge" : "newsSmall"  ) + "\">";
	divString += "<div class=\"txcolor1 newsTitle " + ( titleHeight > 20 ? "newsLarge" : "newsSmall" ) + "\">"
	divString += title;
	divString += "</div><div class=\"txcolor2 newsShort\">";
	if( image != undefined && image != "" )
		divString += "<div class=\"newsImage\"><img src=\"" + encodeURI( image ) + "\" width=\"64\" height=\"64\"/></div>";
	divString += contentString;
	divString += "</div></div>";
	$( divString ).appendTo( "#newsContent" );
}

function updateNews( searchNames, searchRelevance, numberOfResults, newColors ) {
	// Validate input
	if( numberOfResults == undefined )
		numberOfResults = 10;

	// Prepare fetch
	numberOfParameters = searchNames.length;
	fetchUrl = "news/newsFetch.php?num=" + numberOfResults + "&par=" + numberOfParameters;
	for( i = 0; i < numberOfParameters; i += 1 ) {
		fetchUrl += "&q" + i + "=" + encodeURIComponent( searchNames[i] ) + "&r" + i + "=";
		if( searchRelevance == undefined || searchRelevance.length < i )
			fetchUrl += 100;
		else
			fetchUrl += searchRelevance[i];
	}

	// Fetch
	$.getJSON( fetchUrl , function( data ) {
		// Clean results
		$("#newsContent").empty();
		console.log( data );

		// Handle fetched data
		if( data.length == numberOfResults ) {
			for( i = 0; i < numberOfResults; i += 1 ) {
				addNewsDiv( data[i].title, data[i].short, data[i].image, data[i].date, 
					data[i].wikiPortal, data[i].wikiCategory, data[i].newsCategory, 
					data[i].website, data[i].webUrl, data[i].apiUrl, data[i].relevance );
			}
		} else {
			addNewsDiv( "Error", "Illegal data!" );
		}

		// Update colors
		setColors( newColors );
	}).fail(function(jqXHR, status, error) {
    	if(status == 'parseerror'){
        	addNewsDiv( "Error", "JSON parse error!" );
    	} else {
        	addNewsDiv( "Error", "JQuery error!" );
    	}
	});
}

function testNews() { 
	updateNews( Array('Ukraine'), undefined, 40, Math.floor( Math.random() * 14 ) ); 
}

-->