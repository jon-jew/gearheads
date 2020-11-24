import React from 'react';
import Navbar from '../components/navbar/Navbar.js';
import Sidebar from '../components/Sidebar.js';
import EditCarComponent from '../components/EditCar/EditCar';
import '../css/App.css';

function EditCar(){
  return(
    <div className = "App">
      <div id="outer-container">
        <Sidebar />
        <Navbar />
        <main id="page-wrap">

          <EditCarComponent />

        </main>
      </div>
    </div>
  );
}

export default EditCar;
