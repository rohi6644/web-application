/*import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaUser, FaTachometerAlt, FaUsers, FaBuilding, FaTasks, FaEye } from "react-icons/fa";
import './Admin.css';

import Allocation from "./allocation";  
import Student from "./student2";  
import Halls from "./hall";  
import View from "./view";  
import Staff from "./faculty";  
import video2 from "./images/video2.mp4";
import video3 from "./images/video3.mp4";


const AdminDashboard1 = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    // Update the date and time every second
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString());
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const handleModeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div id="admin-dashboard" className={isDarkMode ? "dark-mode" : "light-mode"}>
      /* {Background Videos }*/
      /*<video className="admin-background-video" autoPlay loop muted style={{ display: isDarkMode ? 'none' : 'block' }}>
        <source src= {video3} type="video/mp4" />
      </video>
      <video className="admin-background-video" autoPlay loop muted style={{ display: isDarkMode ? 'block' : 'none' }}>
        <source src= {video2} type="video/mp4" />
      </video>


      {/* Sidebar *//*
      <aside className={`admin-sidebar ${isDarkMode ? "dark-sidebar" : "light-sidebar"}`}>
        <h2 className={`admin-sidebar-title ${isDarkMode ? "dark-text" : "light-text"}`}>Admin Panel</h2>
        <ul>
          <li className="admin-user">
            <div className="admin-user1">
              <FaUser className="admin-user-logo" />
            </div>
            <div className="admin-user2">
              Welcome, Admin<br />
              <a href="/" id="admin-logout-link">Logout</a>
            </div>
          </li>
        </ul>
        <nav>
          <ul>
            <li>
              <button
                className={`admin-sidebar-option ${activeTab === "dashboard" ? "active" : ""}`}
                onClick={() => handleTabClick("dashboard")}
              >
                <FaTachometerAlt /> Dashboard
              </button>
            </li>
            <li>
              <button
                className={`admin-sidebar-option ${activeTab === "staff-management" ? "active" : ""}`}
                onClick={() => handleTabClick("staff-management")}
              >
                <FaUsers /> Staff Management
              </button>
            </li>
            <li>
              <button
                className={`admin-sidebar-option ${activeTab === "student-management" ? "active" : ""}`}
                onClick={() => handleTabClick("student-management")}
              >
                <FaUsers /> Student Management
              </button>
            </li>
            <li>
              <button
                className={`admin-sidebar-option ${activeTab === "hall-management" ? "active" : ""}`}
                onClick={() => handleTabClick("hall-management")}
              >
                <FaBuilding /> Hall Management
              </button>
            </li>
            <li>
              <button
                className={`admin-sidebar-option ${activeTab === "allocation-process" ? "active" : ""}`}
                onClick={() => handleTabClick("allocation-process")}
              >
                <FaTasks /> Allocation Process
              </button>
            </li>
            <li>
              <button
                className={`admin-sidebar-option ${activeTab === "view-allocation" ? "active" : ""}`}
                onClick={() => handleTabClick("view-allocation")}
              >
                <FaEye /> View Allocation
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content *//*
      <main>
        <header className="admin-d-fle">
          <div className="admin-heading">
            <h1>Andhra Polytechnic Kakinada</h1>
            <h2>Exam Seat Arrangement System</h2>
          </div>
          <button id="admin-mode-toggle" onClick={handleModeToggle}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          <div className="admin-date-time">
            <span id="admin-current-date">Date: {currentDate}</span><br />
            <span id="admin-current-time">Time: {currentTime}</span>
          </div>
        </header>
        <section id="admin-tab-content">
        {activeTab === "dashboard" && <h1>Dashboard</h1>}
          {activeTab === "staff-management" && <Staff/>}
          {activeTab === "student-management" && <Student/>}
          {activeTab === "hall-management" && <Halls/>}

          {activeTab === "allocation-process" && <Allocation/>}
          {activeTab === "view-allocation" && <View/>}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard1;*/



import { useState, useEffect } from "react";
import {
  FaSun,
  FaMoon,
  FaUser,
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaTasks,
  FaEye,
} from "react-icons/fa";
import "./Admin.css";

import Allocation from "./allocation";
import Student from "./student2";
import Halls from "./hall";
import View from "./view";
import Branch from "./branch";
import Year from "./year";
import Staff from "./faculty";
import video2 from "./images/video2.mp4";
import video3 from "./images/video3.mp4";

const AdminDashboard1 = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString());
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleModeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div id="dashboard" className={isDarkMode ? "dark-mode" : "light-mode"}>
      {/* Background Videos */}
      <video className="background-video" autoPlay loop muted style={{ display: isDarkMode ? "none" : "block" }}>
        <source src={video3} type="video/mp4" />
      </video>
      <video className="background-video" autoPlay loop muted style={{ display: isDarkMode ? "block" : "none" }}>
        <source src={video2} type="video/mp4" />
      </video>

      {/* Sidebar */}
      <aside className={`sidebar ${isDarkMode ? "dark-sidebar" : "light-sidebar"}`}>
        <h2 className={`sidebar-title ${isDarkMode ? "dark-sidebar" : "light-sidebar"}`}>Admin Panel</h2>
        <ul>
          <li className="user">
            <div className="user1">
              <FaUser className="user-logo" />
            </div>
            <div className="user2">
              Welcome, Admin<br />
              <a href="/" id="logout-link">Logout</a>
            </div>
          </li>
        </ul>
        <nav>
          <ul>
            {[
              { key: "dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
              { key: "staff-management", icon: <FaUsers />, label: "Staff Management" },
              { key: "nr-list", icon: <FaUsers />, label: "Nr List" },
              { key: "students-per-branch", icon: <FaUsers />, label: "Branch wise list" },
              { key: "students-per-year", icon: <FaUsers />, label: "year wise  list" },
              { key: "hall-management", icon: <FaBuilding />, label: "Hall Management" },
              { key: "allocation-process", icon: <FaTasks />, label: "Allocation Process" },
              { key: "view-allocation", icon: <FaEye />, label: "View Allocation" },
            ].map(({ key, icon, label }) => (
              <li key={key}>
                <button className={`sidebar-option ${activeTab === key ? "active" : ""}`} onClick={() => setActiveTab(key)}>
                  {icon} {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main>
        <header className="d-fle">
          <div className="heading">
            <h1>Andhra Polytechnic Kakinada</h1>
            <h2>Exam Seat Arrangement System</h2>
          </div>
          <button id="mode-toggle" onClick={handleModeToggle}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          <div className="date-time">
            <span id="current-date">Date: {currentDate}</span><br />
            <span id="current-time">Time: {currentTime}</span>
          </div>
        </header>

        <section id="tab-content">
          {activeTab === "dashboard" && <h1>Dashboard</h1>}
          {activeTab === "staff-management" && <Staff />}
          {activeTab === "nr-list" && <Student />}
          {activeTab === "students-per-branch" && <Branch />}
          {activeTab === "students-per-year" && <Year />}
          {activeTab === "hall-management" && <Halls />}
          {activeTab === "allocation-process" && <Allocation />}
          {activeTab === "view-allocation" && <View />}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard1;
