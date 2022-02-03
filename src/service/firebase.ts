import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCLlf1iztV0E-tqsWRgmmhD7ytakuURFBs",
    authDomain: "lizt-5e3c7.firebaseapp.com",
    projectId: "lizt-5e3c7",
    storageBucket: "lizt-5e3c7.appspot.com",
    messagingSenderId: "1094514339315",
    appId: "1:1094514339315:web:75912f62991b66c86d7686"
};

const app = firebase.initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database }