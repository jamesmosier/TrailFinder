function initializeResults() {
	// Try HTML5 geolocation
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var lat = position.coords.latitude,
				lng = position.coords.longitude,
				//lat=41.081445,lng= -81.519005,
				pos = new google.maps.LatLng(lat, lng)
				
			//query for the table
			var listQuery = "SELECT Name, Coordinates FROM " 
			+ '1MsmdOvWLKNNrtKnmoEf2djCc3Rp_gYmueN4FGnc' 
			+ ' ORDER BY ST_DISTANCE(Coordinates, LATLNG(' + lat + ',' + lng + '))' + ' LIMIT 25';
			
			var encodedQuery = encodeURIComponent(listQuery);
			
			// Construct the URL
			var url = ['https://www.googleapis.com/fusiontables/v1/query'];
			url.push('?sql=' + encodedQuery);
			url.push('&key=AIzaSyAJ_2Gtxlr4jeFuBup_jyRa5taZGk20JLs');
			url.push('&callback=?');
			
			// Send the JSONP request using jQuery
			$.ajax({
				url: url.join(''),
				dataType: 'jsonp',
				success: function(data) {
					var rows = data['rows'];
					var ftData = document.getElementById('sidebar-data');
					for (var i in rows) {
						var name = rows[i][0];
						var sidebarCoordinates = rows[i][1];
						var dataElement = document.createElement('tr');
						var nameElement = document.createElement('td');
						nameElement.innerHTML = name;
						nameElement.className = 'name-name';
						var coordinatesElement = document.createElement('td');
						coordinatesElement.innerHTML = sidebarCoordinates;
						coordinatesElement.className = 'coordinates';
						dataElement.appendChild(nameElement);
						dataElement.appendChild(coordinatesElement);
						ftData.appendChild(dataElement);
					}
				}
			});
		}, function() {
			handleNoGeolocation(true);
		});
	} else {
		// Browser doesn't support Geolocation
		handleNoGeolocation(false);
	}
}
//error handling for geolocation

function handleNoGeolocation(errorFlag) {
	if (errorFlag) {
		var content = 'Error: The Geolocation service failed.';
	} else {
		var content = 'Error: Your browser doesn\'t support geolocation.';
	}
}
google.maps.event.addDomListener(window, 'load', initializeResults);