import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./CarCard.css";

import firebase from "../../services/firebase";
const storage = firebase.storage();

function CarCardGrad({ car }) {
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
    backgroundImage: `url(${img})`,
  };
  return (
    <Link to={`/carpage?id=${car.id}`} className="car-card">
      <div className="card-overlay">
        <div className="card-like">
          <i className="fas fa-heart"></i> 22
        </div>
        <div className="car-overlay-title">
          <span className="car-year">{car.year}</span>
          <br />
          {car.make} {car.model}
        </div>
        <span className="car-user">
          <i className="fas fa-user"></i> SPEEDYSPEEDBOI
        </span>
      </div>
      <div className="card-photo" style={background}></div>
    </Link>
  );
}

export default CarCardGrad;
