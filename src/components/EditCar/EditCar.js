import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Button, Row, Col, Form } from "react-bootstrap";

import "./EditCar.css";

function EditCar() {
  return (
    <div className="edit-car-form">
      <Form>
        <Form.Row>
          <Col sm={1}>
            <Form.Control placeholder="Model Year" />
          </Col>
          <Col sm={2}>
            <Form.Control placeholder="Make" />
          </Col>
          <Col sm={2}>
            <Form.Control placeholder="Model" />
          </Col>
          <Col sm={1}>
            <Form.Control placeholder="Trim" />
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
}

export default EditCar;
