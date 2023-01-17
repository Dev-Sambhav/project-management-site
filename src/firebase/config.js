import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBLiiJ3JSvVWbuZpNfOdgyO4ddhW2S0cUU",
  authDomain: "project-management-site-524ae.firebaseapp.com",
  projectId: "project-management-site-524ae",
  storageBucket: "project-management-site-524ae.appspot.com",
  messagingSenderId: "713795915786",
  appId: "1:713795915786:web:49e6e84c2930882ad94ff3",
};

// initialize the firebase app with firebase config
firebase.initializeApp(firebaseConfig);

// start the required firebase services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp, googleProvider };
