<?php
ini_set('display_errors', 1);
require_once('TwitterAPIExchange.php');
// API key : ORBd4yDDEN8W2NSqirAasFhZH
// API secret : WyOTx7ygPbNiEKQqBUw8OR8Zv7f54awybCqvLtZx3q5dr0pvqF
// Owner : WvanWoerden
// Owner ID : 99522139
// App-only authentication : https://api.twitter.com/oauth2/token
// Request token URL : https://api.twitter.com/oauth/request_token
// Authorize URL : https://api.twitter.com/oauth/authorize
// Access token URL : https://api.twitter.com/oauth/access_token

class tweetRequest {
	public $searchArray;
	function __construct( $arr ) {
		$this->searchArray = $arr;
	}
	function getRequestString() {
		return "\"" . implode( "\"+\"", $this->searchArray ) . "\"";
	}
}

// Function that requests tweets from twitter.
// Requires a tweetRequest object
function requestTweets( $request ) {
	// Authentication
	$settings = array(
    	'oauth_access_token' => "2449431126-RHlgUDpKkQuxoYhxZ7ij6swO15X2nvWVfduUs4n",
    	'oauth_access_token_secret' => "NDJPati3NS55Q8GBDQjfLUPZSdC8mqa1swQYyhH65nKHD",
    	'consumer_key' => "U5MDkmyCPbNdy74WIKHx2vYZE",
    	'consumer_secret' => "advZgtu4zHzCC6yGhBLs2RWJT1G5Qrnp3y2HFPP2Y8BopIwjYp"
	);

	// Specific requirements
	// TODO URL ENCODE
	$url = 'https://api.twitter.com/1.1/search/tweets.json';
	$getfield = '?q=' . $request->getRequestString() . '&lang=en&result_type=mixed&count=20';
	$requestMethod = 'GET';

	// Perform the request
	$twitter = new TwitterAPIExchange($settings);
	echo $twitter->setGetfield($getfield)->buildOauth($url, $requestMethod)->performRequest();
}


?>