
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEnvelope, FaLock, FaSun, FaMoon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { CustomToast, notifySuccess, notifyError } from './CustomToast';
import './styles.css';
import './spinner.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false); // Spinner state

  // Toggle light/dark mode
  const toggleMode = () => setIsDarkMode(!isDarkMode);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle admin login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:8085/adminLogin', formData);
      if (res.data && res.data.length > 0) {
        localStorage.setItem('email', res.data[0].email);
        localStorage.setItem('role', res.data[0].role);
        notifySuccess('Admin login successful');
        setTimeout(() => navigate('/adminboard'), 1000); // Redirect after success
      } else {
        notifyError('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      notifyError('Login failed. Please try again.');
    } finally {
      setTimeout(() => setIsLoading(false), 2000); // Stop spinner after 2s
    }
  };

  return (
    <div className={`login-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <CustomToast />
      
     

      {/* Admin Login Form */}
      <div className="login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input type="password" name="password" placeholder="Password" onChange={handleInputChange} required />
          </div>
          <button type="submit" className="btn">
            {isLoading ? <div className="spinner"></div> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
