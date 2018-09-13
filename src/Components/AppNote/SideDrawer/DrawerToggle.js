import React from "react";
import "./DrawerToggle.css";

const drawerToggleButton = props => (
  // asigning click on the onclick listener props.click holds a referens or
  // in otherwords the adress of a method of a function which should get executed when it gets clicked

  // <div className="notesWrapper">
  <div className="notesHeader">
    <button className="toggle-button" onClick={props.click}>
      <i className="fas fa-bars" />
    </button>
    <div className="spacer" />
    <button className="notesLogout" onClick={props.onClick}>
      {props.btnName}
    </button>
  </div>
  // </div>
);

export default drawerToggleButton;
