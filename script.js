const userId = localStorage.getItem('userId');
if (!userId) {
    window.location.href = 'start.html';
} else {
  // User is logged in, and the user ID is available in the userId variable
  // You can use this user ID as needed in your admin page
}


function saveFormData(event) {
    event.preventDefault(); // Prevent the default form submission

    const startLocation = document.getElementById('start_location').value;
    const endLocation = document.getElementById('end_location').value;
    const bookingTime = document.getElementById('booking_time').value;
    const userIdBook = localStorage.getItem('userId');

    const bookingData = {
        start_location: startLocation,
        end_location: endLocation,
        booking_time: bookingTime,
        user_id: userIdBook
    };

    // Make an HTTP POST request to the JSON server
    fetch('http://localhost:3000/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
    })
        .then((response) => response.json())
        .then((data) => {
            // Display an alert message
            alert('Booking made successfully!');
        })
        .catch((error) => {
            console.error('Error making the request:', error);
        });
}



var map = new google.maps.Map(document.getElementById("map"));
map.setCenter(new google.maps.LatLng(45.7664, 21.2396));
map.setZoom(15);

var redPinIcon = {
    url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', // URL to the red pin icon
    scaledSize: new google.maps.Size(40, 40), // Size of the icon
};

// Define scooter counts for each location
const scooterCounts = [10, 15, 8, 12, 7, 20, 5, 9, 14, 11];

// Array of marker positions and corresponding street names
const markerData = [
    { position: new google.maps.LatLng(45.7536604, 21.2233323), street: "Strada Alba Iulia, nr. 10, Timișoara" },
    { position: new google.maps.LatLng(45.7557436, 21.2370699), street: "Bulevardul Revoluției, nr. 30, Timișoara" },
    { position: new google.maps.LatLng(45.7530907, 21.2234121), street: "Piața Victoriei, nr. 1, Timișoara" },
    { position: new google.maps.LatLng(45.7306627, 21.2510937), street: "Strada Mareșal Constantin Prezan nr. 1, Timișoara" },
    { position: new google.maps.LatLng(45.7565477, 21.2272361), street: "Strada Eugeniu de Savoya nr. 5, Timișoara" },
    { position: new google.maps.LatLng(45.7573059, 21.2234947), street: "Strada Mărășești nr. 10, Timișoara" },
    { position: new google.maps.LatLng(45.7407715, 21.2059072), street: "Strada Iuliu Maniu nr. 15, Timișoara" },
    { position: new google.maps.LatLng(45.7468012, 21.1989081), street: "Strada Gheorghe Bariț nr. 20, Timișoara" },
    { position: new google.maps.LatLng(45.7573896, 21.2252972), street: "Strada Vasile Alecsandri nr. 25, Timișoara" },
    { position: new google.maps.LatLng(45.8019779, 21.2491203), street: "Strada Mihai Eminescu nr. 30, Timișoara" }
    // ... add other positions and streets for markers here
];

// Create an array to store markers
const markers = [];

// Function to create markers and associate click event listeners
function createMarkers() {
    for (let i = 0; i < markerData.length; i++) {
        const data = markerData[i];
        const marker = new google.maps.Marker({
            position: data.position,
            map: map,
            title: data.street, // Set the marker title to the street
            icon: redPinIcon, // Set the red pin icon
        });

        // Function to close info window after 3 seconds
        function closeInfoWindow(infoWindow) {
            setTimeout(function () {
                infoWindow.close();
            }, 3000); // 3000 milliseconds (3 seconds)
        }

        // Add click event listener to show scooter count
        marker.addListener('click', function () {
            const infoWindow = new google.maps.InfoWindow({
                content: `Scooters available: ${scooterCounts[i]}`,
            });
            infoWindow.open(map, marker);

            // Call the function to close the info window after 3 seconds
            closeInfoWindow(infoWindow);
        });

        markers.push(marker); // Store the created markers
    }
}

// Call the function to create markers with click event listeners
createMarkers();

// Get the start and end location comboboxes
const startLocationCombobox = document.getElementById('start_location');
const endLocationCombobox = document.getElementById('end_location');

// Add event listeners to all markers
markers.forEach((marker, i) => {
    marker.addListener('click', () => {
        // Set the street in the start location combobox
        startLocationCombobox.value = marker.title;
        startLocationCombobox.focus(); // Focus on the start location combobox

        // Update the scooter count using the click count
        marker.infowindow.setContent(`Scooters available: ${scooterCounts[i] - startClickCount + endClickCount}`);
    });
});

const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', () => {
  // Remove the user ID from localStorage
  localStorage.removeItem('userId');
  // Redirect to the login page or any other appropriate action
  window.location.href = 'start.html'; // Replace 'login.html' with your login page
});

document.addEventListener('DOMContentLoaded', function () {
    const viewBookingsButton = document.getElementById('view-bookings-button');
  
    // Add a click event listener to the "Vezi rezervările mele" button
    viewBookingsButton.addEventListener('click', () => {
      // Redirect to index.html
      window.location.href = 'admin.html';
    });
  
    // Rest of your code for displaying bookings here
  });

  






  