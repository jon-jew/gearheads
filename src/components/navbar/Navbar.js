import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Button, Navbar, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

import firebase from "../../services/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function Nb() {
  const [user] = useAuthState(auth);

  return (
    <Navbar sticky="top" className="nav">
      <Navbar.Brand>
        <span id="gear">GEAR</span>
        <span id="heads">HEADS</span>
      </Navbar.Brand>
      {user ? <SignOut /> : <SignIn />}
    </Navbar>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <Button className="sign-in" onClick={signInWithGoogle}>
      <FontAwesomeIcon icon={faSignInAlt} />
    </Button>
  );
}

function SignOut() {
  const { uid, photoURL } = auth.currentUser;

  return (
    auth.currentUser && (
      <div className="sign-out">
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            <div className="circular-image">
              <img src={photoURL} />
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="1" onClick={() => auth.signOut()}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
            </Dropdown.Item>
            <Dropdown.Item>Profile</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  );
}

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        Sign Out
      </div>
    );
  }
);

export default Nb;
