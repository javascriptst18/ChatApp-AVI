import React from "react";
import { Card } from "reactstrap";

function Message(props) {
  // Only admin users can delete messages
  const none = {
    display: "none"
  };
  let messageDelete;
  if (props.user === ("Vicente Tirado", "Alan. ATB")) {
    messageDelete = (
      <span
        onClick={() => {
          props.deleteMessage(props.keyDelete);
        }}
      />
    );
  } else {
    messageDelete = <button style={none}>Nothing</button>;
  }

  return (
    <div className="speech-bubble2 , card-pill">
      {messageDelete}
      <Card className="card-pill">
        <p className="p1">
          <em>{props.getSender + ": "}</em>
        </p>
        <h6>{props.textvalue}</h6>
        <p className="p2">{props.timestamp}</p>
      </Card>
    </div>
  );
}

export default Message;
