import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

import './CarCard.css';

const background = {
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundImage:
    "url(https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Nissan350Z-01.jpg/1280px-Nissan350Z-01.jpg)",
};

class CarCardGrad extends React.Component {
  render() {
    return (
      <Link to="/carpage" className="car-card">
        <div className="card-overlay">
          <div className="card-like">
            <i className="fas fa-heart"></i> 22
          </div>
          <div className="car-overlay-title">
            <span className="car-year">{this.props.year}</span>
            <br />
            {this.props.car}
            <div className="car-user">
              <i className="fas fa-user"></i> USERNAME
            </div>
          </div>
        </div>
        <div className="card-photo" style={background}></div>
      </Link>
    );
  }
}

export default CarCardGrad;
