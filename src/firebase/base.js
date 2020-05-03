import * as firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5VDSFbqtoa_N79cjfHQ5HbwA4na-Aje8",
  authDomain: "onestep-shipping.firebaseapp.com",
  databaseURL: "https://onestep-shipping.firebaseio.com",
  projectId: "onestep-shipping",
  storageBucket: "onestep-shipping.appspot.com",
  messagingSenderId: "126413263035",
  appId: "1:126413263035:web:9cae4e5a81108c7814d99e",
  measurementId: "G-4JSJ2SKZF8"
};
  // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default app;
