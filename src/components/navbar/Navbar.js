import React from "react";
import "./Navbar.css";
import { Link, useHistory } from "react-router-dom";
import { Button, Form, Navbar, Dropdown } from "react-bootstrap";
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
    <Navbar sticky="top" className="nav-top">
      <Navbar.Brand>
        <span id="gear">GEAR</span>
        <span id="heads">HEADS</span>
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        {user ? <SignOut user={user} /> : <SignIn />}
      </Navbar.Collapse>
    </Navbar>
  );
}

function SignIn() {
  return (
    <Link to="/login">
      <Button className="sign-in btn-secondary">
        <FontAwesomeIcon icon={faSignInAlt} />
      </Button>
    </Link>
  );
}

function SignOut({ user }) {
  const history = useHistory();
  return (
    auth.currentUser && (
      <div className="sign-out">
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            <div className="circular-image">
              <img src={user.photoURL} />
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu alignRight>
            <Dropdown.Item
              eventKey="1"
              onClick={() => {
                auth.signOut();
                history.push("/")
              }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
            </Dropdown.Item>
            {/* <Dropdown.Item>Profile</Dropdown.Item> */}
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

export default Nb;
