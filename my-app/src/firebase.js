import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyAM8WwOwWujkx9BDUX8auG7SB5O-gqML9I",
  authDomain: "otp-forgot-password-4084c.firebaseapp.com",
  projectId: "otp-forgot-password-4084c",
  storageBucket: "otp-forgot-password-4084c.appspot.com",
  messagingSenderId: "603321710433",
  appId: "1:603321710433:web:192ff82db5c67b7b94f720"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export default firebase
