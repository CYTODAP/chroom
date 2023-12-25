import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_EzRgJVnXX2zXVcj6Z6HwYbZu0VBe0JA",
  authDomain: "chatroom-demo-2edd8.firebaseapp.com",
  databaseURL: "https://chatroom-demo-2edd8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatroom-demo-2edd8",
  storageBucket: "chatroom-demo-2edd8.appspot.com",
  messagingSenderId: "667839268461",
  appId: "1:667839268461:web:32ca9e5cfb9d151a34a164",
  measurementId: "G-5QP1V20C2R"
};

const firebase = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(firebase);
const firestore = getFirestore(firebase);
export { firebase, database, firestore }