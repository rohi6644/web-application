import React, { useState, useEffect } from "react";
import axios from "axios";
import "./branch.css";
const Year = () => {
    const [branches] = useState(["Dcme", "Dce", "Dece", "Deee", "Dme"]);
    const [years] = useState([1, 2, 3]);
    
    const [selectedBranch, setSelectedBranch] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [students, setStudents] = useState([]);

    useEffect(() => {
        if (selectedBranch && selectedYear) {
            console.log(`Fetching data for: Branch - ${selectedBranch}, Year - ${selectedYear}`);

            axios.get(`http://localhost:8085/year?branch=${selectedBranch}&year=${parseInt(selectedYear)}`)
                .then(response => {
                    console.log("API Response:", response.data);
                    setStudents(response.data);
                })
                .catch(error => console.error("Error fetching students:", error));
        }
    }, [selectedBranch, selectedYear]);

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>Student List by Branch & Year</h2>

            <div  style={{ marginBottom: "20px" }}>
                <label > Select Branch: </label>
                <select onChange={e => setSelectedBranch(e.target.value)} value={selectedBranch}>
                    <option value="">-- Select Branch --</option>
                    {branches.map(branch => (
                        <option key={branch} value={branch}>{branch}</option>
                    ))}
                </select>
            </div>

            {selectedBranch && (
                <div style={{ marginBottom: "20px" }}>
                    <label>Select Year: </label>
                    <select onChange={e => setSelectedYear(e.target.value)} value={selectedYear}>
                        <option value="">-- Select Year --</option>
                        {years.map(year => (
                            <option key={year} value={year}>{year} Year</option>
                        ))}
                    </select>
                </div>
            )}

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
            ) : selectedBranch && selectedYear && (
                <p>No students found for {selectedBranch} - {selectedYear} Year.</p>
            )}
        </div>
    );
};

export default Year;
