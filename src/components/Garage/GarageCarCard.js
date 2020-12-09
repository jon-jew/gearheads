import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Button, Row, Col } from "react-bootstrap";

import "./GarageCarCard.css";

import firebase from "../../services/firebase";
const storage = firebase.storage();

function CarCardGrad({ car, isOwner }) {
  const [img, setImg] = useState(null);
  useEffect(() => {
    getCarData();
  }, []);

  const getCarData = async () => {
    await storage
      .ref(`${car.id}/thumbnail.jpg`)
      .getDownloadURL()
      .then(function (url) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function (event) {
          var blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        setImg(url);
      })
      .catch(function (error) {
        // Handle any errors
      });
  };

  const background = {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: `url('${img}')`,
  };

  return (
    <div className="garage-car-card">
      <Link to={`/carpage?id=${car.id}`} className="car-card">
        <div className="card-overlay">
          <div className="card-like">
            <i className="fas fa-heart"></i> 22
          </div>
          <div className="car-overlay-title">
            <span className="car-year">{car.data.year}</span>
            <br />
            {car.data.make} {car.data.model}
          </div>
        </div>
        <div className="card-photo" style={background}></div>
      </Link>
      <div className="garage-car-card-footer">
        <Row>
          <Col>
            <span className="car-card-stat">Power</span>
            <br />
            {car.data.power} HP
          </Col>
          <Col>
            <span className="car-card-stat">Torque</span>
            <br />
            {car.data.torque} FT/LB
          </Col>
          <Col>
            <span className="car-card-stat">Weight</span>
            <br />
            {car.data.weight} LBS
          </Col>
        </Row>
        <Row className="footer-row">
          <Col>
            <span className="car-card-stat">Engine</span>
            <br />
            {car.data.displacement} L {car.data.engine}
          </Col>
          <Col>
            <span className="car-card-stat">Layout</span>
            <br />
            {car.data.layout}
          </Col>
          <Col>
            <span className="car-card-stat">Chassis</span>
            <br />
            {car.data.chassis}
          </Col>
        </Row>
        <div>
          {isOwner && (
            <Link to={`/editcar?id=${car.id}`}>
              <Button className="edit-car-btn btn-secondary">
                <FontAwesomeIcon icon={faCog} />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CarCardGrad;
