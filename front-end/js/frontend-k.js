 function togglePasswordVisibility(fieldId) {
    const passwordInput = document.getElementById(fieldId);
    const eyeIcon = document.getElementById("eye-icon");
  
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
        throw new Error(errorData.message);
      }
  
      const data = await response.json();
      // Handle the successful login response here
      console.log(data);
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