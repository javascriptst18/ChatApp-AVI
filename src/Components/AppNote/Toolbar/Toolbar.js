import React from "react";
import "./Toolbar.css";
import DrawerToggle from "../SideDrawer/DrawerToggle";

const toolbar = props => (
 
  <nav class="navbar navbar-light bg-success">
  <div className="top-wrapper">
    <DrawerToggle click={props.drawerClickHandler} />
  </div>
  <a class="navbar-brand" href="#">Log out</a>

  </nav>
);

export default toolbar;
