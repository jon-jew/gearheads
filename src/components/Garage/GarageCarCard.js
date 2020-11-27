import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Button, Row, Col } from "react-bootstrap";

import "./GarageCarCard.css";

const background = {
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundImage:
    "url(http://speedhunters-wp-production.s3.amazonaws.com/wp-content/uploads/2017/01/23203248/DSC09946NN-1200x800.jpg)",
};

function CarCardGrad({ year, car }) {
  return (
    <div className="garage-car-card">
      <Link to="/carpage" className="car-card">
        <div className="card-overlay">
          <div className="card-like">
            <i className="fas fa-heart"></i> 22
          </div>
          <div className="car-overlay-title">
            <span className="car-year">{year}</span>
            <br />
            {car}
          </div>
        </div>
        <div className="card-photo" style={background}></div>
      </Link>
      <div className="garage-car-card-footer">
        <Row>
          <Col>
            <span className="car-card-stat">Power</span>
            <br />
            250 HP
          </Col>
          <Col>
            <span className="car-card-stat">Torque</span>
            <br />
            250 FT/LB
          </Col>
          <Col>
            <span className="car-card-stat">Weight</span>
            <br />
            2800 LBS
          </Col>
        </Row>
        <Row className="footer-row">
          <Col>
            <span className="car-card-stat">Engine</span>
            <br />
            2.6 L 4G54
          </Col>
          <Col>
            <span className="car-card-stat">Layout</span>
            <br />
            FR
          </Col>
          <Col>
            <span className="car-card-stat">Chassis</span>
            <br />
            A187A
          </Col>
        </Row>
        <div>
          <Link to="/editcar">
            <Button className="edit-car-btn">
              <FontAwesomeIcon icon={faCog} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CarCardGrad;
