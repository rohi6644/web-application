import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './HallManagement.css';


export default function Halls() {
    const nav = useNavigate();

    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false); // To toggle modal visibility
    const [selectedHall, setSelectedHall] = useState(null); // Store selected hall data

    useEffect(() => {
        axios.get("http://localhost:8085/hallist")
            .then((res) => {
                if (res !== '') {
                    setData(res.data);
                }
                else {
                    console.log("data error")
                }
            })
    }, []);

    // Function to handle view button click
    const handleViewClick = (hall) => {
        setSelectedHall(hall);  // Store the hall data to show in the modal
        setShowModal(true);      // Open the modal
    };

    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
    };

    // Function to generate seat layout (rows x columns)
    const generateSeatLayout = (rows, columns, benches) => {
        const seats = [];
        let seatCounter = 1; // Optional counter to track seat numbers

        // Iterate through each row
        for (let i = 0; i < rows; i++) {
            const row = [];
            
            // Iterate through each column in a row
            for (let j = 0; j < columns; j++) {
                row.push(
                    <div className="seat" key={`seat-${i}-${j}`}>
                        {seatCounter++} {/* Optional seat number display */}
                    </div>
                );
            }

            seats.push(
                <div className="seat-row" key={`row-${i}`}>
                    {row}
                </div>
            );
        }

        return seats;
    };

    return (
        <>
            <div className='table hm-hall-management'>
                <h1 className='header'>Hall list
                    
                </h1>
                <hr />
                <table className='hm-hall-table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>HALL Name</th>
                            <th>BENCHES</th>
                            <th>ROWS</th>
                            <th>COLUMNS</th>
                            <th>CAPACITY</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.hallId} style={{ textAlign: 'center' }}>
                                <td>{item.hallId}</td>
                                <td>{item.hall_name}</td>
                                <td>{item.benches}</td>
                                <td>{item.rows}</td>
                                <td>{item.columns}</td>
                                <td>{item.capacity}</td>
                                <td>
                                    <button onClick={() => handleViewClick(item)}>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for displaying the seat layout */}
            {showModal && selectedHall && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>×</span>
                        <h2>Seat Layout for {selectedHall.hall_name}</h2>
                        <div className="seat-layout">
                            {generateSeatLayout(selectedHall.rows, selectedHall.columns, selectedHall.benches)}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
