import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

let config = {
  apiKey: "AIzaSyAPSy3TtiJIBNtAxsUtE6D3JhIB9IV1DM0",
  authDomain: "gearheads-5e6d9.firebaseapp.com",
  projectId: "gearheads-5e6d9",
  storageBucket: "gearheads-5e6d9.appspot.com",
  messagingSenderId: "516595255892",
  appId: "1:516595255892:web:d4ca98aa90bf57366f3bc1",
  measurementId: "G-MHSTY8L3X2",
};

firebase.initializeApp(config);

export default firebase;
