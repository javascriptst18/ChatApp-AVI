import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Note.css";

class Note extends Component {
  handleRemoveNote = id => {
    this.props.removeNote(id);
  };

  render() {
    return (
      <div className="note">
        <span
          className="closebtn"
          onClick={() => this.handleRemoveNote(this.props.noteId)}
        >
          &times;
        </span>
        <p>{this.props.createdAt} </p>
        <p className="noteContent">{this.props.noteContent}</p>
      </div>
    );
  }
}

Note.propTypes = {
  noteContent: PropTypes.string
};

export default Note;
