import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Route, Routes } from 'react-router-dom';



import Allocation from "./allocation";
import Student from "./student2";
import Halls from "./hall";
import Staff from "./faculty";
import Login from './login';
import Admins from './adminboard';
import Homes from './homes';
import View from './view';
import Branch from './branch';
import Year from './year';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  
  // </React.StrictMode>
  <BrowserRouter>
    <Routes>
       
    <Route path='/login' element={<Login/>}> </Route>
   
     
    <Route path='/year' element={<Year />}></Route>
    <Route path='/branch' element={<Branch />}></Route>
    <Route path='/view' element={<View />}></Route>
    <Route path='/Login' element={<login />}></Route>
    <Route path="/faculty" element={<Staff />} />
            <Route path="/student2" element={<Student />} />
            <Route path="/hall" element={<Halls />} />
            <Route path="/allocation" element={<Allocation />} />
    <Route path='/adminboard' element={<Admins/>}></Route>
   
 <Route path='/' element={<Homes/>} />

    </Routes>
  </BrowserRouter>
  // <Table/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
