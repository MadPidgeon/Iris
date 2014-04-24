
/* this function is called on a search or topic change */
function searchAction( topic ) {
	updateNews( Array(topic), undefined, 40, Math.floor( Math.random() * 14 ) );
    updateTwitter( Array(topic), 10 );
}