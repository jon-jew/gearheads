import React, { useState } from "react";
import { Accordion, Col, Button, Form, InputGroup } from "react-bootstrap";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import {
  faSearch,
  faCar,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory, useLocation, useParams } from "react-router-dom";
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

function Home() {
  const [startYear, setStartYear] = useState(1910);
  const [endYear, setEndYear] = useState(new Date().getFullYear() + 1);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [models, setModels] = useState([]);
  const [trim, setTrim] = useState("");
  const [trayOpen, setTrayOpen] = useState(true);

  const carsRef = firestore.collection("cars");

  const query = carsRef.orderBy("make").limit(25);

  const [cars] = useCollectionData(query, { idField: "id" });
  console.log(cars);

  let history = useHistory();
  let { slug } = useParams();

  const formSubmit = (event) => {
    event.preventDefault();
    history.push(
      `/home?${startYear !== "" ? `year=${startYear},` : ""}${
        make !== "" ? `make=${make},` : ""
      }${model !== "" ? `model=${model}` : ""}`
    );
  };

  const onMakeChange = (make) => {
    const newModels = CAR_MODELS.find((e) => e.brand === make).models;
    setMake(make);
    setModels(newModels);
    setModel(newModels[0]);
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
    setStartYear(value[0]);
    setEndYear(value[1]);
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
                            {startYear} - {endYear}
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
                          value={make}
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
                            setModel(e.target.value);
                          }}
                          placeholder="Model"
                          value={model}
                        >
                          <option value="" disabled selected>
                            Model
                          </option>
                          {models.map((model) => (
                            <option>{model}</option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col>
                        <Form.Control
                          placeholder="Trim"
                          value={trim}
                          onChange={(e) => {
                            setTrim(e.target.value);
                          }}
                        />
                      </Col>
                    </Form.Row>
                  </Form>
                </div>
              </Accordion.Collapse>
            </Accordion>
          </Form>
          <div className="card-container">
            {cars ? (
              cars.map((car) => <CarCardGrad car={car} />)
            ) : (
              <div>loading</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
