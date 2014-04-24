<!--

/*function updateTwitter( search ) {
	str = "<a class=\"twitter-timeline\" data-dnt=\"true\" href=\"https://twitter.com/search?q=" + search +  "\" data-widget-id=\"456834732156657664\">Tweets over \"@" + search +  "\"</a> <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\"://platform.twitter.com/widgets.js\";fjs.parentNode.insertBefore(js,fjs);}}(document,\"script\",\"twitter-wjs\");</script>";
	$("#twitterContent").empty();
	$( str ).appendTo("#twitterContent");
}*/

function tweetSpecialSplit( strin ) {
	var index = strin.search( /[^\w\d_#@]/i );
	if( index != -1 ) {
		return [ strin.slice( 0, index ), strin.slice( index ) ];
	} else
		return [strin,''];
}

function tweetParse( strin ) {
	var strarr = strin.split( " " );
	var strout = "";
	var splt;
	for( var i = 0; i < strarr.length; i += 1 ) {
		if( strarr[i].length > 0 ) {
			if( strarr[i][0].search( /[^\w\d_]*@/i ) != -1 ) {
				splt = tweetSpecialSplit( strarr[i] );
				strout += "<b><a class=\"twitterHashtag\" target=\"_blank\" href=\"https://twitter.com/" + splt[0].slice(1) + "\">" + splt[0] + "</a></b>" + splt[1] + " ";
			} else if( strarr[i][0].search( /[^\w\d_]*#/i ) != -1 ) {
				splt = tweetSpecialSplit( strarr[i] );
				strout += "<b><a class=\"twitterHandle\" target=\"_blank\" href=\"https://twitter.com/search?q=" + encodeURIComponent( splt[0] ) + "&src=tren\">" + splt[0] + "</a></b>" + splt[1] + " ";
			} else if( strarr[i].indexOf( "://t.co" ) == -1 )
				strout += strarr[i] + " ";
		}
	}
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

	// Get the JSON data
	$.getJSON( fetchUrl , function( data ) {
		// Clean results
		$("#twitterContent").empty();
		console.log( data );

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
	}).fail(function(jqXHR, status, error) {
    	if( status == 'parseerror' ){
        	addTweetDiv( "Error", "JSON parse error!" );
    	} else {
        	addTweetDiv( "Error", "JQuery error!" );
    	}
	});
}

-->

