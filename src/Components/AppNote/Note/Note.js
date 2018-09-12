import React, { Component } from "react";
import PropTypes from "prop-types";
import { Badge, InputGroup, InputGroupAddon, Button, Input, Card, CardTitle, CardText } from "reactstrap";

class Note extends Component {
  handleRemoveNote = id => {
    this.props.removeNote(id);
  };

  render() {
    return (

      <div className="note fade-in">
        <span
          className="closebtn"
          onClick={() => this.handleRemoveNote(this.props.noteId)}
        >
         <Badge className="text-danger" color = "dark"> &times;</Badge>
        </span>
        {/* <Badge color="success"> */}
        <Card body>
          <CardTitle>Special Title Treatment</CardTitle>
          <CardText color = "success" >{this.props.noteContent} </CardText>
          
        </Card>
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
