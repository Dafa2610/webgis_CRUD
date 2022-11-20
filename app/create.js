function _displayMapCreate(divtarget) {
  divtarget = typeof divtarget !== 'undefined' ? divtarget : 'app';
  document.getElementById(divtarget).innerHTML = "<div id='map' class='map-wrapper'></div>";
  document.getElementById('home').className = "nav-link flat";
  document.getElementById('leaflet_crud_create').className = "nav-link flat active";
  document.getElementById('leaflet_crud_read').className = "nav-link flat";
  document.getElementById('navbarDropdownUpdate').className = "nav-link dropdown-toggle";
  document.getElementById('leaflet_crud_delete').className = "nav-link flat";

  var map, isCollapsed, openStreetMaps;
  if (document.body.clientWidth <= 767) {
    isCollapsed = true;
  } else {
    isCollapsed = false;
  }

  openStreetMaps = new L.TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 3,
    maxZoom: 20,
    attribution: 'Map Data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors.'
  });

  map = L.map("map", {
    zoom: 12,
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
    "OpenStreetMap": openStreetMaps
  };

  var layerControl = L.control.layers(baseLayers, null, {
    collapsed: isCollapsed
  }).addTo(map);

  var attributionControl = L.control({
    position: "bottomright"
  });

  /* Digitize Function */
  var drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);

  var drawControl = new L.Control.Draw({
    draw: {
      position: 'topleft',
      polyline: true,
      polygon: true,
      rectangle: false,
      circle: false,
      marker: true,
      circlemarker: false
    },
    edit: false
  });



  map.addControl(drawControl);
  var object;
  var layerGroup = new L.LayerGroup();
  map.on('draw:drawstart', function (e) {
    var type = e.layerType;
    layerGroup.hasLayer(object) ? layerGroup.removeLayer(object) : object = null;
    if (type == 'polyline') {
      var promiseLinestring = $.ajax({
        url: "./dataservice/read_linestring.php",
        method: "GET",
        dataType: "json",
        data: { command: "LINESTRING" },
        username: null,
        password: null
      });
      object = L.geoJson(null, {
        style: {
          "color": "#FD841F",
          "weight": 10,
          "opacity": 1
        },
      });
      promiseLinestring.then(function (data) {
        object.addData(data);
        layerGroup.addLayer(object);
        layerGroup.addTo(map);
      });
    } else if (type == 'polygon') {
      var promisePolygon = $.ajax({
        url: "./dataservice/read_polygon.php",
        method: "GET",
        dataType: "json",
        data: { command: "POLYGON" },
        username: null,
        password: null
      });
      object = L.geoJson(null, {
        style: {
          "color": "#FD841F",
        },
      });
      promisePolygon.then(function (data) {
        object.addData(data);
        layerGroup.addLayer(object);
        layerGroup.addTo(map);
      });
    } else if (type == 'marker') {
      var promisePoint = $.ajax({
        url: "./dataservice/read_point.php",
        method: "GET",
        dataType: "json",
        data: { command: "POINT" },
        username: null,
        password: null
      });
      object = L.geoJson(null, {
        pointToLayer: function (feature, latlng) {
          return L.marker([latlng.lat, latlng.lng], {
            icon: L.icon({
              iconUrl: 'assets/img/pin.png',
              iconSize: [50, 50]
            })
          });
        }
      });
      promisePoint.then(function (data) {
        object.addData(data);
        layerGroup.addLayer(object);
        layerGroup.addTo(map);
      });
    } else {
      console.log('_undefined');
    }
  })

  map.on('draw:created', function (e) {
    var type = e.layerType,
      layer = e.layer;

    var drawnJSONObject = layer.toGeoJSON();
    var objectGeometry = Terraformer.WKT.convert(drawnJSONObject.geometry);

    if (type === 'polyline') {
      _buildDigitiseModalBox('modalform', 'LINESTRING', objectGeometry);
    } else if (type === 'polygon') {
      _buildDigitiseModalBox('modalform', 'POLYGON', objectGeometry);
    } else if (type === 'marker') {
      _buildDigitiseModalBox('modalform', 'POINT', objectGeometry);
    } else {
      console.log('__undefined__');
    }
    //map.addLayer(layer);
    drawnItems.addLayer(layer);
  });

  $("#modalform").on('shown.bs.modal', function () {
    _activateFeatureSave();
  });

}
