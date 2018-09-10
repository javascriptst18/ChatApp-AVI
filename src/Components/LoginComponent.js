import React, { Component } from "react";

function LoginComponent(props) {
  return (
    <div>
      <button onClick={props.logIn}>{props.btnName}</button>
    </div>
  );
}

export default LoginComponent;
