import React from "react";
import "./Navbar.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import { Navbar } from "react-bootstrap";
class Nb extends React.Component {
  render() {
    return (
      <Navbar sticky="top" className="nav">
        <Navbar.Brand class="title">
          <span id="gear">GEAR</span>
          <span id="heads">HEADS</span>
        </Navbar.Brand>
        <Link
          to="/login/"
          id="navbar-login"
          className="navbar-item"
          activeStyle={{ color: "#FFF" }}
        >
          LOGIN
        </Link>
        <br />
      </Navbar>
    );
  }
}

export default Nb;
