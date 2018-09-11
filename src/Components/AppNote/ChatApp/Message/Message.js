import React from "react";
import { Badge, InputGroup, InputGroupAddon, Button, Input } from "reactstrap";

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
      >
        <Badge color="danger">X</Badge>
      </button>
    );
  } else {
    messageDelete = <button style={none}>Nothing</button>;
  }

  return (
    // <div>
    //   <p>{props.getSender}</p>
    //   <p>{props.textvalue}</p>
    //   <p>{props.timestamp}</p>
    //   {messageDelete}
    // </div>
    <div class="container-fluid">
      <h4>
        <Badge color="success">
          {" "}
          <p className="text-danger">{props.getSender + ":"}</p>
          <p>{props.textvalue}</p>
        </Badge>
      </h4>
      <Badge color="Light" pill>
        {" "}
        <p>{props.timestamp}</p>
      </Badge>{" "}
      {messageDelete}
    </div>
  );
}

export default Message;
