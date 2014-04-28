
/* this function is called on a search or topic change */
function searchAction( topic ) {
	updateNews( Array(topic), undefined, 40 );
    updateTwitter( Array(topic), 10 );
    updateColors( topic );
}