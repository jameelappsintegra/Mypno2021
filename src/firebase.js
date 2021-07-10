import firebase from "firebase";
require("firebase/auth");
require("firebase/database");

const config = {
  apiKey: "AIzaSyC_YtYa_XQDcodmzlNd-5TuBcMoy8MAvX0",
  authDomain: "mypno2021.firebaseapp.com",
  databaseURL: "https://mypno2021-default-rtdb.firebaseio.com",
  projectId: "mypno2021",
  storageBucket: "mypno2021.appspot.com",
  messagingSenderId: "892560703573",
  appId: "1:892560703573:web:98eb8f8fdeefc35e0554dc",
  measurementId: "G-DTCY33H8GM",
};

let firebaseCache;

export const getFirebase = () => {
  if (firebaseCache) {
    return firebaseCache;
  }

  firebase.initializeApp(config);
  firebaseCache = firebase;
  return firebase;
};
