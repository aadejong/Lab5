//LOCATE FUNCTION HERE:
function locateFunction(){
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
    map.locate({
      setView: true, 
      maxZoom: 16, 
      timeout: 15000, 
      watch: false,
  })} else {
    alert('Web page denied access to location.')
  }  
}

function showPosition(position){ //Cannot call from onLocationFound function. 
}

//Original code from Lab4:

function onLocationFound(e) { 

  var radius = e.accuracy / 2; 

  var coordinates = e.latlng.lat + ", " + e.latlng.lng

  L.marker(e.latlng).addTo(map)
    .bindPopup("You are within " + radius + " feet of this point." + "<br>" + "Click on the map to use this location as a waypoint.").openPopup();
  
  //L.circle(e.latlng, radius).addTo(map); // this adds a Leaflet circle to the map at the lat and long returned by the locate function. Its radius is set to the var radius defined above.

  if (radius < 30) {
      L.circle(e.latlng, radius, units = 'feet', {color: 'green'}).addTo(map);
  }
  else{
      L.circle(e.latlng, radius, units = 'feet', {color: 'red'}).addTo(map);
  } 
}

function onLocationError(e) {
  alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

//This specifies that the locate method should run
map.locate({
  setView: true, 
  maxZoom: 16, 
  timeout: 15000, 
  watch: false, 
});