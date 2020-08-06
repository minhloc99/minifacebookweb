import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBmtZRKmnCUxu1Gxs_Ouo0UkCopxYggbDo",
  authDomain: "minifacebookweb.firebaseapp.com",
  databaseURL: "https://minifacebookweb.firebaseio.com",
  projectId: "minifacebookweb",
  storageBucket: "minifacebookweb.appspot.com",
  messagingSenderId: "463647094052",
  appId: "1:463647094052:web:323c1f4dde0242daca6fb1",
  measurementId: "G-31S2ME5S9R",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const ga = firebase.analytics();

export const auth = firebase.auth;
export const db = firebase.database();

export const storage = firebase.storage();
export const storageRef = firebase.storage().ref();
