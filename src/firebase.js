import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRLsSs-B2BrqcD4xEPhxdsGb3pBZ2YHdU",
  authDomain: "remake-vu-calotracker.firebaseapp.com",
  projectId: "remake-vu-calotracker",
  storageBucket: "remake-vu-calotracker.appspot.com",
  messagingSenderId: "301307778462",
  appId: "1:301307778462:web:e32c3c59e58c35ee08f28f",
  measurementId: "G-QGM0Y7J1ZK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore service
const firestore = firebase.firestore();

export default firestore;