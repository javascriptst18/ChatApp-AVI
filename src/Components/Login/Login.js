import React from "react";

function Login(props) {
  return (
    <div>
      <button onClick={props.logIn}>{props.btnName}</button>
    </div>
  );
}

export default Login;
