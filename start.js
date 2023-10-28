const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginLink = document.getElementById('login-link');
const registerLink = document.getElementById('register-link');

// Initially, hide the registration form
registerForm.style.display = 'none';

loginLink.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.style.display = 'block';
  registerForm.style.display = 'none';
});

registerLink.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  // Send a GET request to check if the user exists
  fetch(`http://localhost:3000/users?username=${username}&password=${password}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        const userId = data[0].id; // Assuming the user ID is available in the data
        localStorage.setItem('userId', userId); // Store the user ID in localStorage
        if (data[0].isAdmin) {
          // Admin user, redirect to admin.html
          window.location.href = 'admin.html';
        } else {
          // Regular user, redirect to index.html
          window.location.href = 'index.html';
        }
      } else {
        // User does not exist, show an error message
        alert('User does not exist. Please register or check your credentials.');
      }
    })
    .catch((error) => {
      console.error('Error logging in:', error);
    });
});

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;

  // Send a POST request to add the user to the database
  fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Registration successful
      console.log('Registration successful:', data);
      window.location.href = 'index.html';
    })
    .catch((error) => {
      console.error('Error registering:', error);
    });
});
