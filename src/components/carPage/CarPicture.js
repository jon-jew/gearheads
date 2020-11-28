import React, { Component, useRef, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";



function Picture({ pic }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const background = {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage:
      `url(${pic})`,
  };

  return (
    <>
      <div
        onClick={handleShow}
        style={background}
        className="picture-exp-small"
      >
        Caption
      </div>
      <Modal show={show} onHide={handleClose} keyboard={false} size="lg">
        <Modal.Body className="picture-modal">
          <img
            className="car-modal-picture"
            src={pic}
          />
        </Modal.Body>
        <Modal.Footer className="picture-modal">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Picture;
