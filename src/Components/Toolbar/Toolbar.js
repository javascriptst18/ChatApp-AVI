import React from "react";
import "./Toolbar.css";
import DrawerToggle from "../SideDrawer/DrawerToggle";

const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar_navigation">
      <div className="toolbar_banan_button">
        <DrawerToggle click={props.drawerClickHandler} />
      </div>
      <div className="toolbar_logo">
        <a href="/">
          <i className="fas fa-home" />
        </a>
      </div>
      <div className="spacer" />
      <div className="toolbar_navigation-items">
        <ul>
          <li>
            <a href="/">Notes</a>
          </li>
          <li>
            <a href="/">Chatt</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default toolbar;
