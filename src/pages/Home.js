import React, { useState, useReducer, useEffect } from "react";
import { Accordion, Col, Button, Form, InputGroup } from "react-bootstrap";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import {
  faSearch,
  faCar,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";

import firebase from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import Navbar from "../components/navbar/Navbar.js";
import Sidebar from "../components/Sidebar.js";
import CAR_MODELS from "../resources/CAR_MODELS";
import CarCardGrad from "../components/CarCard/CarCard";

import "../css/App.css";

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

const initForm = {
  year: new Date().getFullYear() + 1,
  make: "",
  model: "",
  trim: "",
};

function formReducer(prevState, { value, key }) {
  let updatedElement = { ...prevState[key] };
  updatedElement = value;
  return { ...prevState, [key]: updatedElement };
}

function Home() {
  const [models, setModels] = useState([]);
  const [form, dispatch] = useReducer(formReducer, initForm);
  const [carRes, setCarRes] = useState([]);
  const [trayOpen, setTrayOpen] = useState(false);

  const carsRef = firestore.collection("cars");

  const query = carsRef.orderBy("make");

  const [cars, loading, error] = useCollectionData(query, { idField: "id" });

  useEffect(() => {
    setCarRes(cars);
  }, [cars]);

  console.log(carRes);
  let history = useHistory();

  const formSubmit = (event) => {
    event.preventDefault();
    const newCars = cars.filter((car) => {
      if (form.model !== '') return car.model === form.model; 
      else if (form.model == '') return car;
      return car.make === form.make;
    });
    setCarRes(newCars);
    history.push(
      `?${form.startYear !== "" ? `year=${form.startYear},` : ""}${
        form.make !== "" ? `make=${form.make},` : ""
      }${form.model !== "" ? `model=${form.model}` : ""}`
    );
  };

  const onMakeChange = (make) => {
    const newModels = CAR_MODELS.find((e) => e.brand === make).models;
    dispatch({ value: make, key: "make" });
    setModels(newModels);
  };

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
      setTrayOpen(!trayOpen)
    );
    return (
      <Button type="button" className="btn-dropdown" onClick={decoratedOnClick}>
        {children}
      </Button>
    );
  }
  const ToggleButton = () => {
    return (
      <div>
        {!trayOpen ? (
          <FontAwesomeIcon icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}{" "}
        <FontAwesomeIcon icon={faCar} />
      </div>
    );
  };

  const handleYearChange = (value) => {
    dispatch({ value: value[0], key: "startYear" });
    dispatch({ value: value[1], key: "endYear" });
  };

  return (
    <div className="App">
      <div id="outer-container">
        <Sidebar />
        <Navbar />
        <main id="page-wrap">
          <Form onSubmit={formSubmit} className="home-searchbar-container">
            <Accordion defaultActiveKey="0">
              <InputGroup id="home-searchbar" size="lg">
                <InputGroup.Prepend>
                  <CustomToggle eventKey="0">
                    <ToggleButton />
                  </CustomToggle>
                </InputGroup.Prepend>
                <Form.Control
                  id="car-searchbar"
                  placeholder="Welcome to Gearheads! Use this to explore other people's cars."
                ></Form.Control>
                <InputGroup.Append>
                  <Button
                    type="submit"
                    id="btn-searchbar"
                    variant="outline-secondary"
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              <Accordion.Collapse eventKey="0">
                <div className="collapse-body">
                  <Form className="car-search-form">
                    <Form.Row className=" car-model">
                      <Col>
                        <div>
                          <Range
                            allowCross={false}
                            defaultValue={[1910, new Date().getFullYear() + 1]}
                            onChange={handleYearChange}
                            min={1910}
                            max={new Date().getFullYear() + 1}
                          />
                          <p>
                            {form.startYear} - {form.endYear}
                          </p>
                        </div>
                      </Col>
                      <Col>
                        <Form.Control
                          as="select"
                          onChange={(e) => {
                            onMakeChange(e.target.value);
                          }}
                          placeholder="Make"
                          value={form.make}
                        >
                          <option value="" disabled selected>
                            Make
                          </option>
                          {CAR_MODELS.map((model) => (
                            <option>{model.brand}</option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col>
                        <Form.Control
                          as="select"
                          onChange={(e) => {
                            dispatch({ value: e.target.value, key: "model" });
                          }}
                          placeholder="Model"
                          value={form.model}
                        >
                          <option value="" disabled selected>
                            Model
                          </option>
                          {models.map((model) => (
                            <option>{model}</option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Form.Row>
                  </Form>
                </div>
              </Accordion.Collapse>
            </Accordion>
          </Form>
          <div className="card-container">
            {!loading && carRes !== undefined ? (
              carRes.map((car) => <CarCardGrad car={car} />)
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
