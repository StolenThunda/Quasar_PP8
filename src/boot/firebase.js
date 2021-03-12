import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRpJ4ioTTxDqO2JcdIB0HEIEKcgAB7cTI",
  authDomain: "txba-proplayerv8.firebaseapp.com",
  projectId: "txba-proplayerv8",
  storageBucket: "txba-proplayerv8.appspot.com",
  messagingSenderId: "842822199400",
  appId: "1:842822199400:web:6e2de8930aa880728d73dd"
};

let FBApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = FBApp.auth()
let firebaseDB = FBApp.database()
let firebaseStore = FBApp.firestore()

export {
  firebaseAuth,
  firebaseDB,
  firebaseStore
}