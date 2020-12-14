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
import CommunityCard from '../components/Community/CommunityCard'
import Loading from "../components/Loading/Loading";

import compic from "../honda_beat_community.png";
import miatapic from "../mazda_miata_community.png"
import cappic from '../suzuki_cappuccino_community.png'

import "../css/App.css";

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  console.log(data);

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function Admin() {
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


  return (
    <div className="App">
      <div id="outer-container">
        <Sidebar />
        <Navbar />
        <main id="page-wrap">
          <div className="cc-container">
            <CommunityCard pic={miatapic} make="Mazda" model="Miata" years="1990-1997" chassis="NA"/>
            <CommunityCard pic={cappic} make="Suzuki" model="Cappuccino" years="1992-1996" chassis="EA11R" />
            <CommunityCard pic={compic} make="Honda" model="Beat" years="1991-1996" chassis="PP01" />
            

          </div>
        </main>
      </div>
    </div>
  );
}

export default Admin;
