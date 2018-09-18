import React from "react";
import { Card } from "reactstrap";

function Message(props) {
  // Only admin users can delete messages
  const none = {
    display: "none"
  };
  let messageDelete;
  if (props.user.displayName === "Alan. ATB") {
    messageDelete = (
      <button
        className="btnDeleteChat"
        onClick={() => {
          props.deleteMessage(props.keyDelete);
        }}
      >
        <i class="fas fa-trash" />
      </button>
    );
  } else {
    messageDelete = <button style={none}>Delete</button>;
  }

  return (
    <div className="speech-bubble2 , card-pill">
      <img src={props.user.photoURL} className="card-img" alt="User" />
      <Card className="card-pill">
        <p className="p1">
          <em>{props.getSender + ": "}</em>
        </p>
        <h6>{props.textvalue}</h6>
        <p className="p2">{props.timestamp}</p>
      </Card>
      {messageDelete}
    </div>
  );
}

export default Message;
