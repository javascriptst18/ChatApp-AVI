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
    if (this.props.user === ("Vicente Tirado", "Alan. ATB")) {
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
        {/* <span
          className="closebtn"
          onClick={() => this.handleRemoveNote(this.props.noteId)}
        >
          <Badge className="text-danger" color="dark">
            {" "}
            &times;
          </Badge>
        </span> */}
        {/* <Badge color="success"> */}
        {this.props.noteContent}
        <p>{this.props.eventDate}</p>
        {/* </Badge> */}
      </div>
    );
  }
}

Note.propTypes = {
  noteContent: PropTypes.string
};

export default Note;
