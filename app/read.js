function _displayMapRead(divtarget) {
	divtarget = typeof divtarget !== 'undefined' ? divtarget : 'app';
	document.getElementById(divtarget).innerHTML = "<div id='map' class='map-wrapper'></div>";
	document.getElementById('home').className = "nav-link flat active";
	document.getElementById('leaflet_crud_create').className = "nav-link flat";
	document.getElementById('leaflet_crud_read').className = "nav-link flat active";
	document.getElementById('navbarDropdownUpdate').className = "nav-link dropdown-toggle";
	document.getElementById('leaflet_crud_delete').className = "nav-link flat";

	var map, isCollapsed, openStreetMaps;

	if (document.body.clientWidth <= 767) {
		isCollapsed = true;
	} else {
		isCollapsed = false;
	}
	var rumahSakit = L.layerGroup();
	var rumahMakan = L.layerGroup();
	var promiseCategories = $.ajax({
		url: "./dataservice/read_categories.php",
		method: "GET",
		dataType: "json",
		username: null,
		password: null
	});

	var categories = [];
	var categoryOptions = "";

	promiseCategories.then(function (data) {
		for (const key in data['categories']) {
			categories.push(data['categories'][key]['category']);
		}
	});

	var promisePoint = $.ajax({
		url: "./dataservice/read_point.php",
		method: "GET",
		dataType: "json",
		data: { command: "POINT" },
		username: null,
		password: null
	});
	var pointObjects = L.geoJson(null, {
		onEachFeature: function (feature, layer) {
			if (feature.properties) {
				function popupPoint(e) {
					var htmlformcomponent = "" +
						"<table id='feature_data' class='table table-condensed table-bordered table-striped'>" +
						"<thead>" +
						"<tr>" +
						"<th colspan='2' class='text-center'>Feature Data</th>" +
						"</tr>" +
						"</thead>" +
						"<tbody>" +
						"<tr>" +
						"<td class=''>Notes</td>" +
						"<td class=''><strong>" + feature.properties.notes + "</strong></td>" +
						"</tr>" +
						"<tr>" +
						"<td class=''>Category</td>" +
						"<td class=''><strong>" + categories[feature.properties.id_category] + "</strong></td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"";
					$("#app_modal_body").empty();
					$("#app_modal_body").removeClass().addClass('modal-body');
					$("#app_modal_size").removeClass().addClass('modal-dialog');
					$("#app_modal_body").html(htmlformcomponent);
					$("#app_modal_label").html("LINESTRING");

					$("#modalbox").modal('show');
				}
				switch (feature.properties.id_category) {
					case 1:
						L.marker(feature.geometry.coordinates.reverse(), {
							icon: L.icon({
								iconUrl: 'assets/img/pin.png',
								iconSize: [50, 50]
							})
						}).bindPopup(popupPoint).addTo(rumahMakan);
						break;
					case 2:
						L.marker(feature.geometry.coordinates.reverse(),).bindPopup(popupPoint).addTo(rumahSakit);
						break;
					default:
						break;
				}
				layer.on({
					click: popupPoint
				});
			}
		}
	});
	promisePoint.then(function (data) {
		pointObjects.addData(data);
		map.addLayer(pointObjects);
	});

	var promiseLinestring = $.ajax({
		url: "./dataservice/read_linestring.php",
		method: "GET",
		dataType: "json",
		data: { command: "LINESTRING" },
		username: null,
		password: null
	});

	var linestringObjects = L.geoJson(null, {
		onEachFeature: function (feature, layer) {
			if (feature.properties) {
				layer.on({
					click: function (e) {
						var htmlformcomponent = "" +
							"<table id='feature_data' class='table table-condensed table-bordered table-striped'>" +
							"<thead>" +
							"<tr>" +
							"<th colspan='2' class='text-center'>Feature Data</th>" +
							"</tr>" +
							"</thead>" +
							"<tbody>" +
							"<tr>" +
							"<td class=''>Notes</td>" +
							"<td class=''><strong>" + feature.properties.notes + "</strong></td>" +
							"</tr>" +
							"</tbody>" +
							"</table>" +
							"";
						$("#app_modal_body").empty();
						$("#app_modal_body").removeClass().addClass('modal-body');
						$("#app_modal_size").removeClass().addClass('modal-dialog');
						$("#app_modal_body").html(htmlformcomponent);
						$("#app_modal_label").html("LINESTRING");

						$("#modalbox").modal('show');
					}
				});
			}
		}
	});
	promiseLinestring.then(function (data) {
		linestringObjects.addData(data);
		map.addLayer(linestringObjects);
	});

	var promisePolygon = $.ajax({
		url: "./dataservice/read_polygon.php",
		method: "GET",
		dataType: "json",
		data: { command: "POLYGON" },
		username: null,
		password: null
	});

	var polygonObjects = L.geoJson(null, {
		onEachFeature: function (feature, layer) {
			if (feature.properties) {
				layer.on({
					click: function (e) {
						var htmlformcomponent = "" +
							"<table id='feature_data' class='table table-condensed table-bordered table-striped'>" +
							"<thead>" +
							"<tr>" +
							"<th colspan='2' class='text-center'>Feature Data</th>" +
							"</tr>" +
							"</thead>" +
							"<tbody>" +
							"<tr>" +
							"<td class=''>Notes</td>" +
							"<td class=''><strong>" + feature.properties.notes + "</strong></td>" +
							"</tr>" +
							"</tbody>" +
							"</table>" +
							"";
						$("#app_modal_body").empty();
						$("#app_modal_body").removeClass().addClass('modal-body');
						$("#app_modal_size").removeClass().addClass('modal-dialog');
						$("#app_modal_body").html(htmlformcomponent);
						$("#app_modal_label").html("POLYGON");

						$("#modalbox").modal('show');
					}
				});
			}
		}
	});
	promisePolygon.then(function (data) {
		polygonObjects.addData(data);
		map.addLayer(polygonObjects);
	});

	openStreetMaps = new L.TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		minZoom: 2,
		maxZoom: 20,
		attribution: 'Map Data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors.'
	});

	const mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
	const mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

	const streets = L.tileLayer(mbUrl, { id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr });
	const satellite = L.tileLayer(mbUrl, { id: 'mapbox/satellite-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr });

	map = L.map("map", {
		zoom: 13,
		center: [0.000000, 109.333336],
		layers: [openStreetMaps],
		minZoom: 13,
		maxZoom: 20,
		zoomControl: false,
		attributionControl: true
	});

	var zoomControl = L.control.zoom({
		position: "topleft"
	}).addTo(map);

	var baseLayers = {
		"OpenStreetMap": openStreetMaps,
		"Street": streets,
		"Satellite": satellite
	};

	var overlayLayers = {
		"Points": pointObjects,
		"Rumah Sakit": rumahSakit,
		"Rumah Makan": rumahMakan,
		"Lines": linestringObjects,
		"Polygons": polygonObjects
	};
	rumahMakan.addTo(map);
	rumahSakit.addTo(map);

	// map.flyTo([109.24221, 0.025578]);
	var layerControl = L.control.layers(baseLayers, overlayLayers, {
		collapsed: isCollapsed
	}).addTo(map);
	var attributionControl = L.control({
		position: "bottomright"
	});
}