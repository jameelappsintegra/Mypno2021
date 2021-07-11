import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Home from "./pages/home";
import Post from "./pages/post";
import NoMatch from "./pages/no-match";
import Create from "./pages/create";
import SignIn from "./pages/signin";
import Edit from "./pages/edit";
import Toolbar from "./components/Toolbar/Toolbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";

function App() {
  const [sideDrawerOpen, setsideDrawerOpen] = useState(false);

  const drawerToggleClickHandler = () => {
    console.log("====================================");
    console.log(sideDrawerOpen);
    console.log("====================================");
    if (!sideDrawerOpen) {
      setsideDrawerOpen(true);
    }
  };

  const backDropClick = () => {
    if (sideDrawerOpen) {
      setsideDrawerOpen(false);
    }
  };
  let backDrop;

  if (sideDrawerOpen) {
    backDrop = <Backdrop click={backDropClick} />;
  }

  return (
    <Router>
      <Toolbar drawerClickHandler={drawerToggleClickHandler} />
      <SideDrawer show={sideDrawerOpen} />
      {backDrop}
      <main className="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/create" component={Create} />
          <Route path="/edit/:slug" component={Edit} />
          <Route path="/signin" component={SignIn} />
          <Route path="/404" component={NoMatch} />
          <Route path="/:slug" component={Post} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
