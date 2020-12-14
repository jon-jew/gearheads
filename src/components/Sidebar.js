import React from "react";
import { slide as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import firebase from "../services/firebase";
import {
  useCollectionData,
  useCollection,
} from "react-firebase-hooks/firestore";
const auth = firebase.auth();
const firestore = firebase.firestore();


function Sidebar() {
  const [user] = useAuthState(auth);
  const [userValue, userLoading, userError] = useCollectionData(
    firestore
      .collection("users")
      .where("user", "==", user ? auth.currentUser.uid : ""),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  console.log(userValue);
  return (
    <Menu
      id="sidebar"
      pageWrapId={"page-wrap"}
      outerContainerId={"outer-container"}
      styles={styles}
    >
      <NavLink
        to="/"
        id="home"
        className="menu-item"
        activeStyle={{ color: "#692115" }}
      >
        <i className="list-icon fas fa-home"></i> HOME
      </NavLink>
      <NavLink
        to="/community"
        id="explore"
        className="menu-item"
        activeStyle={{ color: "#692115" }}
      >
        <i class="list-icon fas fa-binoculars"></i> EXPLORE
      </NavLink>
      {/* <NavLink
        to="/user/"
        id="explore"
        className="menu-item"
        activeStyle={{ color: "#692115" }}
      >
        <i className="list-icon fas fa-binoculars"></i> MY PROFILE
      </NavLink> */}
      {user && (
        <NavLink
          to={`/profile?user=${user.uid}`}
          id="my-garage"
          className="menu-item"
          activeStyle={{ color: "#692115" }}
        >
          <i className="list-icon fas fa-warehouse"></i> MY GARAGE
        </NavLink>
      )}
      {user && (
        <NavLink
          to={`/liked?user=${user.uid}`}
          id="my-garage"
          className="menu-item"
          activeStyle={{ color: "#692115" }}
        >
          <i className="list-icon fas fa-heart"></i> LIKED CARS
        </NavLink>
      )}
      {(user && !userLoading && userValue[0].admin) && (
        <NavLink
        to={`/admin`}
        id="my-garage"
        className="menu-item"
        activeStyle={{ color: "#692115" }}
      >
        <i class="fas fa-user-shield"></i> ADMIN
      </NavLink>
      )}
    </Menu>
  );
}

export default Sidebar;

var styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "28px",
    height: "20px",
    left: "36px",
    top: "20px",
    zIndex: "100000",
  },
  bmBurgerBars: {
    background: "#FFF",
    height: "10%",
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
