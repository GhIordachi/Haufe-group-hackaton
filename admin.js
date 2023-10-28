document.addEventListener('DOMContentLoaded', function () {
  const tableBody = document.getElementById('booking-table-body');

  // Function to delete a booking
  function deleteBooking(bookingId, row) {
      fetch(`http://localhost:3000/bookings/${bookingId}`, {
          method: 'DELETE'
      })
      .then((response) => {
          if (response.status === 200) {
              // Remove the row from the table if the delete request was successful
              tableBody.removeChild(row);

              // Show a success alert
              alert('Booking deleted successfully!');
          }
      })
      .catch((error) => {
          console.error('Error deleting booking:', error);
          // Show an error alert
          alert('Error deleting booking');
      });
  }

  // Fetch the booking data from your server
  fetch('http://localhost:3000/bookings')
      .then((response) => response.json())
      .then((data) => {
          // Get the currently logged-in user's user_id and isAdmin status
          const userId = localStorage.getItem('userId');

          // Check if the user is an admin
          if (localStorage.getItem('userId') == 3) {
              // Display all bookings for admins
              data.forEach((booking) => {
                  const row = document.createElement('tr');
                  row.innerHTML = `
                      <td>${booking.id}</td>
                      <td>${booking.user_id}</td>
                      <td>${booking.start_location}</td>
                      <td>${booking.end_location}</td>
                      <td>${booking.booking_time}</td>
                      <td><button class="delete-button">Delete</button></td>
                  `;

                  // Add a click event listener to the delete button
                  const deleteButton = row.querySelector('.delete-button');
                  deleteButton.addEventListener('click', () => {
                      // When the delete button is clicked, call the deleteBooking function
                      deleteBooking(booking.id, row);
                  });

                  tableBody.appendChild(row);
              });
          } else {
              // Display bookings matching the user_id
              data.forEach((booking) => {
                  if (booking.user_id === userId) {
                      const row = document.createElement('tr');
                      row.innerHTML = `
                          <td>${booking.id}</td>
                          <td>${booking.user_id}</td>
                          <td>${booking.start_location}</td>
                          <td>${booking.end_location}</td>
                          <td>${booking.booking_time}</td>
                          <td><button class="delete-button">Delete</button></td>
                      `;

                      // Add a click event listener to the delete button
                      const deleteButton = row.querySelector('.delete-button');
                      deleteButton.addEventListener('click', () => {
                          // When the delete button is clicked, call the deleteBooking function
                          deleteBooking(booking.id, row);
                      });

                      tableBody.appendChild(row);
                  }
              });
          }
      })
      .catch((error) => {
          console.error('Error fetching booking data:', error);
          // Show an error alert
          alert('Error fetching booking data');
      });
});

const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', () => {
  // Remove the user ID from localStorage
  localStorage.removeItem('userId');
  // Redirect to the login page or any other appropriate action
  window.location.href = 'start.html'; // Replace 'login.html' with your login page
});

function goToIndexPage() {
  window.location.href = 'index.html'; // Replace with the correct URL for index.html
}
