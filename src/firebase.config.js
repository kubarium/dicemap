import firebase from "firebase/app";
import "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBkYlXm2z2MDvJJ60cwiXNk3hbayuRdGFE",
  authDomain: "dicemap-ced28.firebaseapp.com",
  databaseURL: "https://dicemap-ced28.firebaseio.com",
  projectId: "dicemap-ced28",
  storageBucket: "dicemap-ced28.appspot.com",
  messagingSenderId: "667146309486"
};
let db;
//let app;
let currentUser;
try {
  firebase.initializeApp(config);

  firebase.auth().onAuthStateChanged(function(user) {
    console.log(user);
    currentUser = user;
  });
} catch (error) {
  if (error.code !== "app/duplicate-app") {
    console.log(error);
  }
} finally {
  db = firebase.firestore();
  //auth = firebase.auth(app)
}

const signInWithEmailAndPassword = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);
/*
const currentUser = () => firebase
    .auth()
    .currentUser */

export { db, signInWithEmailAndPassword, currentUser };
