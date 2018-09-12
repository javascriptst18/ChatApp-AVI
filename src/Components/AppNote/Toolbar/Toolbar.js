import React from "react";
// import "./Toolbar.css";
import DrawerToggle from "../SideDrawer/DrawerToggle";

const toolbar = props => (
  <div>
    {/* className="header clearfix" */}
    <DrawerToggle
      click={props.drawerClickHandler}
      onClick={props.logOut}
      btnName={props.btnName}
    />
  </div>
);

export default toolbar;
