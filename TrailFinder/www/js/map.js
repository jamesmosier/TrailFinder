// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
	alert('onDeviceReady');
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

window.onerror = function(message, url, lineNumber) {
        alert("Error: "+message+" in "+url+" at line "+lineNumber);
    }

var map;

function onSuccess(position) {

	//alert('inside the onSuccess function');
	
	if(window.google === undefined) {
        alert("Google Maps didn't load!");
    }
	
	
	var mapOptions = {
		zoom: 9,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	
	
	map = new google.maps.Map(document.getElementById('map'), mapOptions);
	// Try HTML5 geolocation
	if (navigator.geolocation) {
		alert('i am in the if statement');
		navigator.geolocation.getCurrentPosition(function(position) {
			alert('i am in the getcurrentpos function');
			var lat = position.coords.latitude,
				lng = position.coords.longitude,
				//lat=41.081445,lng= -81.519005,
				pos = new google.maps.LatLng(lat, lng),
				//query from FusionTables for the map
				map_query = {
					select: 'Location',
					from: '1MsmdOvWLKNNrtKnmoEf2djCc3Rp_gYmueN4FGnc',
					limit: 3,
					orderBy: 'ST_DISTANCE(Coordinates, LATLNG(' + lat + ',' + lng + '))'
				},
				ftLayer = new google.maps.FusionTablesLayer({
					map: map,
					query: map_query
				}),
				geolocMarker = new google.maps.Marker({
					map: map,
					position: pos,
					clickable: true,
					icon: 'http://labs.google.com/ridefinder/images/mm_20_green.png'
				});
			geolocMarker.info = new google.maps.InfoWindow({
				content: '<span style="font-weight: bold;" class="users-location-marker">Your location</span>'
			});
			google.maps.event.addListener(geolocMarker, 'click', function() {
				geolocMarker.info.open(map, geolocMarker);
			});
			
			map.setCenter(pos);
			
		
			
			//query for the table
			var listQuery = "SELECT Name, Coordinates FROM " 
			+ '1MsmdOvWLKNNrtKnmoEf2djCc3Rp_gYmueN4FGnc' 
			+ ' ORDER BY ST_DISTANCE(Coordinates, LATLNG(' + lat + ',' + lng + '))' 
			+ ' LIMIT 3';
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
// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}




/*
function handleNoGeolocation(errorFlag) {
	if (errorFlag) {
		var content = 'Error: The Geolocation service failed.';
	} else {
		var content = 'Error: Your browser doesn\'t support geolocation.';
	}
	var options = {
		map: map,
		position: new google.maps.LatLng(41.081445, -81.519005),
		content: content
	};
	var infowindow = new google.maps.InfoWindow(options);
	map.setCenter(options.position);
}
*/



google.maps.event.addDomListener(window, 'load', onSuccess(position));