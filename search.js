
/* this function is called on a search or topic change */
function searchAction( topic ) {
	var data = topic.replace( /\s*\(.*?\)/g, "" ).split( " " );
	updateNews( data, undefined, 40 );
    updateTwitter( data, 10 );
    updateColors( topic );
}