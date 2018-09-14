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
      <div className="chatFooter">
        <input
          className="noteInput"
          placeholder="Notes here..."
          value={this.state.newNoteContent}
          onChange={this.handleUserInput}
          type="textarea"
        />
        <input
          className="dateInput"
          type="date"
          onChange={this.handleDateInput}
          value={this.state.newNoteDateContent}
        />
        <div className="noteButtonflexContainer">
          <button
            className="noteButtonChat"
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
            <p className="p3">Note</p>
          </button>
        </div>
      </div>
    );
  }
}

export default NoteForm;
