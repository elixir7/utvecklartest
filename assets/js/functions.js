$( document ).ready(function() {
initMap();
//1. Skapa en karta OK
//2. Hitta användarens position OK
	//2.1 Sätt ut en marker på positionen OK
	//2.2 Centrera kartan över positionen OK
//3. Sätt ut en marker OK
	//3.1 Klicka för att sätta ut 
	//3.2 Visa Long och Lat som titel OK
//4. Räkna ut avståndet mellan användarens position och markören OK
	//4.1 Spara ner som en global variabel
	//4.2 Kontrollera om avståndet är mindre eller lika med 500m.
		//4.2.1 Isåfall lås rutan och visa en bild med text
		//4.2.2 Annars visa ett medelande med text "Det är inte 500m mellan dig och din markör"




function initMap() {
	//Create map object
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  });


  //Creates the myMarker marker object.
  var myMarker = new google.maps.Marker({
	  position: new google.maps.LatLng(57.488, 12.097),
	  draggable: true
	});
	
  //Event listner for when the myMarker is released, shows the long and lat of the marker and calls the getDistence method by passing in the myMarker position and the homeMarker position.
	google.maps.event.addListener(myMarker, 'dragend', function(evt){
	  document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
	  var element1 = document.getElementById('distance');
    var test = document.getElementById('test');
    var distanceBetween = getDistance(homeMarker.position, myMarker.position);
    if(distanceBetween <= 500){
      $("#test").show();
    };
		element1.innerHTML = distanceBetween + "m";
	});

  //Even listener for when dragging the myMarker, prints out that it is currently beeing dragged to the browser window
	google.maps.event.addListener(myMarker, 'dragstart', function(evt){
	    document.getElementById('current').innerHTML = '<p>Currently dragging marker...</p>';
	});

  //Adds the myMarker marker to the map
  myMarker.setMap(map);

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {

      //Creates an position object with latitude and longitude
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      //Center the map over the position
      map.setCenter(pos);

      //Creates the homeMarker marker object where the users' locaiton is
      homeMarker = new google.maps.Marker({
			  position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
			  draggable: true
			});

      //Adds the homeMarker marker to the map
			homeMarker.setMap(map);

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

//Calculates distance between two points with googles' handy "computeDistanceBetween" function
function calcDistance(p1, p2){
	//returns distance between the points with no decimals and in meters.
  return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2)).toFixed(0);
}

// Convert to radians
function rad(x) {
  return x * Math.PI / 180;
};

//Calculates distance between two points with math and physics
function getDistance(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat() - p1.lat());
  var dLong = rad(p2.lng() - p1.lng());
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d.toFixed(0); // returns the distance in meter
};


});
