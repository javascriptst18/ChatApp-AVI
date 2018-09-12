import React, { Component } from "react";
import "./Note.css";
import PropTypes from "prop-types";
// import {
//   Badge,
//   InputGroup,
//   InputGroupAddon,
//   Button,
//   Input,
//   Card,
//   CardTitle,
//   CardText
// } from "reactstrap";

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
      messageDelete = <button style={none}>Nothing</button>;
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
        <p>{this.props.createdAt} </p>
        {/* </Badge> */}
      </div>
    );
  }
}

Note.propTypes = {
  noteContent: PropTypes.string
};

export default Note;
