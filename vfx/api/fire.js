import { firebaseConfig } from "./fireConfig";
import FIREBASE from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

let fireApp = false;
if (FIREBASE.apps.length === 0) {
  fireApp = FIREBASE.initializeApp(firebaseConfig);
} else {
  fireApp = FIREBASE.app();
}

const login = () => {
  //
  let prov = new FIREBASE.auth.GoogleAuthProvider();
  return FIREBASE.auth().signInWithPopup(prov);
};

const logout = () => {
  return FIREBASE.auth().signOut();
};

const firebase = FIREBASE;

const getMe = () => {
  return new Promise((resolve, reject) => {
    FIREBASE.auth().onAuthStateChanged((s) => {
      if (s.uid) {
        resolve(s);
      }
    });
  });
};

const fireDB = FIREBASE.database();

export { firebase, fireApp, logout, login, getMe, fireDB };
