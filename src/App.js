import React, { Component } from "react";
import firebase, { googleProvider } from "./Components/firebase";
import "./App.css";
import LoginComponent from "./Components/LoginComponent";
// import Note from "./Components/Note/Note";
import AppNote from "./Components/AppNote";

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
          user: user.displayName,
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
        <div>
          <AppNote
            btnName={this.state.btnName}
            logOut={this.logOut}
            user={this.state.user}
          />
        </div>
      );
    }
    // There is a logged in user = FALSE
    if (this.state.currentScreen === "LoginScreen") {
      return <LoginComponent btnName={this.state.btnName} logIn={this.logIn} />;
    }
  }
}

export default App;
