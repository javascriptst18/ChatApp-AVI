import React from "react";
import "./Login.css";

function Login(props) {
  return (
    <div className="login">
      <h1 className="login-header">AVI Chat</h1>
      <button className="login-btn" onClick={props.logIn}>
        {props.btnName}
      </button>
    </div>
  );
}

export default Login;
