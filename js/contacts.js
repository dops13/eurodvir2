$(function() {
	mapInit();
});

function mapInit() {
	/*
	var latlng = new google.maps.LatLng(49.8008709, 23.985986);
	var myOptions = {
		zoom: 16,
		scrollwheel: false,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("mapCanvas"), myOptions);
	setMarkers(map, places);
	*/
	
	/*Infra maps*/
	var latlng_inf = new google.maps.LatLng(49.8008709, 23.985986);
	
	var myOptionsInf = {
		zoom: 16,
		scrollwheel: false,
		center: latlng_inf,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	var lineSymbol = {
	  path: 'M 0,-1 0,1',
	  strokeOpacity: 1,
	  scale: 4
	};
	
	/*---Infra map 1*/
	var map_inf1 = new google.maps.Map(document.getElementById("mapCanvasInf1"), myOptionsInf);
	var directionsServiceInf1 = new google.maps.DirectionsService();
	var directionsDisplayInf1 = new google.maps.DirectionsRenderer({
		polylineOptions: {
			icons: [{
				icon: lineSymbol,
				offset: '0',
				repeat: '20px'
			}],
			strokeColor: "#4ab931",
			strokeOpacity: 0,
			strokeWeight: 4
		}
	});
	setMarkers(map_inf1, places_inf1);
	setDirect(map_inf1, places_inf1, directionsServiceInf1, directionsDisplayInf1, 1);
	
	/*---Infra map 2*/
	var map_inf2 = new google.maps.Map(document.getElementById("mapCanvasInf2"), myOptionsInf);
	var directionsServiceInf2 = new google.maps.DirectionsService();
	var directionsDisplayInf2 = new google.maps.DirectionsRenderer({
		polylineOptions: {
		  strokeColor: "#f49000",
		  strokeWeight: 6
		}
	});
	setMarkers(map_inf2, places_inf2);
	setDirect(map_inf2, places_inf2, directionsServiceInf2, directionsDisplayInf2, 2);
	
	/*---Infra map 3*/
	var map_inf3 = new google.maps.Map(document.getElementById("mapCanvasInf3"), myOptionsInf);
	var directionsServiceInf3 = new google.maps.DirectionsService();
	var directionsDisplayInf3 = new google.maps.DirectionsRenderer({
		polylineOptions: {
		  strokeColor: "#f49000",
		  strokeWeight: 6
		}
	});
	setMarkers(map_inf3, places_inf3);
	setDirect(map_inf3, places_inf3, directionsServiceInf3, directionsDisplayInf3, 3);
	
	/*---Infra map 4*/
	var map_inf4 = new google.maps.Map(document.getElementById("mapCanvasInf4"), myOptionsInf);
	var directionsServiceInf4 = new google.maps.DirectionsService();
	var directionsDisplayInf4 = new google.maps.DirectionsRenderer({
		polylineOptions: {
		  strokeColor: "#f49000",
		  strokeWeight: 6
		}
	});
	setMarkers(map_inf4, places_inf4);
	setDirect(map_inf4, places_inf4, directionsServiceInf4, directionsDisplayInf4, 4);
	setTimeout(function(){map_inf4.setZoom(18);}, 2000);
	
	/*---Infra map 5*/
	var map_inf5 = new google.maps.Map(document.getElementById("mapCanvasInf5"), myOptionsInf);
	var directionsServiceInf5 = new google.maps.DirectionsService();
	var directionsDisplayInf5 = new google.maps.DirectionsRenderer({
		polylineOptions: {
		  strokeColor: "#f49000",
		  strokeWeight: 6
		}
	});
	setMarkers(map_inf5, places_inf5);
	setDirect(map_inf5, places_inf5, directionsServiceInf5, directionsDisplayInf5, 5);
	setTimeout(function(){map_inf5.setZoom(18);}, 2000);
}

var places = [
	['Наш офис', 49.8008709, 23.985986, 'images/marker.png', 93, 93],
];

var places_inf1 = [
	['', 49.800873, 23.988169, 'images/marker-a.png', 101, 101],
	['', 49.800587, 23.990985, 'images/marker-b1.png', 87, 98],
];

var places_inf2 = [
	['', 49.800873, 23.988169, 'images/marker-a.png', 71, 93],
	['', 49.801925, 23.996203, 'images/marker-b2.png', 75, 97],
];

var places_inf3 = [
	['', 49.800873, 23.988169, 'images/marker-a.png', 71, 93],
	['', 49.802182, 23.992782, 'images/marker-b3.png', 75, 97],
];

var places_inf4 = [
	['', 49.800873, 23.988169, 'images/marker-a.png', 71, 93],
	['', 49.801078, 23.988736, 'images/marker-b4.png', 75, 97],
];

var places_inf5 = [
	['', 49.800873, 23.988169, 'images/marker-a.png', 71, 93],
	['', 49.801127, 23.989015, 'images/marker-b5.png', 75, 97],
];

var places_inf6 = [
	['', 49.800873, 23.988169, 'images/marker-a.png', 71, 93],
	['', 49.801078, 23.988736, 'images/marker-b4.png', 75, 97],
];

var places_inf7 = [
	['', 49.800873, 23.988169, 'images/marker-a.png', 71, 93],
	['', 49.801127, 23.989015, 'images/marker-b5.png', 75, 97],
];
 
function setMarkers(map, locations) {
	//Определяем область показа маркеров
	var latlngbounds = new google.maps.LatLngBounds();	
	  
	for (var i = 0; i < locations.length; i++) {
		var myLatLng = new google.maps.LatLng(locations[i][1], locations[i][2]);
		var image = new google.maps.MarkerImage(locations[i][3], new google.maps.Size(locations[i][4], locations[i][5]), new google.maps.Point(0,0), new google.maps.Point(locations[i][4]/2, locations[i][5]));
		//Добавляем координаты маркера в область
		latlngbounds.extend(myLatLng);
		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map, 
			icon: image,  
			title: locations[i][0],
		});
		bindInfoWindow(marker, map, locations[i][0]);
	}
	//Центрируем и масштабируем карту
	//map.setCenter( latlngbounds.getCenter(), map.fitBounds(latlngbounds));	 
};

function setDirect(map, locations, directionsService, directionsDisplay, numTab) {
    request = {
        origin: new google.maps.LatLng(locations[0][1], locations[0][2]), //точка старта
        destination: new google.maps.LatLng(locations[1][1], locations[1][2]), //точка финиша
        travelMode: google.maps.DirectionsTravelMode.DRIVING //режим прокладки маршрута
    };
	request2 = {
        origin: new google.maps.LatLng(locations[0][1], locations[0][2]), //точка старта
        destination: new google.maps.LatLng(locations[1][1], locations[1][2]), //точка финиша
        travelMode: google.maps.DirectionsTravelMode.WALKING //режим прокладки маршрута
    };
	directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
		//$('#infra-tab-'+numTab).find('.inf_dist').text(response.routes[0].legs[0].distance.value);
		//$('#infra-tab-'+numTab).find('.inf_car_dur').text(parseInt(response.routes[0].legs[0].duration.value/60));
    });
	directionsService.route(request2, function(response, status) {
		//$('#infra-tab-'+numTab).find('.inf_walk_dur').text(parseInt(response.routes[0].legs[0].duration.value/60));
    });
    directionsDisplay.setMap(map);
	directionsDisplay.setOptions({suppressMarkers: true});
}

function bindInfoWindow(marker, map, desc) {
  var infoWindowVisible = (function () {
		  var currentlyVisible = false;
		  return function (visible) {
			  if (visible !== undefined) {
				  currentlyVisible = visible;
			  }
			  return currentlyVisible;
		   };
	   }());
	   iw = new google.maps.InfoWindow();
	   google.maps.event.addListener(marker, 'click', function() {
		   iw.close();
		   if (infoWindowVisible()) {
			   iw.close();
			   infoWindowVisible(false);
		   } else {
			   var html= "<div class='map_alert'><p>"+desc+"</p></div>";
			   iw = new google.maps.InfoWindow({content:html});
			   iw.open(map,marker);
			   infoWindowVisible(true);
		   }
	});
	google.maps.event.addListener(iw, 'closeclick', function () {
		infoWindowVisible(false);
	});
}