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
    <div className="speech-bubble2">
      {props.getSender + ": "}
      <Card className="bg-success">
        {messageDelete}
        {props.textvalue}
      </Card>
      {props.timestamp}
    </div>
  );
}

export default Message;
