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

import {toast, ToastContainer }from"react-toastify";
import"react-toastify/dist/ReactToastify.css";
import "./admin.css";

import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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
    <MaUTable {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell className="head" {...column.getHeaderProps()}>{column.render("Header")}</TableCell>
            ))}
          </TableRow>
        ))}
      </thead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <TableCell {...cell.getCellProps()}>{cell.render("Cell")}</TableCell>;
              })}
            </TableRow>
          );
        })}
      </TableBody>

    </MaUTable>

  );
}

function Admin() {
  const toastId = React.useRef(null);

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


  //call firebase delete funtion
  const handleDelete = async (id) => {


    const deleteRef = firestore.collection("cars").doc(`${id}`);
    await deleteRef.delete().then(function() {
      console.log("Document successfully deleted!");
      toastId.current = toast("Save success!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });


    //Call Firebase here
    console.log("delete", id);
  };

  const columns = React.useMemo(() => [
    {
      Header: "ID",
      accessor: "id",
      Footer: info => {
        const total = React.useMemo(
            () => info.rows.reduce((sum, row) => row.values.age + sum, 0),
            [info.rows]
        );
        return <>Average Age: {total / info.rows.length}</>;
      }
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
            handleDelete(row.values.id);
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      ),
    },
  ]);

  // col
  return (
    <div className="App">
      <div id="outer-container">
        <ToastContainer/>
        <Sidebar />
        <Navbar />
        <main id="page-wrap">
          <h3 className="admin-style">Admin</h3>
          <div className="red">

            {!loading ? <Table data={cars} columns={columns}/> : <Loading />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Admin;
