import React from "react";
import Navbar from "../components/navbar/Navbar.js";
import Sidebar from "../components/Sidebar.js";
import GarageCarCard from "../components/Garage/GarageCarCard";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/App.css";


import firebase from "../services/firebase";

import { useAuthState } from "react-firebase-hooks/auth";

const auth = firebase.auth();

function Garage() {
  const [user] = useAuthState(auth);
  console.log(user);
  console.log(auth.currentUser);
  return (
    <div className="App">
      { user ? 
      <div id="outer-container">
        <Sidebar />
        <Navbar />
        <main id="page-wrap">
          <h1 className="garage-header">
            <Link to="/editcar">
              <Button className="btn-success add-car-btn">New Car</Button>
            </Link>
            <strong>
              <i class="fas fa-warehouse"></i> {user.displayName}'s
            </strong>{" "}
            Garage
          </h1>
          <GarageCarCard year={"1988"} car={"MITSUBISHI STARION"} />
          <GarageCarCard year={"1988"} car={"MITSUBISHI STARION"} />
          <GarageCarCard year={"1988"} car={"MITSUBISHI STARION"} />
          <GarageCarCard year={"1988"} car={"MITSUBISHI STARION"} />
        </main>
      </div>
      : <>Loading</>}
    </div>
  );
}

export default Garage;
