import React from "react";

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
    <div class="speech-bubble">
      {messageDelete}
      {props.textvalue}
      {props.getSender + ": "}
      {props.timestamp}
    </div>
  );
}

export default Message;
