import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";

import Home from "./pages/home";
import Post from "./pages/post";
import NoMatch from "./pages/no-match";
import Create from "./pages/create";
import SignIn from "./pages/signin";
import Edit from "./pages/edit";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">
          <h2>My PNO</h2>
        </Link>
      </nav>
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/create" component={Create} />
          <Route path="/edit/:slug" component={Edit} />
          <Route path="/sigin" component={SignIn} />
          <Route path="/404" component={NoMatch} />
          <Route path="/:slug" component={Post} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
