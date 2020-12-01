import React from "react";
import { slide as Menu } from "react-burger-menu";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

class Sidebar extends React.Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Menu
        id="sidebar"
        pageWrapId={"page-wrap"}
        outerContainerId={"outer-container"}
        styles={styles}
      >
        <NavLink
          to="/home"
          id="home"
          className="menu-item"
          activeStyle={{ color: "#692115" }}
        >
          <i class="list-icon fas fa-home"></i> HOME
        </NavLink>
        <NavLink
          to="/user/"
          id="explore"
          className="menu-item"
          activeStyle={{ color: "#692115" }}
        >
          <i class="list-icon fas fa-binoculars"></i> MY PROFILE
        </NavLink>
        <NavLink
          to="/garage/"
          id="my-garage"
          className="menu-item"
          activeStyle={{ color: "#692115" }}
        >
          <i class="list-icon fas fa-warehouse"></i> MY GARAGE
        </NavLink>
      </Menu>
    );
  }
}

export default Sidebar;

var styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    left: "36px",
    top: "14px",
    zIndex: "100000",
  },
  bmBurgerBars: {
    background: "#FFF",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#692115",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
    zIndex: "1000000",
  },
  bmMenu: {
    zIndex: "1000000",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
    overflow: "hidden",
    background: "#FFF",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
  },

  bmOverlay: {
    zIndex: "1000000",
    opacity: "1",
    background: "rgba(0, 0, 0, 0.3)",
  },
};
