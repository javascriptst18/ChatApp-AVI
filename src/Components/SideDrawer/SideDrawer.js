import React from "react";
import "./SideDrawer.css";

const sideDrawer = props => {
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <li>
          <a onClick={props.toggleNotes}>Notes</a>
        </li>
        <li>
          <a onClick={props.toggleChat}>Chatt</a>
        </li>
      </ul>
    </nav>
  );
};

export default sideDrawer;
