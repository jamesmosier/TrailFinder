(function() {
        'use strict';
        var module = angular.module('myApp', ['onsen']);

        module.controller('MapController', function($scope, $data) {



                function GetLocations($scope, $data) {

                    var trailfinder_map;
                    var queryLimit: 3,
                        var removeData: false

                    function trailfinder_initialize() {
                        var mapOptions = {
                            zoom: 9,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        }
                        trailfinder_map = new google.maps.Map(document.getElementById('map'), mapOptions);
                        // Try HTML5 geolocation
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(function(position) {

                                //var db = window.sqlitePlugin.openDatabase({  
                                //name : "TestDB"  
                                // });  

                                var lat = position.coords.latitude,
                                    lng = position.coords.longitude,
                                    pos = new google.maps.LatLng(lat, lng),
                                    //query from FusionTables for the map
                                    map_query = {
                                        select: 'Coordinates',
                                        from: '1MsmdOvWLKNNrtKnmoEf2djCc3Rp_gYmueN4FGnc',
                                        limit: settings.queryLimit,
                                        orderBy: 'ST_DISTANCE(Coordinates, LATLNG(' + lat + ',' + lng + '))'
                                    },
                                    ftLayer = new google.maps.FusionTablesLayer({
                                        map: trailfinder_map,
                                        query: map_query
                                    }),
                                    geolocMarker = new google.maps.Marker({
                                        map: trailfinder_map,
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
                                trailfinder_map.setCenter(pos);
                                //query for the table                                    
                                var listQuery = "SELECT Name, Coordinates FROM " + '1MsmdOvWLKNNrtKnmoEf2djCc3Rp_gYmueN4FGnc' + ' ORDER BY ST_DISTANCE(Coordinates, LATLNG(' + lat + ',' + lng + '))' + ' LIMIT ' + settings.queryLimit;
                                var encodedQuery = encodeURIComponent(listQuery);
                                // Construct the URL
                                var url = ['https://www.googleapis.com/fusiontables/v1/query'];
                                url.push('?sql=' + encodedQuery);
                                url.push('&key=AIzaSyAJ_2Gtxlr4jeFuBup_jyRa5taZGk20JLs');
                                url.push('&callback=?');

                                if (settings.removeData) {
                                    $("#location-data").empty();
                                }

                                // Send the JSONP request using jQuery
                                $.ajax({
                                    url: url.join(''),
                                    dataType: 'jsonp',
                                    success: function(data) {
                                        var rows = data['rows'];
                                        var resultsTableData = document.getElementById('location-data');
                                        var locCoordinates = [];
                                        for (var rowNumber in rows) {
                                            var locationName = rows[rowNumber][0];
                                            var locationCoordinates = rows[rowNumber][1];
                                            locCoordinates.push(locationCoordinates);
                                            var dataElement = document.createElement('li');
                                            dataElement.className = "row-" + rowNumber+++" table-view-cell";
                                            var nameElement = document.createElement('p');
                                            nameElement.innerHTML = locationName;
                                            nameElement.className = 'name-name';
                                            var coordinatesElement = document.createElement('p');
                                            coordinatesElement.className = 'coordinates';
                                            var nospaceCoords = locationCoordinates.replace(/ /g, '');
                                            coordinatesElement.innerHTML = locationCoordinates;
                                            $(dataElement).append("<span class='icon icon-info trail-info-icon'></span>");


                                            //directions & favs & coords
                                            var trailInfo = document.createElement('div');
                                            trailInfo.className = 'trail-info';
                                            $(trailInfo).css('display', 'none');

                                            var directionsLink = "<div class='directions-link'><a class='btn btn-primary' href='http://maps.google.com/maps?saddr=" + lat + ',' + lng + "&daddr=" + nospaceCoords + "' target='_blank'><span class='fa icon-in-btn map-marker'></span>get directions</a></div>";
                                            var addFav = "<div class='add-fav'><span class='icon icon-star'></span><span class='icon icon-star-filled star-filled'></span><span class='add-fav-text'>add favorite</span></div>";
                                            var viewMap = "<a href='#'>Click to view a trail map</a>";
                                            $(trailInfo).append(coordinatesElement, directionsLink, addFav, viewMap);

                                            dataElement.appendChild(trailInfo);
                                            dataElement.appendChild(nameElement);
                                            //dataElement.appendChild(coordinatesElement);
                                            resultsTableData.appendChild(dataElement);
                                        }
                                        distanceMatrixCoords(locCoordinates);
                                    } //end success
                                });

                                function distanceMatrixCoords(coords) {
                                    var origins = pos;
                                    var destinations = coords;
                                    var service = new google.maps.DistanceMatrixService();

                                    service.getDistanceMatrix({
                                            origins: [origins],
                                            destinations: destinations,
                                            travelMode: google.maps.TravelMode.DRIVING,
                                            unitSystem: google.maps.UnitSystem.IMPERIAL,
                                            avoidHighways: false,
                                            avoidTolls: false
                                        },
                                        callback
                                    );

                                    function callback(response, status) {
                                        if (status == google.maps.DistanceMatrixStatus.OK) {
                                            var origins = response.originAddresses;
                                            var destinations = response.destinationAddresses;
                                            var distanceElement = [];
                                            var theRow = null;

                                            for (var i = 0; i < origins.length; i++) {
                                                var results = response.rows[i].elements;

                                                for (var j = 0; j < results.length; j++) {
                                                    var element = results[j];
                                                    var distance = element.distance.text;
                                                    var duration = element.duration.text;
                                                    var from = origins[i];
                                                    var to = destinations[j];

                                                    distanceElement[j] = document.createElement('p');
                                                    distanceElement[j].innerHTML = results[j].distance.text + " - " + results[j].duration.text + " away";
                                                    distanceElement[j].className = 'distance-cell';

                                                    theRow = document.getElementsByClassName("row-" + i++);
                                                    $(theRow).append(distanceElement[j]);

                                                }
                                            }
                                        }
                                    }

                                }

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
                        trailfinder_map.setCenter(options.position);
                    }
                    google.maps.event.addDomListener(window, 'load', trailfinder_initialize());


                }


            }






        });

})();