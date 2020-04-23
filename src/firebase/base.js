import * as firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDj-llFQE-Dd-LDZ_qwWw5V-QLcIzmTYqw',
  authDomain: 'shippose.firebaseapp.com',
  databaseURL: 'https://shippose.firebaseio.com',
  projectId: 'shippose',
  storageBucket: 'shippose.appspot.com',
  messagingSenderId: '156601874821',
  appId: '1:156601874821:web:67fa4e711bac5cdf956cec',
  measurementId: 'G-31QGR5BCLE',
};
  // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default app;
