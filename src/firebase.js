import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {  
  apiKey: "AIzaSyAWjy8oHhU0MU7m2v-IA3_QntOaCGbZExY",
  authDomain: "svelte-crud-firestore-master.firebaseapp.com",
  databaseURL: "https://svelte-crud-firestore-master-default-rtdb.firebaseio.com",
  projectId: "svelte-crud-firestore-master",
  storageBucket: "svelte-crud-firestore-master.appspot.com",
  messagingSenderId: "822563292032",
  appId: "1:822563292032:web:74a145d992fc164fad7765"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
