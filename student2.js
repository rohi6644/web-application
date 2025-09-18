import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
//import { Link, useNavigate } from 'react-router-dom';
//import { IoSearchSharp } from 'react-icons/io5';
import './HallManagement.css';

 function Student() {
    
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8085/studentlist")
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
                <h1><center style={{textDecoration:"underline"}}>Nr portal list</center>
                
            </h1>
                <br/>
                <table className='hm-hall-table'><tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>PIN NO</th>
                        <th>BRANCH</th>
                        <th>YEAR</th>
                        <th>SCHEME</th>
                        <th>DATE</th>
                        <th>TIME</th>
                    </tr>

                    {data.map(item => (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.pin_no}</td>
                            <td>{item.branch}</td>
                            <td>{item.year}</td>
                            <td>{item.scheme}</td>
                            <td>{item.date}</td>
                            <td>{item.time}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </>
    )
}
export default Student;
