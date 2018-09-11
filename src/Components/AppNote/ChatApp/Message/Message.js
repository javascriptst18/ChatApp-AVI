import React from "react";
import { Badge, InputGroup, InputGroupAddon, Button, Input } from "reactstrap";

function Message(props) {
  // Only admin users can delete messages
  const none = {
    display: "none"
  };
  let messageDelete;
  if (props.user === ("Vicente Tirado" , "Alan Habib" , "igor Semiz")) {
    messageDelete = (
      <button
        onClick={() => {
          props.deleteMessage(props.keyDelete);
        }}
      >
        <Badge className="text-danger" color = "dark">X</Badge>
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
    <div className="container-fluid"  >
      <h4>
        <Badge color="success">
          <p className="text-dark"></p>
          <p>{props.textvalue}</p>
        </Badge>
      </h4>
      <Badge color="Light" pill>
        
      </Badge>
      <p className = "text-primary">{props.getSender + ": "}{props.timestamp}</p>
      {messageDelete}
    </div>
  );
}

export default Message;
