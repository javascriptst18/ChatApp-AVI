import React, { Component, Fragment } from "react";
import Note from "./Note/Note";
import NoteForm from "./NoteForm/NoteForm";
import { DB_CONFIG } from "./Config/config";
import firebase from "firebase/app";
import "firebase/database";
import Toolbar from "./Components/Toolbar/Toolbar";
// import Toggle from "./Toggle/Toggle";
import Toggle from "./ToggleRPC";
import SideDrawer from "./Components/SideDrawer/SideDrawer";
import Backdrop from "./Components/Backdrop/Backdrop";
// import { Router, Route } from "react-router";
import "./App.css";

class App extends Component {
  state = {
    notes: [],
    sideDrawerOpen: false,
    showChat: true,
    showNotes: false,
    isLoggedIn: false
  };

  componentWillMount() {
    const previousNotes = this.state.notes;

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app
      .database()
      .ref()
      .child("notes");

    // DataSnapshot
    this.database.on("child_added", snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent
      });

      this.setState({
        notes: previousNotes
      });
    });

    this.database.on("child_removed", snap => {
      for (var i = 0; i < previousNotes.length; i++) {
        if (previousNotes[i].id === snap.key) {
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        notes: previousNotes
      });
    });
  }

  addNote = note => {
    this.database.push().set({ noteContent: note });
  };

  removeNote = noteId => {
    console.log("from the parent: " + noteId);
    this.database.child(noteId).remove();
  };

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  toggleChat = () => {
    this.setState({
      showChat: true,
      showNotes: false,
      sideDrawerOpen: false
    });
  };

  toggleNotes = () => {
    this.setState({
      showNotes: true,
      showChat: false,
      sideDrawerOpen: false
    });
  };

  renderNotes = () => {
    const toDoList = this.state.notes.map(note => (
      <Note
        noteContent={note.noteContent}
        noteId={note.id}
        key={note.id}
        removeNote={this.removeNote}
      />
    ));
    if (this.state.showNotes) {
      return (
        <div className="notesBody">
          <Toggle>
            {({ on, toggle }) => (
              <Fragment>
                <button className="toggleButton" onClick={toggle}>
                  Show/Hide
                </button>
                {on && (
                  <div>
                    <div className="notesFooter">
                      <NoteForm addNote={this.addNote} />
                    </div>
                    {toDoList}
                  </div>
                )}
              </Fragment>
            )}
          </Toggle>
        </div>
      );
    }
  };

  renderChat = () => {
    if (this.state.showChat) {
      return <h1>CHATAPP MANNEN!</h1>;
    }
  };

  login = () => {
    this.setState({ isLoggedIn: true });
  };

  renderPageIfLoggedIn = () => {
    if (this.state.isLoggedIn) {
      let backdrop;
      if (this.state.sideDrawerOpen) {
        // passing a referens to the function that takes back the sideDrawerOpen
        backdrop = <Backdrop click={this.backdropClickHandler} />;
      }
      return (
        <div className="notesWrapper">
          <div className="notesHeader">
            <Toolbar
              drawerClickHandler={this.drawerToggleClickHandler}
              toggleChat={this.toggleChat}
              toggleNotes={this.toggleNotes}
            />
            <SideDrawer
              show={this.state.sideDrawerOpen}
              toggleChat={this.toggleChat}
              toggleNotes={this.toggleNotes}
            />
            {backdrop}
            <main className="main-toolbar">
              <p>This is the page content</p>
            </main>
            <br />
            <div className="heading">Sticky Note</div>
          </div>
          {this.renderNotes()}
          {this.renderChat()}
          {/* <div className="notesBody">
            <Toggle>
              {({ on, toggle }) => (
                <Fragment>
                  <button className="toggleButton" onClick={toggle}>
                    Show/Hide
                  </button>
                  {on && (
                    <div>
                      <div className="notesFooter">
                        <NoteForm addNote={this.addNote} />
                      </div>
                      {toDoList}
                    </div>
                  )}
                </Fragment>
              )}
            </Toggle>
          </div> */}
        </div>
      );
    } else {
      return <button onClick={this.login}>Logga in</button>;
    }
  };

  render() {
    return <div>{this.renderPageIfLoggedIn()}</div>;
  }
}

export default App;
