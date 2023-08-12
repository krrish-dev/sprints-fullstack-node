function togglePasswordVisibility(fieldId) {
  const passwordInput = document.getElementById(fieldId);
  const eyeIcon = document.getElementById(`${fieldId}-eye-icon`);

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  } else {
    passwordInput.type = "password";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  }
}

  
  function setTokenFromQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const tokenInput = document.getElementById('token');
    if (token && tokenInput) {
      tokenInput.value = token;
    }
  }

  let errorMessageCreated = false;

  async function handleLoginSubmit(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
  
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'An error occurred during login.';
        
        if (!errorMessageCreated) {
          // Create and display the error message
          const errorMessageElement = document.createElement('div');
          errorMessageElement.classList.add('error-message');
          errorMessageElement.textContent = errorMessage;
          document.getElementById('loginForm').appendChild(errorMessageElement);
          
          errorMessageCreated = true;
        } else {
          // Update existing error message
          const errorMessageElement = document.querySelector('.error-message');
          if (errorMessageElement) {
            errorMessageElement.textContent = errorMessage;
          }
        }
  
        throw new Error(errorMessage);
      } else {
        // Clear error message if it exists
        const errorMessageElement = document.querySelector('.error-message');
        if (errorMessageElement) {
          errorMessageElement.remove();
          errorMessageCreated = false;
        }
        
        const data = await response.json();
        // Handle the successful login response here
        console.log(data);
  
        // Save the token and user name to local storage
        if (data.token) {
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('userName', data.user.name);
        }
  
        // Redirect the user to their dashboard or another page
        // Replace '/dashboard' with the actual URL you want to redirect to
        window.location.href = '/index.html';
      }
    } catch (error) {
      // Handle any errors that occur during the login process
      console.error(error.message);
    }
  }
  

  
  async function handleRegisterSubmit(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
  
    // Validate if the passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      const data = await response.json();
      // Handle the successful registration response here
      console.log(data);
    } catch (error) {
      // Handle any errors that occur during the registration process
      console.error(error.message);
    }
  }
  
  async function handleForgotPasswordSubmit(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const email = formData.get('email');
  
    try {
      const response = await fetch('http://localhost:3000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      const data = await response.json();
      // Handle the successful password reset request here
      console.log(data);
    } catch (error) {
      // Handle any errors that occur during the password reset process
      console.error(error.message);
    }
  }
  
  async function handleResetPasswordSubmit(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const token = formData.get('token');
  
    // Validate if the passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, token }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      const data = await response.json();
      // Handle the successful password reset response here
      console.log(data);
    } catch (error) {
      // Handle any errors that occur during the password reset process
      console.error(error.message);
    }
  }
  
  // Function to check if the current page is login.html
  function isLoginPage() {
    return window.location.pathname.toLowerCase().includes('login');
  }
  
  // Function to check if the current page is register.html
  function isRegisterPage() {
    return window.location.pathname.toLowerCase().includes('register');
  }
  
  // Function to check if the current page is forgot-password.html
  function isForgotPasswordPage() {
    return window.location.pathname.toLowerCase().includes('forgot-password');
  }
  
  // Function to check if the current page is reset-password.html
    function isResetPasswordPage() {
    return window.location.pathname.toLowerCase().includes('reset-password');
  }



  // Add event listener for the login form if on the login page
  if (isLoginPage()) {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', handleLoginSubmit);
    }
  }
  
  // Add event listener for the register form if on the register page
  if (isRegisterPage()) {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', handleRegisterSubmit);
    }
  }
  
  // Add event listener for the forgot password form if on the forgot password page
  if (isForgotPasswordPage()) {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
      forgotPasswordForm.addEventListener('submit', handleForgotPasswordSubmit);
    }
  }

  if (isResetPasswordPage()) {
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    if (resetPasswordForm) {
      resetPasswordForm.addEventListener('submit', handleResetPasswordSubmit);
      setTokenFromQueryParams();
    }
  }

  //start navbar 
// Retrieve the user's name from local storage
const userName = localStorage.getItem('userName');
const authToken = localStorage.getItem('authToken');

if (userName && authToken) {
  // Update the content of the span element with the user's name
  const userNamePlaceholder = document.getElementById('userNamePlaceholder');
  userNamePlaceholder.textContent = `Welcome, ${userName}`;

  // Add event listener to the logout link
  const logoutLink = document.getElementById('logoutLink');
  logoutLink.addEventListener('click', handleLogout);

  // Show the logout link and hide the login link
  logoutLink.style.display = 'inline';
  const loginLink = document.getElementById('loginLink');
  loginLink.style.display = 'none';
} else {
  // Show the login link and hide the logout link
  const loginLink = document.getElementById('loginLink');
  loginLink.style.display = 'inline';
  const logoutLink = document.getElementById('logoutLink');
  logoutLink.style.display = 'none';
}

// Logout function
function handleLogout(event) {
  event.preventDefault();

  // Clear the authentication token and user name from local storage
  localStorage.removeItem('authToken');
  localStorage.removeItem('userName');

  // Show the login link and hide the logout link
  loginLink.style.display = 'inline';
  logoutLink.style.display = 'none';

  // Hide the welcome message and user icon
  const userNamePlaceholder = document.getElementById('userNamePlaceholder');
  userNamePlaceholder.textContent = ''; // Clear the text
  // Assuming you have an element for the user icon, hide it
  const userIcon = document.getElementById('userIcon');
  userIcon.style.display = 'none';
}



//login with google
// Load the Google API client library
gapi.load('auth2', () => {
  gapi.auth2.init({
    client_id: '792002934801-9oe7b3563fitfaanqqgv179kksrmhqrp.apps.googleusercontent.com',
  });
  
  // Attach event listener to the "Login with Google" button
  document.getElementById('googleLoginButton').addEventListener('click', async () => {
    try {
      const authResponse = await gapi.auth2.getAuthInstance().signIn();
      const idToken = authResponse.getAuthResponse().id_token;
  
      // Send the Google ID token to your backend
      const response = await fetch('http://localhost:3000/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      const data = await response.json();
      // Handle successful login response
      console.log(data);
    } catch (error) {
      // Handle login error
      console.error(error.message);
    }
  });
});

