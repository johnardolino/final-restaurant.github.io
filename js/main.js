
function initMap() {

var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -40.80544918, lng: -73.9654415},
      zoom: 8
    // styles: styles
  });
  
    var marker = new google.maps.Marker({
         position: {lat: -40.80544918, lng: -73.9654415},
         map: map
   });
 }

      //initmap();
