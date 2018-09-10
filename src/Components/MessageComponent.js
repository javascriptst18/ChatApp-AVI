import React, { Component } from "react";

// Om jag tar bort key={props.key} får jag ingen varning i consolen längre

function MessageComponent(props) {
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
        Delete this Message
      </button>
    );
  } else {
    messageDelete = <button style={none}>Nothing</button>;
  }

  return (
    <div>
      <p>{props.getSender}</p>
      <p>{props.textvalue}</p>
      <p>{props.timestamp}</p>
      {messageDelete}
    </div>
  );
}

export default MessageComponent;
