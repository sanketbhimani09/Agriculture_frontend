import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAdminLogin = location.state?.loginType === 'admin';

  useEffect(() => {
    if (isAdminLogin) {
      document.title = "Admin Login";
    } else {
      document.title = "User Login";
    }
  }, [isAdminLogin]);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isAdminLogin) {
      const adminCredentials = { Username: username, Password: password };

      try {
        const response = await fetch('https://agriculture-backend-kjha.onrender.com/checkAdmin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(adminCredentials),
        });

        const result = await response.json();

        if (response.ok) {
          localStorage.setItem('adminID', result.adminID); // Store admin ID in localStorage
          localStorage.setItem('AdminName',result.AdminName);
          console.log("Admin logged in with ID:", result.adminID);
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'You have logged in successfully.',
          }).then(() => {
            navigate('/Admin');
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: result.message || 'Invalid credentials.',
          });
        }
      } catch (error) {
        console.error('Error occurred during login:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while connecting to the server.',
        });
      }
    }

    if (!isAdminLogin) {
      const userCredentials = { Username: username, Password: password };
      try {
        const response = await fetch('https://agriculture-backend-kjha.onrender.com/checkUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userCredentials),
        });
    
        const result = await response.json(); // Parse the response JSON
    
        if (response.ok) {
          // Store userID in sessionStorage
          sessionStorage.setItem('userID', result.userID);
          sessionStorage.setItem('UserName',result.UserName);
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'You have logged in successfully.',
          }).then(() => {
            // navigate('/'); // Redirect to the homepage
            navigate(-1);
          });
        } else {
          // Show an error message if login fails
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: result.message || 'Invalid credentials.',
          });
        }
      } catch (error) {
        // Handle network or unexpected errors
        console.error('Error occurred during login:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while connecting to the server.',
        });
      }
    }
  };

  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">{isAdminLogin ? 'Admin Login' : 'User Login'}</h2>
          <div className="input-group">
            <label htmlFor="username">Username</label><br />
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={handlePasswordVisibility}
              >
                {showPassword ? '🐵' : '🙈'}
              </button>
            </div>
            <div style={{ textAlign: "end", color: "grey" }}>
              <a>Forgot Password</a>
            </div>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {!isAdminLogin && (
            <div className="row">
              <div className="col" align="center" style={{ marginTop: "10px" }}>
                Don't have an account? <Link to="/Registration" style={{ color: "green" }}>Sign up</Link>
              </div>
            </div>
          )}
        </form>
      </div>
      <div>
        <img src='assets/images/grass.webp' style={{ width: "100%" }} />
      </div>
    </>
  );
};

export default Login;
