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
import "./App.css";
import sideDrawer from "./Components/SideDrawer/SideDrawer";

class App extends Component {
  state = {
    notes: [],
    sideDrawerOpen: false
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

  render() {
    const toDoList = this.state.notes.map(note => (
      <Note
        noteContent={note.noteContent}
        noteId={note.id}
        key={note.id}
        removeNote={this.removeNote}
      />
    ));

    let backdrop;
    if (this.state.sideDrawerOpen) {
      // passing a referens to the function that takes back the sideDrawerOpen
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
          <SideDrawer show={this.state.sideDrawerOpen} />
          {backdrop}
          <main className="main-toolbar">
            <p>This is the page content</p>
          </main>
          <br />
          <div className="heading">Sticky Note</div>
        </div>
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
      </div>
    );
  }
}

export default App;
