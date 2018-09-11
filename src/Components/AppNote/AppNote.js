import React, { Component } from "react";
import Note from "./Note/Note";
import NoteForm from "./NoteForm/NoteForm";
import firebase from "../Firebase/firebase";
import Toolbar from "./Toolbar/Toolbar";
import SideDrawer from "./SideDrawer/SideDrawer";
import Backdrop from "./Backdrop/Backdrop";
import ChatApp from "./ChatApp/ChatApp";
import "./AppNote.css";
import { Badge, InputGroup, InputGroupAddon, Button, Input } from "reactstrap";
import styled from "styled-components";

import calendarImage from "./Img/calendar.png";

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
      />
    ));
    if (this.state.showNotes) {
      return (
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="media">
                <img
                  class="align-self-start mr-3"
                  src={calendarImage}
                  alt="Generic placeholder image"
                />

                <div class="media-body">
                  <h5 class="mt-0">AVI Calendar</h5>
                  <p>
                    This is our very awsome Calendar, you will like it when it's
                    finished... :)
                  </p>
                </div>
              </div>
            </div>

            <div class="col">
              <Badge color="warning">{toDoList} </Badge>
              <div className="notesFooter">
                <NoteForm addNote={this.addNote} />
              </div>
            </div>
          </div>
        </div>

        // <div className="notesBody">
        //   <div>
        //     {toDoList}
        //     <div className="notesFooter">
        //       <NoteForm addNote={this.addNote} />
        //     </div>
        //   </div>
        // </div>
      );
    }
  };

  renderChat = () => {
    if (this.state.showChat) {
      return (
        <ChatApp
          user={this.props.user}
          btnName={this.props.btnName}
          logIn={this.props.logIn}
          logOut={this.props.logOut}
        />
      );
    }
  };

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