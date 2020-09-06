import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBYsghOwIBIzL9lFaeBPmwtnlsF4LuJa8E",
  authDomain: "facebook-messenger-clone-byme.firebaseapp.com",
  databaseURL: "https://facebook-messenger-clone-byme.firebaseio.com",
  projectId: "facebook-messenger-clone-byme",
  storageBucket: "facebook-messenger-clone-byme.appspot.com",
  messagingSenderId: "658455402259",
  appId: "1:658455402259:web:aa8ac13e88d1c9f1872ce6",
});

const db = firebaseApp.firestore();

export default db;
