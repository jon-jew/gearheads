import React, { Component, useRef, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const background = {
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundImage:
    "url(http://speedhunters-wp-production.s3.amazonaws.com/wp-content/uploads/2017/01/23200823/DSC09986N-1200x800.jpg)",
};

function Picture() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            src="http://speedhunters-wp-production.s3.amazonaws.com/wp-content/uploads/2017/01/23200823/DSC09986N-1200x800.jpg"
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
