import React, { useState, useEffect } from 'react';
import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp, FaSun ,FaMoon } from 'react-icons/fa';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Login from './login.js'

import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import video1 from './images/video1.mp4';
import video3 from './images/video3.mp4';
import video2 from './images/video2.mp4'
const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTab, setCurrentTab] = useState('home'); // Default tab
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString()); // Initialize with current date and time
  const navigate = useNavigate();

  // Update date and time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Toggle between light and dark mode
  const toggleMode = () => setIsDarkMode(!isDarkMode);

  // Handle tab change
  const handleTabChange = (tab) => setCurrentTab(tab);

  return (
    <div className={`home-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Background Video */}
      <video className="background-video" autoPlay loop muted style={{ display: isDarkMode ? 'none' : 'block' }}>
        <source src= {video3} type="video/mp4"/>
      </video>
      <video className="background-video" autoPlay loop muted style={{ display: isDarkMode ? 'block' : 'none' }}>
        <source src={video2} type="video/mp4" />
      </video>

      {/* Header Section */}
      <header className="header">
        <div className="header-left">
          <h1 className="college-name"><marquee>Andhra Polytechnic Kakinada</marquee></h1>
          <h2 style={{fontSize:"30px"}}>Exam Seat Arrangement System</h2>
        </div>
        <div className="header-right">
          <button className="mode-toggle btn1" onClick={toggleMode}>
            {isDarkMode ? <FaMoon /> : <FaSun />}
          </button>
           {/* Current Date and Time */}
        <div className={`current-datetime ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
          <p>{currentDateTime}</p>
        </div>
        </div>
       
      </header>

      {/* Navigation Bar */}
      <nav className={`navbar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <ul>
          <li>
            <button
              className={`nav-btn ${currentTab === 'home' ? 'active' : ''}`}
              onClick={() => handleTabChange('home')}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${currentTab === 'about' ? 'active' : ''}`}
              onClick={() => handleTabChange('about')}
            >
              About
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${currentTab === 'contact' ? 'active' : ''}`}
              onClick={() => handleTabChange('contact')}
            >
              Contact
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${currentTab === 'Login' ? 'active' : ''}`}
              onClick={() => handleTabChange('Login')}
            >
              Login
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main>
        {/* Conditional Rendering of Tabs */}
        {currentTab === 'home' && (
          <section id="home" className="section">
            <center>
            <h2><b>Welcome to Andhra Polytechnic Kakinada</b></h2>
            <p><i>
              Andhra Polytechnic Kakinada is one of the premier institutions known for its commitment to providing
              quality education<br/> and fostering innovation. The college offers a variety of courses and focuses on
              preparing students for a bright and successful career.
              </i> </p>
            </center><br/><br/>
            <div className="gallery">
            <video className="background-video2" autoPlay loop muted>
        <source src={video1} type="video/mp4" />
      </video>
            </div>
            <div className="gallery">
              <div className="image-container">
                <img src={image1} alt="College View 1" />
              </div>
              <div className="image-container">
                <img src={image2} alt="College View 2" />
              </div>
              <div className="image-container">
                <img src={image3} alt="College View 3" />
              </div>
            </div>
          </section>
        )}
        {currentTab === 'about' && (
          <section id="about" className="section">
            <h2>About the Project</h2>
            <p>
              <center><i>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Exam Seat Arrangement System is designed to simplify the management of exam seating arrangements.
              With this system,<br/> administrators can allocate seats efficiently, ensuring fairness and transparency.
              </i></center>
            </p><br/><br/>
            <center>
            <p>
              <h3><b>Key Features:</b></h3><br/>
            </p>
            <i>
              Automated seat allocation based on roll numbers and seating capacity.<br/>
              Ensures no duplication of seats.<br/>
              Provides printable seat allocation charts for easy management.<br/></i>
            
            <p><br/><br/><i>
              This system eliminates manual errors, reduces time, and enhances overall efficiency.<br/></i>
            </p><br/>
            </center>
          </section>
        )}
        {currentTab === 'contact' && (
          <section id="contact" className="section center">
            <h2>Contact Us</h2>
            <p>Follow us on social media:</p><br/>
            <div className="social-icons">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
            </div>
          </section>
        )}
        {currentTab === 'Login' && <center><Login/></center>}
      </main>
    </div>
  );
};

export default Home;