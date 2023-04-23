// Import the functions you need from the SDKs you need
// import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'


// import { initializeApp } from "firebase/app";
// import {getAuth} from 'firebase/auth';
// import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwAXm_f1XQr7d1P5mUeB8tETybyfDcHh8",
  authDomain: "maxx-d9978.firebaseapp.com",
  projectId: "maxx-d9978",
  storageBucket: "maxx-d9978.appspot.com",
  messagingSenderId: "181009761905",
  appId: "1:181009761905:web:43116af42277abd74efdd0",
  measurementId: "G-D7B89QV3J6"
};

// Initialize Firebase

// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// const auth = getAuth()
// const db=getFirestore(app)
// export { app, auth,db}
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth()
const db = firebase.firestore();

export { db,auth };
export default firebase;
