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
import CarCardGrad from "../components/CarCard/CarCard";
import Loading from "../components/Loading/Loading";

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

  const history = useHistory();

  useEffect(() => {
    console.log(userValue)
    if (userValue  && !userValue[0].admin) {
        history.push("/");
    }
  }, [userLoading, userValue]);

  const handleDelete = (d) => {
    //Call Firebase here
    console.log("delete", d);
  };

  const columns = React.useMemo(() => [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Make",
      accessor: "make",
    },
    {
      Header: "Model",
      accessor: "model",
    },
    {
      Header: "User",
      accessor: "user",
    },
    {
      Header: () => null,
      id: "expander",
      Cell: ({ row }) => (
        <Button
          variant="light"
          onClick={() => {
            handleDelete(row.values._id);
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      ),
    },
  ]);

  return (
    <div className="App">
      <div id="outer-container">
        <Sidebar />
        <Navbar />
        <main id="page-wrap">
          <div className="card-container">
            Admin
            {!loading ? <Table data={cars} columns={columns} /> : <Loading />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Admin;
