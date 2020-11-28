import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

import "./CarCard.css";

function CarCardGrad({ year, car, pic }) {
  const background = {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: `url(${pic})`,
  };
  return (
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
        <span className="car-user">
          <i className="fas fa-user"></i> SPEEDYSPEEDBOI
        </span>
      </div>
      <div className="card-photo" style={background}></div>
    </Link>
  );
}

export default CarCardGrad;
