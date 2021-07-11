import React from "react";
import { Link } from "react-router-dom";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import "./Toolbar.css";

const Toolbar = (props) => {
  return (
    <header className="toolbar">
      <nav className="toolbar__navigation">
        <div>
          <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <div className="toolbar__logo">
          <Link to="/">
            <h2>My PNO</h2>
          </Link>
        </div>
        <div className="spacer"></div>
        <div className="toolbar__navigation-items">
          <ul>
            <li>
              <Link to="/signin">Signin</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Toolbar;
