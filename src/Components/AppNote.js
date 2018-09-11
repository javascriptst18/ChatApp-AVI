import React, { Component } from "react";
import Note from "./Note/Note";
import NoteForm from "./NoteForm/NoteForm";
// import { DB_CONFIG } from "./Config/config";
// import firebase from "firebase/app";
// import "firebase/database";
import firebase from "./firebase";
import Toolbar from "./Toolbar/Toolbar";
import SideDrawer from "./SideDrawer/SideDrawer";
import Backdrop from "./Backdrop/Backdrop";
import ChatAppComponent from "./ChatAppComponent";
// import Calendar from "./Components/Calendar/Calendar";
import "./AppNote.css";

class AppNote extends Component {
  state = {
    notes: [],
    sideDrawerOpen: false,
    showChat: true,
    showNotes: false
    // isLoggedIn: false // Detta ska tas bort.
  };

  componentDidMount() {
    const previousNotes = this.state.notes;

    // this.app = firebase.initializeApp(DB_CONFIG); Other firebase !!!!!
    // this.database = this.app
    firebase
      .database()
      .ref()
      .child("notes");

    // DataSnapshot
    // this.database.on("child_added", snap => {
    firebase
      .database()
      .ref()
      .child("notes")
      .on("child_added", snap => {
        previousNotes.push({
          id: snap.key,
          noteContent: snap.val().noteContent,
          createdAt: snap.val().createdAt
        });

        this.setState({
          notes: previousNotes
        });
      });

    firebase
      .database()
      .ref()
      .child("notes")
      .on("child_removed", snap => {
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
    const currentDateAndTime = this.fetchCurrentDate();
    firebase
      .database()
      .ref()
      .child("notes")
      .push()
      .set({
        noteContent: note,
        createdAt: currentDateAndTime
      });
  };

  fetchCurrentDate = () => {
    // change the toLocaleDateString to something more fancy
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    return `${date}, ${time}`;
  };

  removeNote = noteId => {
    console.log("from the parent: " + noteId);
    firebase
      .database()
      .ref()
      .child("notes")
      .child(noteId)
      .remove();
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
        noteId={note.id}
        key={note.id}
        removeNote={this.removeNote}
        noteContent={note.noteContent}
        createdAt={note.createdAt}
      />
    ));
    if (this.state.showNotes) {
      return (
        <div className="notesBody">
          {/* <Toggle>
            {({ on, toggle }) => (
              <Fragment>
                <button className="toggleButton" onClick={toggle}>
                  Show/Hide
                </button>
                {on && ( */}
          <div>
            {toDoList}
            <div className="notesFooter">
              <NoteForm addNote={this.addNote} />
            </div>
          </div>
          {/* )}
              </Fragment>
            )}
          </Toggle> */}
        </div>
      );
    }
  };

  renderChat = () => {
    if (this.state.showChat) {
      return (
        <ChatAppComponent
          user={this.props.user}
          btnName={this.props.btnName}
          logIn={this.props.logIn}
          logOut={this.props.logOut}
        />
      );
    }
  };

  // login = () => {
  //   // detta ska tas bort
  //   this.setState({ isLoggedIn: true });
  // };

  renderPageIfLoggedIn = () => {
    if (this.props.user) {
      // detta ska bli this.props.user
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

export default AppNote;
