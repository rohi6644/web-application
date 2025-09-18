/*

import React, { useState } from "react";
import axios from "axios";
import "./Allocation.css";
const Allocation = () => {
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [hallId, setHallId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seating, setSeating] = useState([]);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [faculty, setFaculty] = useState([]);
  const [error, setError] = useState("");

  const availableBranches = ["Dcme", "Dece", "Deee", "Dme", "Dce"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8085/get-seating-arrangement", {
        selectedBranches,
        hallId,
        date,
        time,
      });

      if (response.data && Array.isArray(response.data.seating)) {
        setSeating(response.data.seating);
        setRows(response.data.rows || 0);
        setCols(response.data.columns || 0);
        setFaculty(response.data.faculty || []);
      } else {
        setSeating([]);
        setRows(0);
        setCols(0);
        setFaculty([]);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching seating arrangement");
      setSeating([]);
      setRows(0);
      setCols(0);
      setFaculty([]);
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById("print-area").innerHTML;
    const newWindow = window.open("", "_blank", "width=800,height=600");
    newWindow.document.write(`
      <html>
        <head>
        <title></title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: center; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          ${printContent}
          <script>
            window.onload = function() {
              window.print();
              window.close();
            }
          </script>
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  return (
    <div className="page-container">
      <h2 id="heading">Seating Arrangement</h2>
      <form onSubmit={handleSubmit} id="form-container">
        <label className="form-label">Select Branches:</label>
        <div id="branches-container">
          {availableBranches.map((branch) => (
            <label key={branch} className="branch-label">
              <input
                type="checkbox"
                value={branch}
                onChange={(e) => {
                  const updated = e.target.checked
                    ? [...selectedBranches, branch]
                    : selectedBranches.filter((b) => b !== branch);
                  setSelectedBranches(updated);
                }}
                checked={selectedBranches.includes(branch)}
                className="branch-checkbox"
              />
              {branch}
            </label>
          ))}
        </div>

        <label className="form-label">Hall ID:</label>
        <input type="text" value={hallId} onChange={(e) => setHallId(e.target.value)} id="hall-input" required />

        <label className="form-label">Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} id="date-input" required />

        <label className="form-label">Time:</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} id="time-input" required />

        <button type="submit" id="submit-button">Get Seating</button>
      </form>

      {error && <p id="error-message">{error}</p>}
      <div style={{ textAlign: "center" }}>
        {faculty.length > 0 && (
          <div id="faculty-container">
            <h3 id="faculty-heading">Faculty Allocation:</h3>
            <div className="faculty-table-container">
              {faculty.map((facultyMember, index) => (
                <div key={index} className="faculty-card">
                  <p><strong>Name:</strong> {facultyMember.faculty_name}</p>
                  <p><strong>Designation:</strong> {facultyMember.faculty_designation}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {seating.length > 0 && rows > 0 && cols > 0 && (
        <div id="seating-container">
          <h3 id="seating-heading">Seating Arrangement:</h3>
          <h4 id="hall-name">Hall ID: {hallId}</h4>
          <div id="seating-grid" style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "10px" }}>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              Array.from({ length: cols }).map((_, colIndex) => {
                const seat = seating.find(s => s.row === rowIndex && s.col === colIndex);
                return (
                  <div key={`${rowIndex}-${colIndex}`} className="seat-box">
                    {seat && seat.pin_no ? (
                      <>
                        <p className="seat-pin">{seat.pin_no}</p>
                        <p className="seat-branch">{seat.branch}</p>
                        <p className="seat-position">Row: {rowIndex + 1}, Col: {colIndex + 1}</p>
                      </>
                    ) : (
                      <p className="seat-empty">Empty</p>
                    )}
                  </div>
                );
              })
            ))}
          </div>
        </div>
      )}

      {seating.length > 0 && faculty.length > 0 && (
        <div>
          <button onClick={handlePrint} id="print-button">Print</button>
          <div id="print-area" style={{ display: "none" }}>
            <h3>Hall Name: {hallId}</h3>
            <h3>Exam Date: {date}</h3>
            <h3>Exam Time: {time}</h3>
            <h3>Faculty Allocation</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Designation</th>
                </tr>
              </thead>
              <tbody>
                {faculty.map((facultyMember, index) => (
                  <tr key={index}>
                    <td>{facultyMember.faculty_name}</td>
                    <td>{facultyMember.faculty_designation}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>Seating Arrangement</h3>
            <table>
              <thead>
                <tr>
                  {Array.from({ length: cols }).map((_, colIndex) => (
                    <th key={colIndex}>Col {colIndex + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: rows }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array.from({ length: cols }).map((_, colIndex) => {
                      const seat = seating.find(s => s.row === rowIndex && s.col === colIndex);
                      return (
                        <td key={`${rowIndex}-${colIndex}`}>
                          {seat && seat.pin_no ? seat.pin_no : "Empty"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Allocation;*/
import React, { useState } from "react";
import axios from "axios";
import "./Allocation.css";

const Allocation = () => {
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [hallId, setHallId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seating, setSeating] = useState([]);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [faculty, setFaculty] = useState([]);
  const [error, setError] = useState("");

  const availableBranches = ["Dcme", "Dece", "Deee", "Dme", "Dce"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8085/get-seating-arrangement", {
        selectedBranches,
        hallId,
        date,
        time,
      });

      if (response.data && Array.isArray(response.data.seating)) {
        setSeating(response.data.seating);
        setRows(response.data.rows || 0);
        setCols(response.data.columns || 0);
        setFaculty(response.data.faculty || []);
      } else {
        setSeating([]);
        setRows(0);
        setCols(0);
        setFaculty([]);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching seating arrangement");
      setSeating([]);
      setRows(0);
      setCols(0);
      setFaculty([]);
    }
  };

  // Calculate student count per branch
  const branchCounts = seating.reduce((acc, student) => {
    acc[student.branch] = (acc[student.branch] || 0) + 1;
    return acc;
  }, {});

  const totalStudents = seating.length;

  // Print Function (Now with the correct `print-area` reference)
  const handlePrint = () => {
    const printContent = document.getElementById("print-area");
    if (printContent) {
      const newWindow = window.open("", "_blank", "width=800,height=600");
      newWindow.document.write(`
        <html>
          <head>
            <title>Seating Arrangement</title>
            <style>
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid black; padding: 8px; text-align: center; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
            <script>
              window.onload = function() {
                window.print();
                window.close();
              }
            </script>
          </body>
        </html>
      `);
      newWindow.document.close();
    } else {
      alert("Error: Print area not found.");
    }
  };

  return (
    <div className="page-container">
      <h2 id="heading">Seating Arrangement</h2>
      <form onSubmit={handleSubmit} id="form-container">
        <label className="form-label">Select Branches:</label>
        <div id="branches-container">
          {availableBranches.map((branch) => (
            <label key={branch} className="branch-label">
              <input
                type="checkbox"
                value={branch}
                onChange={(e) => {
                  const updated = e.target.checked
                    ? [...selectedBranches, branch]
                    : selectedBranches.filter((b) => b !== branch);
                  setSelectedBranches(updated);
                }}
                checked={selectedBranches.includes(branch)}
                className="branch-checkbox"
              />
              {branch}
            </label>
          ))}
        </div>

        <label className="form-label">Hall ID:</label>
        <input type="text" value={hallId} onChange={(e) => setHallId(e.target.value)} id="hall-input" required />

        <label className="form-label">Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} id="date-input" required />

        <label className="form-label">Time:</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} id="time-input" required />

        <button type="submit" id="submit-button">Get Seating</button>
      </form>

      {error && <p id="error-message">{error}</p>}

      {/* This wrapper ensures correct printing */}
      <div id="print-area">
        {/* Faculty Allocation */}
        {faculty.length > 0 && (
          <div id="faculty-container">
            <h3 id="faculty-heading">Faculty Allocation:</h3>
            <table className="faculty-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Designation</th>
                </tr>
              </thead>
              <tbody>
                {faculty.map((facultyMember, index) => (
                  <tr key={index}>
                    <td>{facultyMember.faculty_name}</td>
                    <td>{facultyMember.faculty_designation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Student Count per Branch */}
        {seating.length > 0 && (
          <div id="student-count-container">
            <h3 id="student-count-heading">Student Count</h3>
            <table className="faculty-table">
              <thead>
                <tr>
                  <th>Branch</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(branchCounts).map(([branch, count]) => (
                  <tr key={branch}>
                    <td>{branch}</td>
                    <td>{count}</td>
                  </tr>
                ))}
                <tr>
                  <td><strong>Total</strong></td>
                  <td><strong>{totalStudents}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Seating Arrangement */}
        {seating.length > 0 && rows > 0 && cols > 0 && (
          <div id="seating-container">
            <h3 id="seating-heading">Seating Arrangement:</h3>
            <h4 id="hall-name">Hall ID: {hallId}</h4>
            <div id="seating-grid" style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "10px" }}>
              {Array.from({ length: rows }).map((_, rowIndex) => (
                Array.from({ length: cols }).map((_, colIndex) => {
                  const seat = seating.find(s => s.row === rowIndex && s.col === colIndex);
                  return (
                    <div key={`${rowIndex}-${colIndex}`} className="seat-box">
                      {seat && seat.pin_no ? (
                        <>
                          <p className="seat-pin">{seat.pin_no}</p>
                          <p className="seat-branch">{seat.branch}</p>
                          <p className="seat-position">Row: {rowIndex + 1}, Col: {colIndex + 1}</p>
                        </>
                      ) : (
                        <p className="seat-empty">Empty</p>
                      )}
                    </div>
                  );
                })
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Print Button */}
      {seating.length > 0 && (
        <button onClick={handlePrint} id="print-button">Print</button>
      )}
    </div>
  );
};

export default Allocation;
