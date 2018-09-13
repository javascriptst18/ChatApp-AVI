import React, { Component } from "react";
import firebase from "../../../Firebase/firebase";

class OrderListChat extends Component {
  state = {
    notes: []
  };

  componentDidMount() {
    this.renderNotesToChatt();
  }
  renderNotesToChatt = () => {
    firebase
      .database()
      .ref()
      .child("notes")
      .orderByChild("eventDate")
      .limitToFirst(5)
      .on("value", snap => {
        let temp = [];
        snap.forEach(child => {
          temp.push(child.val());
        });
        this.setState({ notes: temp });
      });
  };
  render() {
    const { notes } = this.state;
    const renderLastFive = notes.map((note, i) => {
      return (
        <div className="formWrapper">
          <div className="noteContent" key={i}>
            {note.eventDate}
            {note.noteContent}
          </div>
        </div>
      );
    });
    return <div>{renderLastFive}</div>;
  }
}

export default OrderListChat;
