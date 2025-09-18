import React, { useState, useEffect } from "react";
import axios from "axios";
import "./branch.css";

const Branch = () => {
    const [branches] = useState(["Dcme", "Dce", "Dece", "Deee", "Dme"]);
    const [selectedBranch, setSelectedBranch] = useState("");
    const [students, setStudents] = useState([]);

    useEffect(() => {
        if (selectedBranch) {
            axios.get(`http://localhost:8085/students?branch=${selectedBranch}`)
                .then(response => setStudents(response.data))
                .catch(error => console.error("Error fetching students:", error));
        }
    }, [selectedBranch]);

    return (
        <div className="table-hm-hall-management">
            <center>
            <h1><center style={{ textDecoration: "underline" }}>Branch Wise List</center></h1>
            <br />

            {/* Button Container */}
            <div className="branch-buttons-container">
                {branches.map(branch => (
                    <button
                        key={branch}
                        onClick={() => setSelectedBranch(branch)}
                        className={`branch-button ${selectedBranch === branch ? "active" : ""}`}
                    >
                        {branch}
                    </button>
                ))}
            </div>

            {students.length > 0 ? (
                
                <table className="branch-hm-hall-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>PIN NO</th>
                            <th>BRANCH</th>
                            <th>YEAR</th>
                            <th>SCHEME</th>
                            <th>DATE</th>
                            <th>TIME</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.pin_no}</td>
                                <td>{student.branch}</td>
                                <td>{student.year}</td>
                                <td>{student.scheme}</td>
                                <td>{student.date}</td>
                                <td>{student.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : selectedBranch && (
                <p className="no-students">No students found for {selectedBranch}</p>
            )}</center>
        </div>
    );
};

export default Branch;
