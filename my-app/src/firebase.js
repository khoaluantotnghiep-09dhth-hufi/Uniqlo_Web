import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/auth'
const firebaseConfig = {
  // apiKey: "AIzaSyAM8WwOwWujkx9BDUX8auG7SB5O-gqML9I",
  // authDomain: "otp-forgot-password-4084c.firebaseapp.com",
  // projectId: "otp-forgot-password-4084c",
  // storageBucket: "otp-forgot-password-4084c.appspot.com",
  // messagingSenderId: "603321710433",
  // appId: "1:603321710433:web:192ff82db5c67b7b94f720"

  apiKey: "AIzaSyCcddxHm9PBTUgisQK7MK5Xvrad_mJxIJs",
  authDomain: "qlsv-61c6d.firebaseapp.com",
  databaseURL: "https://qlsv-61c6d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "qlsv-61c6d",
  storageBucket: "qlsv-61c6d.appspot.com",
  messagingSenderId: "353065655107",
  appId: "1:353065655107:web:7a6360631d132df2c7adf6",
  measurementId: "G-NDLZKBJ2EQ"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export default firebase
