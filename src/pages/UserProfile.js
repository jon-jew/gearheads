import React from 'react';
import Navbar from '../components/navbar/Navbar.js';
import Sidebar from '../components/Sidebar.js';
import InstagramSearch from '../components/InstagramSearch/InstagramSearch.js';
import '../css/App.css';

function UserProfile(){
  return(
    <div className = "App">
      <div id="outer-container">
        <Sidebar />
        <Navbar />
        <main id="page-wrap">

          <InstagramSearch />

        </main>
      </div>
    </div>
  );
}

export default UserProfile;