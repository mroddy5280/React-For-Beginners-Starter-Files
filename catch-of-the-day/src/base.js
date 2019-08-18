import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAcH8wfKU7IIx_AniZFqvlGtu1w_0ORvbw',
  authDomain: 'cotd-markroddy-690e1.firebaseapp.com',
  databaseURL: 'https://cotd-markroddy-690e1.firebaseio.com',
  // projectId: "cotd-markroddy",
  // storageBucket: "",
  // messagingSenderId: "1089483687198",
  // appId: "1:1089483687198:web:0d7425141fa2869c"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;
