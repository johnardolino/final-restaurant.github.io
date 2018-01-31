/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */


function msg() {
  alert("Thank you for your reservation!...Even though this restaurant is fake AF");
}


// function initMap() {
//   var map = new google.maps.Map(document.getElementById('map'), {
//       center: {lat: -40.80544918, lng: -73.9654415},
//       zoom: 8
//     // styles: styles
//   });
  
//   var marker = new google.maps.Marker({
//      position: {lat: -40.80544918, lng: -73.9654415},
//      map: map
//   });
// }

// initMap();

function initMap() {
        // Styles a map in night mode.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.674, lng: -73.945},
    zoom: 12,
    styles: [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
          ]
    });
  }

initMap ()


var config = {
  apiKey: "AIzaSyDFBgiX3U-oLn8vQFgKCFzgiSPcwYp3JjI",
  authDomain: "final-restaurant.firebaseapp.com",
  databaseURL: "https://final-restaurant.firebaseio.com",
  projectId: "final-restaurant",
  storageBucket: "final-restaurant.appspot.com",
  messagingSenderId: "623282591841"
};

firebase.initializeApp(config);

var database = firebase.database();

var reservationData = {};


$('#reservation-form').on('submit', function(event) {
  event.preventDefault();

  reservationData.name = $('#reservation-name').val();
  reservationData.day = $('#reservation-day').val();


// create a section for reservations data in your db
var reservationsReference = database.ref('reservations');

  reservationsReference.push(reservationData);
});


// retrieve reservations data when page loads and when reservations are added
function getReservations() {

// use reference to database to listen for changes in reservations data
database.ref('reservations').on('value', function(results) {

// Get all reservations stored in the results we received back from Firebase
var allReservations = results.val();

  // remove all list reservations from DOM before appending list reservations
  $('.bookings').empty();

  // iterate (loop) through all reservations coming from database call
  for (var reservation in allReservations) {

    // Create an object literal with the data we'll pass to Handlebars
    var context = {
      name: allReservations[reservation].name,
      day: allReservations[reservation].day,
      reservationId: reservation
    };


// Get the HTML from our Handlebars reservation template
var source = $("#reservation-template").html();

// Compile our Handlebars template
var template = Handlebars.compile(source);

// Pass the data for this reservation (context) into the template
var newListItem = template(context);

// Append newly created reservation to reservations list.
    $('.bookings').append(newListItem);
    }
  });
}

// When page loads, get reservations
getReservations();
