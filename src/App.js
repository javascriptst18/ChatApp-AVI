import React, { Component } from "react";
import firebase, { googleProvider } from "./Components/Firebase/firebase";
import "./App.css";
import Login from "./Components/Login/Login";
import AppNote from "./Components/AppNote/AppNote";

class App extends Component {
  state = {
    user: "",
    currentScreen: "LoginScreen",
    btnName: "Google Log in"
  };

  componentDidMount() {
    this.auth();
  }

  // Listening if anyone logs in
  auth = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user,
          currentScreen: "AVIchat",
          btnName: "Log out"
        });
      } else {
        this.setState({
          currentScreen: "LoginScreen",
          btnName: "Google Log in"
        });
      }
    });
  };

  // We send this method down to the children ChatAppComponent
  logOut = () => {
    firebase.auth().signOut();
  };

  // We send this method down to the children LoginComponent
  logIn = () => {
    firebase.auth().signInWithPopup(googleProvider);
  };

  render() {
    // There is a logged in user = TRUE
    if (this.state.currentScreen === "AVIchat") {
      return (
        <AppNote
          btnName={this.state.btnName}
          logOut={this.logOut}
          user={this.state.user}
        />
      );
    }
    // There is a logged in user = FALSE
    if (this.state.currentScreen === "LoginScreen") {
      return <Login btnName={this.state.btnName} logIn={this.logIn} />;
    }
  }
}

export default App;
