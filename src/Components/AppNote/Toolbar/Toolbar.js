import React from "react";
// import "./Toolbar.css";
import DrawerToggle from "../SideDrawer/DrawerToggle";

const toolbar = props => (
  <nav class="navbar navbar-light bg-success">
    <DrawerToggle
      click={props.drawerClickHandler}
      btnName={props.btnName}
      onClick={props.logOut}
    />
  </nav>
);

export default toolbar;
