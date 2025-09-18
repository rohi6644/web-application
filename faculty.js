import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
//import { Link, useNavigate } from 'react-router-dom';
import './HallManagement.css';
//import { IoSearchSharp } from 'react-icons/io5';
 const Staff=()=> {
    
    
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8085/facultylist")
            .then((res) => {
                if (res.data) {
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
                <h1 ><center style={{textDecoration:"underline"}}>Faculty data</center>

            </h1>
                <br/>
                <table className='hm-hall-table'>
                    <tr>
                        <th>Id</th>
                        <th>FACULTY NAME</th>
                        <th>FACULTY DESIGNATION</th>
                        <th>DEPARTMENT</th>
                        
                    </tr>

                    {data.map(item => (
                        <tr style={{ height: '80px', width: '50%', textAlign: 'center' }}>

                            <td>{item.id}</td>
                            <td>{item.faculty_name}</td>
                            <td>{item.faculty_designation}</td>
                            <td>{item.department}</td>
                            
                        </tr>

                    ))}
                </table>
            </div>
        </>
    )
};
export default Staff;