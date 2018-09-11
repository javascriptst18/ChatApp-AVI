import React, { Component } from "react";
import "./NoteForm.css";

class NoteForm extends Component {
  state = {
    newNoteContent: ""
  };

  // When the user input changes, set the newNoteContent
  // to the value of what's in the input box.
  handleUserInput = e => {
    this.setState({
      newNoteContent: e.target.value // the value of the text input
    });
  };

  writeNote = () => {
    // call a method that sets the noteContent for a note to
    // the value of the input
    this.props.addNote(this.state.newNoteContent);

    // Set newNoteContent back to an empty string.
    this.setState({
      newNoteContent: ""
    });
  };

  render() {
    return (
      <div className="wrapper">
        <input
          className="footer"
          placeholder="Write a new note..."
          value={this.state.newNoteContent}
          onChange={this.handleUserInput}
        />
        <button className="noteButton" onClick={this.writeNote}>
          Add Note
        </button>
      </div>
    );
  }
}

export default NoteForm;
