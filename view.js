/*import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
//import { Link, useNavigate } from 'react-router-dom';
//import { IoSearchSharp } from 'react-icons/io5';
import './HallManagement.css';

 function View() {
    
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8085/viewlist")
            .then((res) => {
                if (res !== '') {
                    setData(res.data);
                }
                else {
                    console.log("data error")
                }
            })
    }, []);
    return (
        <>
            <div className='table-hm-hall-management'>
                <h1><center style={{textDecoration:"underline"}}>ARRANGMENT LIST</center>
                
            </h1>
                <br />
                <table className='hm-hall-table'><tr>
                       
                        <th>PIN NO</th>
                        <th>BRANCH</th>
                        <th>HALLID</th>
                        <th>DATE</th>
                        <th>TIME</th>
                    </tr>

                    {data.map(item => (
                        <tr>
                            
                            <td>{item.pin_no}</td>
                            <td>{item.branch}</td>
                            <td>{item.hallId}</td>
                            <td>{item.date}</td>
                            <td>{item.time}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </>
    )
}
export default View;*/


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HallManagement.css";

function View() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData(); // Fetch all records on load
  }, []);

  // Fetch all records
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8085/viewlist");
      console.log("Fetched Data:", res.data); // Debugging

      if (res.data.length > 0) {
        setData(res.data);
        setError("");
      } else {
        setData([]);
        setError("No records found.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Error fetching data");
    }
  };

  // Truncate all records
  const clearAllData = async () => {
    if (window.confirm("Are you sure you want to delete all records? This cannot be undone.")) {
      try {
        await axios.delete("http://localhost:8085/clear-all");
        alert("All records have been deleted.");
        fetchData(); // Refresh table after deletion
      } catch (err) {
        console.error("Error clearing data:", err);
        alert("Error clearing data.");
      }
    }
  };

  return (
    <>
      <div className="table-hm-hall-management">
        <h1>
          <center style={{ textDecoration: "underline" }}>ARRANGEMENT LIST</center>
        </h1>
        <br />

        {/* Clear Data Button */}
        <div className="clear-all-container">
          <button onClick={clearAllData} className="clear-btn">Clear All Data</button>
        </div>

        {/* Error Message */}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        {/* Data Table */}
        {data.length > 0 && (
          <table className="hm-hall-table">
            <thead>
              <tr>
                <th>PIN NO</th>
                <th>BRANCH</th>
                <th>HALLID</th>
                <th>DATE</th>
                <th>TIME</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.pin_no}</td>
                  <td>{item.branch}</td>
                  <td>{item.hallId}</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default View;
