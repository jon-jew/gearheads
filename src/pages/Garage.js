import React from "react";
import Navbar from "../components/navbar/Navbar.js";
import Sidebar from "../components/Sidebar.js";
import GarageCarCard from "../components/Garage/GarageCarCard";
import { Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import "../css/App.css";

function Garage() {
  return (
    <div className="App">
      <div id="outer-container">
        <Sidebar />
        <Navbar />
        <main id="page-wrap">
          <h1 className="garage-header">
            <Link to="/editcar">
              <Button className="btn-success add-car-btn">New Car</Button>
            </Link>
            <strong>
              <i class="fas fa-warehouse"></i> SPEEDYSPEEDBOI'S
            </strong>{" "}
            Garage
          </h1>
          <GarageCarCard year={"1988"} car={"MITSUBISHI STARION"} />
          <GarageCarCard year={"1988"} car={"MITSUBISHI STARION"} />
          <GarageCarCard year={"1988"} car={"MITSUBISHI STARION"} />
          <GarageCarCard year={"1988"} car={"MITSUBISHI STARION"} />
        </main>
      </div>
    </div>
  );
}

export default Garage;
