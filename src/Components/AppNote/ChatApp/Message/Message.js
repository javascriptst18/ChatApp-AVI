import React from "react";
// import { Badge, InputGroup, InputGroupAddon, Button, Input } from "reactstrap";

function Message(props) {
  // Only admin users can delete messages
  const none = {
    display: "none"
  };
  let messageDelete;
  if (props.user === ("Vicente Tirado" || "Alan Habib" || "Igor Semiz")) {
    messageDelete = (
      <button
        onClick={() => {
          props.deleteMessage(props.keyDelete);
        }}
      />
    );
  } else {
    messageDelete = <button>Nothing</button>;
  }

  return (
    <div className="note">
      <p>{props.getSender + ":"}</p>
      <p className="noteContent">{props.textvalue}</p>
      <p>{props.timestamp}</p>
      {messageDelete}
    </div>
  );
}

export default Message;
