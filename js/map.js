var map;

function initialize() {
	var mapOptions = {
		zoom: 9,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(document.getElementById('map'), mapOptions);
	// Try HTML5 geolocation
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var lat = position.coords.latitude,
				lng = position.coords.longitude,
				//lat=41.081445,lng= -81.519005,
				pos = new google.maps.LatLng(lat, lng),
				//var foo = 'ST_DISTANCE(Coordinates, LATLNG(' + lat + ',' + lng + '))',
				//Query-layer-data STUFF
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
				content: '<b>Your location</b> '
			});
			google.maps.event.addListener(geolocMarker, 'click', function() {
				geolocMarker.info.open(map, geolocMarker);
			});
			
			map.setCenter(pos);
			
			
			
			
			//var theQuery = "SELECT 'Name', Coordinates FROM " + '1MsmdOvWLKNNrtKnmoEf2djCc3Rp_gYmueN4FGnc' + ' LIMIT 3' +
			 //" ORDERBY ST_DISTANCE(Coordinates, LATLNG(' + lat + ',' + lng + '))";
			var listQuery = "SELECT 'Name', Coordinates FROM " + '1MsmdOvWLKNNrtKnmoEf2djCc3Rp_gYmueN4FGnc' + ' LIMIT 3';
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
	var options = {
		map: map,
		position: new google.maps.LatLng(41.081445, -81.519005),
		content: content
	};
	var infowindow = new google.maps.InfoWindow(options);
	map.setCenter(options.position);
}
google.maps.event.addDomListener(window, 'load', initialize);