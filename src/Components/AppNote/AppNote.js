import React, { Component } from "react";
import Note from "./Note/Note";
import NoteForm from "./NoteForm/NoteForm";
import firebase from "../Firebase/firebase";
import Toolbar from "./Toolbar/Toolbar";
import SideDrawer from "./SideDrawer/SideDrawer";
import Backdrop from "./Backdrop/Backdrop";
import ChatApp from "./ChatApp/ChatApp";
import "./AppNote.css";

class AppNote extends Component {
  state = {
    notes: [],
    sideDrawerOpen: false,
    showChat: true,
    showNotes: false
  };

  componentDidMount() {
    const previousNotes = this.state.notes;

    firebase
      .database()
      .ref()
      .child("notes");

    firebase
      .database()
      .ref()
      .child("notes")
      .on("child_added", snap => {
        previousNotes.push({
          id: snap.key,
          noteContent: snap.val().noteContent,
          createdAt: snap.val().createdAt,
          eventDate: snap.val().eventDate
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

  addNote = (note, date) => {
    const currentDateAndTime = this.fetchCurrentDate();
    firebase
      .database()
      .ref()
      .child("notes")
      .push()
      .set({
        noteContent: note,
        createdAt: currentDateAndTime,
        eventDate: date
      });
  };

  fetchCurrentDate = () => {
    // Det här ska ändras till något finare
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    return `${date}, ${time} `;
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
        user={this.props.user}
        eventDate={note.eventDate}
      />
    ));
    if (this.state.showNotes) {
      return (
        <div className="chatAppWrapper">
          <div className="containerNote">
            <h2>Notes</h2>
            {toDoList}
            <NoteForm className="chatFooter" addNote={this.addNote} />
          </div>
        </div>
      );
    }
  };

  renderChat = () => {
    if (this.state.showChat) {
      return (
        <div className="chatAppWrapperChat">
          <ChatApp user={this.props.user} logIn={this.props.logIn} />
        </div>
      );
    }
  };

  renderPageIfLoggedIn = () => {
    if (this.props.user) {
      // det var bara user tidigare
      let backdrop;
      if (this.state.sideDrawerOpen) {
        // passing a referens to the function that takes back the sideDrawerOpen
        backdrop = <Backdrop click={this.backdropClickHandler} />;
      }
      return (
        <div className="panik">
          <Toolbar
            drawerClickHandler={this.drawerToggleClickHandler}
            toggleChat={this.toggleChat}
            toggleNotes={this.toggleNotes}
            onClick={this.props.logOut}
            btnName={this.props.btnName}
            user={this.props.user}
          />
          <SideDrawer
            show={this.state.sideDrawerOpen}
            toggleChat={this.toggleChat}
            toggleNotes={this.toggleNotes}
          />
          {backdrop}

          {this.renderNotes()}
          {this.renderChat()}
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
