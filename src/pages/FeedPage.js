import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar.js";
import Sidebar from "../components/Sidebar.js";
import CarCard from "../components/CarCard/CarCard";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/App.css";

import firebase from "../services/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollectionData,
  useCollection,
} from "react-firebase-hooks/firestore";
import { setSyntheticLeadingComments } from "typescript";

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

function Garage() {
  const [cars, setCars] = useState([]);

  const [user] = useAuthState(auth);
  const urlParams = new URLSearchParams(window.location.search);
  const uid = urlParams.get("user");

  let carRef = firestore.collection("cars");

  const [userValue, userLoading, userError] = useCollection(
    firestore.collection("users").where("user", "==", user ? user.uid : ""),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const getCarData = async (data) => {
    const carList = [];
    await Promise.all(
      data.map(async (car) => {
        const likedCarRef = await carRef.doc(car).get();
        const likedCar = likedCarRef.data();
        if (likedCar !== undefined) {
          likedCar.id = likedCarRef.id;
          carList.push(likedCar);
        }
      })
    );
    setCars(carList);
  };

  useEffect(() => {
    if (!userLoading) {
      getCarData(userValue.docs[0].data().likes);
    }
  }, [userLoading]);

  return (
    <div className="App">
      <div id="outer-container">
        <Sidebar />
        <Navbar />
        <main id="page-wrap">
          {!userLoading ? (
            <>
              <h1>LIKED CARS</h1>
              {cars.map((car) => (
                <CarCard car={car} />
              ))}
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
