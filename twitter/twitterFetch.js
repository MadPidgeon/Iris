<!--

function tweetSpecialSplit( strin ) {
	var index = strin.search( /[^\w#@]/i );
	if( index != -1 ) {
		return [ strin.slice( 0, index ), strin.slice( index ) ];
	} else
		return [strin,''];
}

function tweetParse( strin ) {
	var strout = "";
	var last = 0;
	var spec;

	strin = strin.replace( /http.*?t\.co\/[\w]*/g, "" );
	for( var i = 0; i < strin.length; i += 1 ) {
		if( strin[i] == '#' || strin[i] == '@' ) {
			strout += strin.substring( last, i );
			last = i;
			for( i += 1 ; i < strin.length; i += 1 ) {
				if( /[\W]/.test( strin[i] ) )
					break;
			}
			spec = strin.substring( last + 1, i );
			if( strin[last] == '@' )
				strout += "<b><a class=\"twitterHashtag\" target=\"_blank\" href=\"https://twitter.com/" + spec + "\">@" + spec + "</a></b>";
			else
				strout += "<b><a class=\"twitterHandle\" target=\"_blank\" href=\"https://twitter.com/search?q=" + encodeURIComponent( '#' + spec ) + "&src=tren\">#" + spec  + "</a></b>";
			last = i;
		}
	}
	strout += strin.substring( last, strin.length );

	return strout;
}

function addTweetDiv( handle, handleUrl, text, image ) {
	// Generate content
	var divString = "<div class=\"twitterItem\">"
	divString += "<div class=\"twitterMainHandle txcolor1\"><a href=\"" + handleUrl + "\" target=\"_blank\">" + handle + "</a></div>";
	divString += "<div class=\"twitterText txcolor2\">" + tweetParse( text ) + "</div>";
	divString += "</div>"

	// Place content
	$( divString ).appendTo( "#twitterContent" );
}

function updateTwitter( search, number ) {
	// Make fetch url
	var fetchUrl = "twitter/twitterFetch.php?num=" + number + "&par=" + search.length;
	for( i = 0; i < search.length; i += 1 ) {
		fetchUrl += "&q" + i + "=" + encodeURIComponent( search[i] );
	}

	// Clean results
	$('#twitterContent').addClass('csspinner').addClass('traditional');
	$("#twitterContent").empty();

	// Get the JSON data
	$.getJSON( fetchUrl , function( data ) {

		// Handle data
		if( "statuses" in data ) {
			if( data.statuses.length != 0 ) {
				for( var i = 0; i < data.statuses.length; i += 1 ) {
					addTweetDiv( data.statuses[i].user.name,
						"https://twitter.com/" + data.statuses[i].user.screen_name,
						data.statuses[i].text,
						data.statuses[i].user.profile_image_url
					);
				}
			} else {
				addTweetDiv( "Whoops!", "http://www.newsbyiris.com", "There are no tweets matching your query.", undefined );
			}
		} else {
			addTweetDiv( "Whoops!", "http://www.newsbyiris.com", "Twitter is tweeting us gibberish.", undefined );
		}
		$(".txcolor2 a").css({ 'color' : globalLightColor });
    	$(".txcolor1 a").css({ 'color' : globalDarkColor });
		$('#twitterContent').removeClass('csspinner').removeClass('traditional');
	}).fail(function(jqXHR, status, error) {
    	if( status == 'parseerror' ){
        	addTweetDiv( "Whoops!", "http://www.newsbyiris.com", "Twitter is tweeting us gibberish.", undefined );
    	} else {
        	addTweetDiv( "Whoops!", "http://www.newsbyiris.com", "We encountered an unknown error.", undefined );
    	}
    	$('#twitterContent').removeClass('csspinner').removeClass('traditional');
	});
}

-->
