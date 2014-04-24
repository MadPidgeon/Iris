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
		contentString = "<a href=\"" + webUrl + "\" target=\"_blank\" ><b>" + website + "</b></a> ";
	if( content != undefined )
		contentString += content;

	// Calculate size
	divSize = 0;
	contentHeight = getTextHeight( contentString );
	titleHeight = getTitleHeight( title );
	if( contentHeight + titleHeight > 52 || ( image != undefined && image != "" ) ) 
		divSize = 1;

	// Create divs
	divString = "<div class=\" newsItem " + ( divSize ? "newsLarge" : "newsSmall"  ) + "\">";
	divString += "<div class=\"txcolor1 newsTitle " + ( titleHeight > 20 ? "newsLarge" : "newsSmall" ) + "\">";
	divString += "<a href=\""+webUrl+"\" target=\"_blank\" >";
	divString += title;
	divString += "</a>";
	divString += "</div><div class=\"txcolor2 newsShort\">";
	if( image != undefined && image != "" )
		divString += "<div class=\"newsImage\"><img src=\"" + encodeURI( image ) + "\" width=\"64\" height=\"64\"/></div>";
	divString += contentString;
	divString += "</div></div>";
	$( divString ).appendTo( "#newsContent" );
}

function updateNews( searchNames, searchRelevance, numberOfResults, newColors ) {
	$('#newsContent').addClass('csspinner').addClass('traditional');


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

		// Handle fetched data
		if( data.length != 0 ) {
			for( i = 0; i < Math.min(numberOfResults, data.length); i += 1 ) {
				addNewsDiv( data[i].title, data[i].short, data[i].image, data[i].date, 
					data[i].wikiPortal, data[i].wikiCategory, data[i].newsCategory, 
					data[i].website, data[i].webUrl, data[i].apiUrl, data[i].relevance );
			}
		} else {
			addNewsDiv( "Whoops!", "There are no articles matching your query.", undefined, undefined, 
				undefined, undefined, undefined, "News by Iris", "http://www.newsbyiris.com", undefined, undefined );
		}

		// Update colors
		setColors( newColors );
		$('#newsContent').removeClass('csspinner').removeClass('traditional');
	}).fail(function(jqXHR, status, error) {
    	if(status == 'parseerror'){
        	addNewsDiv( "Error", "JSON parse error!" );
    	} else {
        	addNewsDiv( "Error", "JQuery error!" );
    	}
    	$('#newsContent').removeClass('csspinner').removeClass('traditional');
	});
}

-->