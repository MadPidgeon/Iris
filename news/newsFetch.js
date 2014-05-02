<!--

function getTextHeight( str ) {
    return $("#strLengthTest").html( str ).height();
}

function getTitleHeight( str ) {
	return $("#ttlLengthTest").html( str ).height();
}

var supportedImageFormats = [ ".jpg", ".jpeg", ".bmp", ".png", ".gif", ".tiff", ".xbm" ];

function endsWith( str, suffix ) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function addNewsDiv( title, content, image, date, wikiPortal, wikiCategory, newsCategory, website, webUrl, apiUrl, relevance ) {
	// Variables
	var contentString, divSize, contentHeight, titleHeight;

	// Generate content
	if( website != undefined && website != "" && webUrl != undefined )
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
	if( title !== undefined ) {
		divString += "<div class=\"txcolor1 newsTitle " + ( titleHeight > 20 ? "newsLarge" : "newsSmall" ) + "\">";
		divString += "<a href=\""+webUrl+"\" target=\"_blank\" >";
		divString += title;
		divString += "</a>";
	}
	divString += "</div><div class=\"txcolor2 newsShort\">";
	if( image != undefined && image != "" ) {
		for( var i = 0; i < supportedImageFormats.length; ++i ) {
			if( endsWith( image, supportedImageFormats[i] ) ) {
				divString += "<div class=\"newsImage\"><img src=\"" + encodeURI( image ) + "\" width=\"64\" height=\"64\"/></div>";
				break;
			}
		}
	}
		
	divString += contentString;
	divString += "</div></div>";
	$( divString ).appendTo( "#newsContent" );
}

function updateNews( searchNames, searchRelevance, numberOfResults ) {
	// Validate input
	if( numberOfResults == undefined )
		numberOfResults = 10;

	// Prepare fetch
	var numberOfParameters = searchNames.length;
	var fetchUrl = "news/newsFetch.php?num=" + numberOfResults + "&par=" + numberOfParameters;
	for( i = 0; i < numberOfParameters; i += 1 ) {
		fetchUrl += "&q" + i + "=" + encodeURIComponent( searchNames[i] ) + "&r" + i + "=";
		if( searchRelevance == undefined || searchRelevance.length < i )
			fetchUrl += 100;
		else
			fetchUrl += searchRelevance[i];
	}

	// Clean results
	$('#newsContent').addClass('csspinner').addClass('traditional');
	$("#newsContent").empty();

	// Fetch
	$.getJSON( fetchUrl , function( data ) {
		console.log( data );
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

		$(".txcolor2 a").css({ 'color' : globalLightColor });
   		$(".txcolor1 a").css({ 'color' : globalDarkColor });

		$('#newsContent').removeClass('csspinner').removeClass('traditional');
	}).fail(function(jqXHR, status, error) {
    	if(status == 'parseerror'){
        	addNewsDiv( "Whoops!", "JSON Parse Error.", undefined, undefined, 
				undefined, undefined, undefined, "News by Iris", "http://www.newsbyiris.com", undefined, undefined );
    	} else {
        	addNewsDiv( "Whoops!", "JQuery Error.", undefined, undefined, 
				undefined, undefined, undefined, "News by Iris", "http://www.newsbyiris.com", undefined, undefined );
    	}
    	$('#newsContent').removeClass('csspinner').removeClass('traditional');
	});
}

-->