//ROUTING MACHINE CONTROL HERE:
var control = L.Routing.control({
  waypoints: [
      L.latLng(47.2466502, -122.4388783),
    ],
    routeWhileDragging: true,
    units: 'imperial',
    router: L.Routing.mapbox('pk.eyJ1IjoiYWxpY2lhZGVqb25nIiwiYSI6ImNqcDBqM2xybzBrMTcza281czI5Nm55azMifQ.sV8GFiDDOOBKNGoR66dOlg'),
    //Geocoder here:
    geocoder: L.Control.Geocoder.nominatim(),
}).addTo(map);

//Initial popup 
    //Help from: https://stackoverflow.com/questions/9047931/leaflet-js-open-all-popup-bubbles-on-page-load
    //I decided to give instructions with a simple pop-up. I placed it slightly above the initial waypoint. It goes away when the user clicks the close button or anywhere else on the map. 

var popupLocation = new L.LatLng(47.270890, -122.440875);
var popupContent = '<p>Click anywhere on the map or drag this pin <br/>to set a start and end destination.</p>',
popup = new L.Popup();
popup.setLatLng(popupLocation);
popup.setContent(popupContent);
    map.addLayer(popup);

//Waypoints button here:
    function createButton(label, container) {
        var btn = L.DomUtil.create('button', '', container);
        btn.setAttribute('type', 'button');
        btn.innerHTML = label;
        return btn;
    }

    map.on('click', function(e) {
        var container = L.DomUtil.create('div'),
          startBtn = createButton('Start from this location', container),
          destBtn = createButton('Go to this location', container);

        L.popup()
            .setContent(container)
            .setLatLng(e.latlng)
            .openOn(map);

          L.DomEvent.on(destBtn, 'click', function() {
            control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
            map.closePopup();
          });

          L.DomEvent.on(startBtn, 'click', function() {
                control.spliceWaypoints(0, 1, e.latlng);
                map.closePopup();
           });

});