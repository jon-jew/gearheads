import React, { useState, useReducer, useEffect } from "react";
import { useTable } from "react-table";
import { Accordion, Col, Button, Form, InputGroup } from "react-bootstrap";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import {
  faSearch,
  faCar,
  faCaretDown,
  faCaretUp,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";

import firebase from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollectionData,
  useCollection,
} from "react-firebase-hooks/firestore";

import Navbar from "../components/navbar/Navbar.js";
import Sidebar from "../components/Sidebar.js";
import CAR_MODELS from "../resources/CAR_MODELS";
import CommunityPageHeader from "../components/Community/CommunityPageHeader";
import Loading from "../components/Loading/Loading";

import compic from "../honda_beat_community.png";
import miatapic from "../mazda_miata_community.png";
import cappic from "../suzuki_cappuccino_community.png";

import "../css/App.css";

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

function CommunityPage() {
  const [user] = useAuthState(auth);
  const [userValue, userLoading, userError] = useCollectionData(
    firestore.collection("users").where("user", "==", user ? user.uid : ""),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const carsRef = firestore.collection("cars");
  const query = carsRef.orderBy("make");
  const [cars, loading, error] = useCollectionData(query, { idField: "id" });

  const urlParams = new URLSearchParams(window.location.search);
  const make = urlParams.get("make");
  const model = urlParams.get("model");
  const chassis = urlParams.get("chassis");

  return (
    <div className="App">
      <div id="outer-container">
        <Sidebar />
        <Navbar />
        <main id="page-wrap">
          <div className="cc-page-container">
            <CommunityPageHeader pic={compic} make={make} model={model} chassis={chassis} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default CommunityPage;
