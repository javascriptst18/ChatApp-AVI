import React, { Component } from "react";
import "./NoteForm.css";

class NoteForm extends Component {
  state = {
    newNoteContent: "",
    newNoteDateContent: ""
  };

  // When the user input changes, set the newNoteContent
  // to the value of what's in the input box.
  handleUserInput = e => {
    this.setState({
      newNoteContent: e.target.value // the value of the text input
    });
  };

  handleDateInput = e => {
    this.setState({
      newNoteDateContent: e.target.value
    });
  };

  writeNote = event => {
    // call a method that sets the noteContent for a note to
    // the value of the input

    this.props.addNote(
      this.state.newNoteContent,
      this.state.newNoteDateContent
    );

    // Set newNoteContent back to an empty string.
    this.setState({
      newNoteContent: "",
      newNoteDateContent: ""
    });
  };

  // This function gets called everytime SEND is clicked and the input text is empty
  emptyWarning = () => {
    alert("Empty input, please write something!");
  };

  render() {
    return (
      <div>
        <form>
          <input
            // className="noteInput"
            placeholder="Write a new note..."
            value={this.state.newNoteContent}
            onChange={this.handleUserInput}
            type="textarea"
          />
          <input
            type="date"
            onChange={this.handleDateInput}
            value={this.state.newNoteDateContent}
          />
          <button
            className="noteButton"
            onClick={() => {
              if (
                this.state.newNoteContent === "" ||
                this.state.newNoteDateContent === ""
              ) {
                this.emptyWarning();
              } else {
                this.writeNote();
              }
            }}
          >
            Add Note
          </button>
        </form>
      </div>
    );
  }
}

export default NoteForm;
