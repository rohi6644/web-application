import axios from "axios";
import  React, {  useState } from "react"
import { useParams } from "react-router-dom";
import First from './menu';
import Foot from"./footer";

export default function About(){
    const [data,setData]=useState([]);
  const params=useParams();
      const {id}=params;
      
       React.useEffect(()=>{
        axios.get(`http://localhost:8085/empdetails/${id}`).then((res)=>{
            if(res!==''){
            setData({id:res.data[0].id,name:res.data[0].name,email:res.data[0].email,password:res.data[0].password,mobile:res.data[0].mobile,designation:res.data[0].designation,reported_to:res.data[0].reported_to,date_of_join:res.data[0].date_of_join,gender:res.data[0].gender,salary:res.data[0].salary});
        }
        else{
            console.log("data error");
        }
    })
    },[id]);
    
    return (
        <>
       <First/>
       <br/><br/><br/><br/>
       <body id="sal>">
        <center> <h1 style={{color:'#4c7766',marginTop:'100px'}}>Employee Details</h1></center>
        <table border={'2'} cellPadding={'5'} cellSpacing={'5'} align="center">
            <thead>
            <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Mobile No</th>
                <th>Designation</th>
                <th>Reportedto</th>
                <th>Date of join</th>
                <th>Gender</th>
                <th>Salary</th>
            </tr></thead>
            <tbody>
     
           
       
       <tr>
           <td>{data.id}</td>
           <td>{data.name}</td>
           <td>{data.email}</td> 
           <td>{data.password}</td>
           <td>{data.mobile}</td>
           <td>{data.designation}</td>
           <td>{data.reported_to}</td>
           <td>{data.date_of_join}</td>
           <td>{data.gender}</td>

            <td>{data.salary}</td>
      </tr>
            
</tbody>
        </table>
        </body><br/><br/><br/><br/><br/>
        <Foot/>
       
        </>
    )
}