import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar.js";
import Sidebar from "../components/Sidebar.js";
import GarageCarCard from "../components/Garage/GarageCarCard";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/App.css";

import firebase from "../services/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollectionData,
  useCollection,
} from "react-firebase-hooks/firestore";

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

function Garage() {
  const [isUsersGarage, setIsUsersGarage] = useState(false);
  const [cars, setCars] = useState([]);
  const [owner, setOwner] = useState("");

  const [user] = useAuthState(auth);
  const urlParams = new URLSearchParams(window.location.search);
  const uid = urlParams.get("user");
  
  const [userValue, userLoading, userError] = useCollection(
    firestore.collection("users").where("user", "==", uid),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [carValue, carLoading, carError] = useCollection(
    firestore.collection("cars").where("user", "==", uid),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    const carList = [];
    if (!carLoading && !userLoading) {
      const res = carValue.docs.map((doc) => {
        carList.push({ id: doc.id, data: doc.data() });
      });
      setIsUsersGarage(user && user.uid === userValue.docs[0].data().user);
      setOwner(userValue.docs[0].data().username);
      setCars(carList);
    }
  }, [carLoading, userLoading]);

  console.log(cars);
  return (
    <div className="App">
      <div id="outer-container">
        <Sidebar />
        <Navbar />
        <main id="page-wrap">
          {!userLoading && !carLoading ? (
            <>
              <h1 className="garage-header">
                <Link to="/newcar">
                  {isUsersGarage && (
                    <Button className="btn-success add-car-btn">New Car</Button>
                  )}
                </Link>
                <strong>
                  <i className="fas fa-warehouse"></i>{" "}
                  <span className="garage-owner">{owner}'s</span>
                </strong>{" "}
                Garage
              </h1>
              {cars.map((car) => (
                <GarageCarCard car={car} isOwner={isUsersGarage} />
              ))}
              {cars.length === 0 && <h4>This user has no cars</h4>}
            </>
          ) : (
            <>Loading...</>
          )}
        </main>
      </div>
    </div>
  );
}

export default Garage;
