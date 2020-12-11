import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar.js";
import Sidebar from "../components/Sidebar.js";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import SignInButton from "../btn_google_signin_light_normal_web.png";
import PressedButton from "../btn_google_signin_light_pressed_web.png";

import "../css/App.css";

import firebase from "../services/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const auth = firebase.auth();
const firestore = firebase.firestore();

function Login() {
  const history = useHistory();

  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) history.push("/");
  }, [user]);

  return (
    <div className="App">
      <div id="outer-container">
        <main id="page-wrap">
          <div className="login-logo">
            <span id="gear">GEAR</span>
            <span id="heads">HEADS</span>
          </div>
          <SignIn />
        </main>
      </div>
    </div>
  );
}

// function dummySignIn() {
//
//   return
//       <div id="id01" className="modal">
//
//         <form className="modal-content animate" action="/action_page.php" method="post">
//           <div className="imgcontainer">
//             <span onClick="document.getElementById('id01').style.display='none'" className="close"
//                   title="Close Modal">&times;</span>
//             <img src="img_avatar2.png" alt="Avatar" className="avatar">
//           </div>
//
//           <div className="container">
//             <label htmlFor="uname"><b>Username</b></label>
//             <input type="text" placeholder="Enter Username" name="uname" required>
//
//               <label htmlFor="psw"><b>Password</b></label>
//               <input type="password" placeholder="Enter Password" name="psw" required>
//
//                 <button type="submit">Login</button>
//                 <label>
//                   <input type="checkbox" checked="checked" name="remember"> Remember me
//                 </label>
//           </div>
//
//           <div className="container" style="background-color:#f1f1f1">
//             <button type="button" onClick="document.getElementById('id01').style.display='none'"
//                     className="cancelbtn">Cancel
//             </button>
//             <span className="psw">Forgot <a href="#">password?</a></span>
//           </div>
//         </form>
//       </div>
//   )
// }

function SignIn() {
  const usersRef = firestore.collection("users");
  const [hover, setHover] = useState(false);
  const history = useHistory();

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(result.user);
        if (result.additionalUserInfo.isNewUser) {
          usersRef.add({
            user: user.uid,
            username: user.displayName,
            photoURL: user.photoURL,
            likes: [],
            follows: [],
            garage: [],
          });
        }

        history.push("/");
        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        console.error(error);
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  return (


    <Button
      className="google-sign-in"
      onMouseEnter={() => setHover(!hover)}
      onMouseLeave={() => setHover(!hover)}
      onClick={signInWithGoogle}
    >
      <img src={!hover ? SignInButton : PressedButton} />
    </Button>
  );
}

export default Login;
