import React from "react";
import Navbar from "../components/navbar/Navbar.js";
import Sidebar from "../components/Sidebar.js";
import { useLocation } from "react-router-dom";
import EditCarComponent from "../components/EditCar/EditCar";
import NewCarComponent from "../components/EditCar/NewCar";
import "../css/App.css";

import firebase from "../services/firebase";

import { useAuthState } from "react-firebase-hooks/auth";

const auth = firebase.auth();

function EditCar() {
  const [user] = useAuthState(auth);
  const location = useLocation().pathname;
  return (
    <div className="App">
      <div id="outer-container">
        <Sidebar />
        <Navbar />
        <main id="page-wrap">
          {location === "/editcar" ? <EditCarComponent /> : <NewCarComponent />}
        </main>
      </div>
    </div>
  );
}

export default EditCar;
