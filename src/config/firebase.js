import * as firebase from "firebase";

const FirebaseConfig = {
  apiKey: 'AIzaSyBXtOCGf7da0SnQHdiN5_Q2Nqh-Riu_xvA',
  authDomain: 'logbee-challenge.firebaseapp.com',
  databaseURL: 'https://logbee-challenge.firebaseio.com',
  storageBucket: 'logbee-challenge.appspot.com',
};

firebase.initializeApp(FirebaseConfig);

export const authRef = firebase.auth()  ;
export const database = firebase.database();
export const tasksRef = database.ref("tasks/");