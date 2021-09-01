import React, { Component } from "react";

import Admin from "./screens/Screen_Admin/index";
import Client from "./Client/index";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/" component={Client} />
        </Switch>
      </Router>
    );
  }
}

export default App;
