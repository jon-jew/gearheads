import React, { useContext, createContext } from "react";
import Home from "./pages/Home.js";
import Garage from "./pages/Garage.js";
import CarPage from "./pages/CarPage.js";
import UserProfile from "./pages/UserProfile.js";
import EditCar from "./pages/EditCar.js";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Community from "./pages/Community"
import CommunityPage from "./pages/CommunityPage"
import FeedPage from "./pages/FeedPage";

import ScrollToTop from "react-router-scroll-top";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/search" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/profile/" exact component={Garage} />
      <Route path="/carpage/" exact component={CarPage} />
      <Route path="/user/" exact component={UserProfile} />
      <Route path="/editcar/" exact component={EditCar} />
      <Route path="/newcar/" exact component={EditCar} />
      <Route path="/admin/" exact component={Admin} />
      <Route path="/community/" exact component={Community} />
      <Route path="/communitypage/" exact component={CommunityPage} />
      <Route path="/liked" exact component={FeedPage} /> 
      <ScrollToTop />
    </Router>
  );
}

export default App;
