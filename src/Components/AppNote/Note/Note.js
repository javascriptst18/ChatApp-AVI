import React, { Component } from "react";
import "./Note.css";
import PropTypes from "prop-types";
import { Card } from "reactstrap";

class Note extends Component {
  handleRemoveNote = id => {
    this.props.removeNote(id);
  };

  render() {
    const none = {
      display: "none"
    };
    let messageDelete;

    if (this.props.user.displayName === "Alan. ATB") {
      messageDelete = (
        <button
          className="btnDeleteNote"
          onClick={() => this.handleRemoveNote(this.props.noteId)}
        >
          <i class="fas fa-trash" />
        </button>
      );
    } else {
      messageDelete = <button style={none}>Delete</button>;
    }

    return (
      <div className="note fade-in, speech-bubble2 , card-pill">
        <Card className="card-pill">
          <h6>{this.props.noteContent}</h6>
          <p className="p2">{this.props.eventDate}</p>
        </Card>
        {messageDelete}
      </div>
    );
  }
}

Note.propTypes = {
  noteContent: PropTypes.string
};

export default Note;
