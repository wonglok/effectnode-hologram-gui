import { firebaseConfig } from "./fireConfig";
import FIREBASE from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { SiteConfig } from "./siteConfig";

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

function emailLoginLink({ email }) {
  var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: `https://${
      SiteConfig.domain
    }/cms/email-landing?comesFrom=${encodeURIComponent(`/cms/login`)}`,
    // This must be true.
    handleCodeInApp: true,
  };

  return firebase
    .auth()
    .sendSignInLinkToEmail(email, actionCodeSettings)
    .then((v) => {
      console.log(v);
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem("emailForSignIn", email);

      return v;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...

      console.log(errorCode, errorMessage);
      return Promise.reject(new Error("cannot send"));
    });
}

function loginGithub() {
  let prov = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(prov);
}

const loginGoogle = login;
export {
  firebase,
  fireApp,
  logout,
  login,
  loginGoogle,
  getMe,
  fireDB,
  emailLoginLink,
  loginGithub,
};
