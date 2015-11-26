$( document ).ready(function() {

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  });

  map.addListener('click', function(e) {
    placeMarker(e.latLng, map);
  });

  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      //Sets the position of the map to the position of the visitor.
      infoWindow.setPosition(pos);
      //Sets a content label
      infoWindow.setContent('Location found.');
      //Center the map over the position
      map.setCenter(pos);

    }, function() {
    	//Calls the Location Error handler
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

//Handles Errors when getting location, Example: if they don't allow geolocation to find you.
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

function placeMarker(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title: JSON.stringify(latLng)
  });
}

initMap();








/*
	//Initialize the Map
	function initMap() {

		var myLatLng;

		//Checks if Goelocation if permitted and can be handled.
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(function(position){
	        	myLatLng = {
	        		lat: position.coords.latitude, 
	        		lng: position.coords.longitude
	        	};
	        });
	    };

		element = document.getElementById('map');
		var options = {
			center: myLatLng,
			zoom: 15
		};
		var map = new google.maps.Map(element, options);

  	var marker = new google.maps.Marker({
    	position: myLatLng,
    	map: map,
    	//draggable: true,
  		//animation: google.maps.Animation.DROP,
    	title: 'Test Swag'
  	});

  	google.maps.event.addListener(map, 'click', function(event) {
		   placeMarker(event.latLng);
		});

		function placeMarker(location) {
		    var marker = new google.maps.Marker({
		        position: location, 
		        map: map
	    	});
		}	
	}

	initMap();
	*/


});
