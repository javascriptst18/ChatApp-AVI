import React from "react";
// import "./Toolbar.css";
import DrawerToggle from "../SideDrawer/DrawerToggle";

const toolbar = props => (
  <DrawerToggle
    click={props.drawerClickHandler}
    btnName={props.btnName}
    onClick={props.onClick}
  />
);

export default toolbar;
