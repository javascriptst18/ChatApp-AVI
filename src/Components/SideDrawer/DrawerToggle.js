import React from "react";
import "./DrawerToggle.css";

const drawerToggleButton = props => (
  // asigning click on the onclick listener props.click holds a referens or
  // in otherwords the adress of a method of a function which should get executed when it gets clicked
  <button className="toggle-button" onClick={props.click}>
    {/* <div className="toggle-button__line" />
    <div className="toggle-button__line" />
    <div className="toggle-button__line" /> */}
    <i className="fas fa-bars" />
  </button>
);

export default drawerToggleButton;
