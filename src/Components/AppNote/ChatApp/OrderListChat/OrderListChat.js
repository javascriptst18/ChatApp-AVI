import React, { Component } from "react";
import firebase from "../../../Firebase/firebase";

function toArray(firebaseObject) {
  let array = [];
  for (let item in firebaseObject) {
    array.push({ ...firebaseObject[item], key: item });
  }
  return array;
}
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
      // .orderByChild("createdAt")
      .limitToFirst(3)
      .on("value", snap => {
        const updates = toArray(snap.val());
        console.log(updates);
        this.setState({ notes: updates });
      });
  };
  render() {
    const { notes } = this.state;
    const renderLastFive = notes.map((note, i) => {
      return (
        <div key={i}>
          {note.createdAt}
          {note.noteContent}
        </div>
      );
    });
    return <div>{renderLastFive}</div>;
  }
}

export default OrderListChat;
