import React, { useContext, createContext } from "react";
import Home from "./pages/Home.js";
import Garage from "./pages/Garage.js";
import CarPage from "./pages/CarPage.js";
import UserProfile from "./pages/UserProfile.js";
import EditCar from "./pages/EditCar.js";
import ScrollToTop from "react-router-scroll-top";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/home" exact component={Home} />
      <Route path="/garage/" exact component={Garage} />
      <Route path="/carpage/" exact component={CarPage} />
      <Route path="/user/" exact component={UserProfile} />
      <Route path="/editcar/" exact component={EditCar} />
      <Route path="/newcar/" exact component={EditCar} />
      <ScrollToTop />
    </Router>
  );
}

export default App;
