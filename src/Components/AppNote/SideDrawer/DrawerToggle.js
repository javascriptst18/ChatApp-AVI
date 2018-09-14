import React, { Fragment } from "react";
import "./DrawerToggle.css";
import Toggle from "../ChatApp/Toggle";
import OrderListChat from "../ChatApp/OrderListChat/OrderListChat";

const drawerToggleButton = props => (
  // asigning click on the onclick listener props.click holds a referens or
  // in otherwords the adress of a method of a function which should get executed when it gets clicked

  <div className="notesHeader">
    <button className="toggle-button" onClick={props.click}>
      <i className="fas fa-bars" />
    </button>
    <Toggle>
      {({ on, toggle }) => (
        <Fragment>
          {on && <OrderListChat />}
          <button className="toggleBtn" onClick={toggle}>
            <i class="fa fa-calendar" aria-hidden="true" />
          </button>
        </Fragment>
      )}
    </Toggle>
    <button className="notesLogout" onClick={props.onClick}>
      {props.btnName}
    </button>
  </div>
);

export default drawerToggleButton;
