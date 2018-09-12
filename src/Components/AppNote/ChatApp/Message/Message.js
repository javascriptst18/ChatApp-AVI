import React from "react";
import {
  Badge,
  InputGroup,
  InputGroupAddon,
  Button,
  Input,
  Card,
  CardTitle,
  CardText,
  Col
} from "reactstrap";

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
      >
        <Badge className="text-danger" color="dark">
          X
        </Badge>
      </span>
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
    <div className="container-fluid">
      {messageDelete}
      {/* <h4> */}
      {/* <Badge color="success">
          <p className="text-dark"></p>
          <p>{props.textvalue}</p>
        </Badge>
      </h4>
      <Badge color="Light" pill>
        
      </Badge> */}

      <Col sm="6">
        <Card className="SuccessS">
          <CardTitle>Special Title Treatment</CardTitle>
          <CardText>
            {" "}
            <p className="text-dark" />
            <p>{props.textvalue}</p>
          </CardText>
        </Card>
      </Col>

      <p className="text-warning">
        {props.getSender + ": "}
        {props.timestamp}
      </p>
    </div>
  );
}

export default Message;
