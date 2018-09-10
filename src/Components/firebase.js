import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBeV2dOmDqB0BL-CR7gc4tbs0mqx9XxPZ0",
  authDomain: "avichat-fc64f.firebaseapp.com",
  databaseURL: "https://avichat-fc64f.firebaseio.com",
  projectId: "avichat-fc64f",
  storageBucket: "avichat-fc64f.appspot.com",
  messagingSenderId: "438157973620"
};

firebase.initializeApp(config);

// Variable to simplify the code later on in our application
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default firebase;
