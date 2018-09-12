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

  // This function gets called everytime SEND is clicked and the input text is empty
  emptyWarning = () => {
    alert("Empty input, please write something!");
  };

  render() {
    return (
      <div>
        <input
          // className="noteInput"
          placeholder="Write a new note..."
          value={this.state.newNoteContent}
          onChange={this.handleUserInput}
          type="textarea"
        />
        <button
          className="noteButton"
          onClick={() => {
            if (this.state.newNoteContent === "") {
              this.emptyWarning();
            } else {
              this.writeNote();
            }
          }}
        >
          Add Note
        </button>
      </div>
    );
  }
}

export default NoteForm;
