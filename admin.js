import { useState } from 'react'
import axios from "axios"
import'./styles.css';
import { useNavigate } from 'react-router-dom'
export default function Admin() 
{
    const [data, setData] = useState({id:' ', name: '', qualification: '', email: '', password:'',mobile: '',role:'' })
    const [val,setVal]=useState([])
    const Nav = useNavigate();
    const handler=(e)=>
    {
        const {name,value}=e.target
        setData((prevstate)=>
            ({
              ...prevstate,[name]:value
        }))
    }                                                                                                               
    const submithandler=(e)=>
    {
            e.preventDefault();
			const details={id:data.id,name:data.name,qualification:data.qualification,email:data.email,password:data.password,mobile:data.mobile,role:data.role}
           
        
          axios.post('http://localhost:8085/admin',details).then((err,res)=>
          {
            if(res!=='')
            {
                alert('Record Created successfully');
                Nav('/Back')
                setVal(val+1);
            }
            else
            {
                console.log(err);
            }
          })
        
      
    }
    return (
        <>
        
        <video id="video" autoPlay  loop muted style={{marginTop:"0px"}}src="https://videos.pexels.com/video-files/2450251/2450251-uhd_2560_1440_30fps.mp4" />
        
<div class="content">
<center style={{marginTop:"50px"}}>
        <form id="form"  method="post" key={val} onSubmit={submithandler}>
           <center> <div style={{display:"flex",gap:"60px"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <h2 id="reg">REGISTRATION</h2></center>
                <label class="id"><img src="https://cdn-icons-png.flaticon.com/128/8042/8042420.png" alt="no" height="20px"width="20px"/>Name:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text"  name="name" placeholder="Enter your name" required onChange={handler}/><br /><br />
                <label class="id"><img src="https://cdn-icons-png.flaticon.com/128/712/712040.png" alt="no" height="20px"width="20px"/>Email:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="email" name="email" placeholder="Enter email" required onChange={handler}/><br /><br />
                <label class="id"><img src="https://cdn-icons-png.flaticon.com/128/126/126341.png" alt="no" height="20px"width="20px"/>password:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                <input type="password" name="password" placeholder="Enter psssword" required onChange={handler}/><br /><br />
 
                <label class="id"><img src="https://cdn-icons-png.flaticon.com/128/126/126341.png" alt="no" height="20px"width="20px"/>Mobile No:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
                 <input type='number'  name="mobile" placeholder='enter your mobile no.' onChange={handler}/><br/><br/>
                 <label class="id"><img src="https://cdn-icons-png.flaticon.com/128/1321/1321057.png" alt="no" height="20px"width="20px"/>Qualification:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
                 <input type='text'  name="qualification" placeholder='enter your qualification.' onChange={handler}/><br/><br/>
                 <label class="id"><img src="https://cdn-icons-png.flaticon.com/128/1321/1321057.png" alt="no" height="20px"width="20px"/>role:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
                 <input type='text'  name="role" placeholder='enter your role.' onChange={handler}/><br/><br/>

            <input type="submit" name="submit " value="register"/>&nbsp;&nbsp;&nbsp;
            <input type="reset" name="reset" value="Cancel" onclick="myFunction()"/>
                 </form>
                 </center>
                 </div>
        
                 </>
       );
}
