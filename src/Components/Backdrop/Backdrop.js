import React from "react";
import "./Backdrop.css";
// in app.js we have a event listener with the click event (backdropClickHandler) which we pass through here
// in form of a onClick method
const backdrop = props => <div className="backdrop" onClick={props.click} />;
export default backdrop;
