import React from "react";
import "./Toolbar.css";
import DrawerToggle from "../SideDrawer/DrawerToggle";

const toolbar = props => (
  <div className="top-wrapper">
    <DrawerToggle click={props.drawerClickHandler} />
  </div>
);

export default toolbar;
