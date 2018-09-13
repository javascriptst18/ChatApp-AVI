import React, { Component } from "react";
import "./Note.css";
import PropTypes from "prop-types";

class Note extends Component {
  handleRemoveNote = id => {
    this.props.removeNote(id);
  };

  render() {
    const none = {
      display: "none"
    };
    let messageDelete;
    if (this.props.user.displayName === ("Vicente Tirado", "Alan. ATB")) {
      messageDelete = (
        <button onClick={() => this.handleRemoveNote(this.props.noteId)}>
          Delete
        </button>
      );
    } else {
      messageDelete = <button style={none}>Delete</button>;
    }

    return (
      <div className="note fade-in">
        {messageDelete}
        {this.props.noteContent}
        <p>{this.props.eventDate}</p>
      </div>
    );
  }
}

Note.propTypes = {
  noteContent: PropTypes.string
};

export default Note;
