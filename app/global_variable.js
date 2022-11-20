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
                    $("#app_modal_label").html("POINT");

                    $("#modalbox").modal('show');
                }
            });
        }
    }
});
promisePoint.then(function (data) {
    pointObjects.addData(data);
    map.addLayer(pointObjects);
});