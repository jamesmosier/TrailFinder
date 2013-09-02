function initializeSideBar() {
	var query = "SELECT 'Name', Coordinates FROM " + '1MsmdOvWLKNNrtKnmoEf2djCc3Rp_gYmueN4FGnc' + " LIMIT 3";
	var encodedQuery = encodeURIComponent(query);
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
				var coordinates = rows[i][1];
				var dataElement = document.createElement('tr');
				
				var nameElement = document.createElement('td');
				nameElement.innerHTML = name;
				nameElement.className = 'name-name';
				
				var coordinatesElement = document.createElement('td');
				coordinatesElement.innerHTML = coordinates;
				coordinatesElement.className = 'coordinates';
				
				dataElement.appendChild(nameElement);
				dataElement.appendChild(coordinatesElement);
				ftData.appendChild(dataElement);
			}
		}
	});
}