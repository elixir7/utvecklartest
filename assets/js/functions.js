$( document ).ready(function() {

	var myLatLng;
	function getLocation() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(showPosition);
	    }
	}

	//Geolocation information grabbing
	function showPosition(position) {
		myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude}
		initMap();
	}

	function initMap() {
		element = document.getElementById('map');
		var options = {
			center: myLatLng,
			zoom: 15
		};
		var map = new google.maps.Map(element, options);

	  	var marker = new google.maps.Marker({
	    	position: myLatLng,
	    	map: map,
	    	draggable: true,
    		animation: google.maps.Animation.DROP,
	    	title: 'Hello World!'
	  	});
	  	marker.addListener('click', toggleBounce);
		console.log(myLatLng);
	}

	function toggleBounce() {
  		if (marker.getAnimation() !== null) {
    		marker.setAnimation(null);
  		} else {
    		marker.setAnimation(google.maps.Animation.BOUNCE);
  		}
	}

	$("#button").click(getLocation);



});
