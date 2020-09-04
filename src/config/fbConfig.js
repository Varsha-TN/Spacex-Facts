import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


var config = {
  apiKey: "AIzaSyDY1r589igeQjzSNBFYfDXlmpiXsc14FUU",
  authDomain: "varshioplan.firebaseapp.com",
  databaseURL: "https://varshioplan.firebaseio.com",
  projectId: "varshioplan",
  storageBucket: "varshioplan.appspot.com",
  messagingSenderId: "1001924323459",
  // appId: "1:1001924323459:web:292e7b391c16323aaa53b6"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 