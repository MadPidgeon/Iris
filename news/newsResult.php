<?php

class newsResult {
	public
		$title,
		$short,
		$image,
		$date,
		$wikiPortal,
		$wikiCategory,
		$newsCategory,
		$website,
		$webUrl,
		$apiUrl,
		$relevance;
	public function jsonSerialize() {
		$result = array(
			'title' => $this->title,
			'short' => $this->short,
			'image' => $this->image,
			'date' => $this->date,
			'wikiPortal' => $this->wikiPortal,
			'wikiCategory' => $this->wikiCategory,
			'newsCategory' => $this->newsCategory,
			'website' => $this->website,
			'webUrl' => $this->webUrl,
			'apiUrl' => $this->apiUrl,
			'relevance' => $this->relevance
		);
		return $result;
	}
}

function newsResultCompare( $a, $b ) {
	return $a->relevance > $b->relevance;
}

?>