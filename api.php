<?php
	require "FilmsRestService.php";

	// All requests to the web service are routed through this script.
	// See the explanation in RestService.php for how the requests are 
	// mapped. 

	$service = new FilmsRestService();
	$service->handleRawRequest();
?>
