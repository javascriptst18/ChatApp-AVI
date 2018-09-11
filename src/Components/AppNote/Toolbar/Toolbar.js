import React from "react";
import "./Toolbar.css";
import DrawerToggle from "../SideDrawer/DrawerToggle";

const toolbar = props => (
  <div className="toolbar">
    <DrawerToggle click={props.drawerClickHandler} />
  </div>
);

export default toolbar;
