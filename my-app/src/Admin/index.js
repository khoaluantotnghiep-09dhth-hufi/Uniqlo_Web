import React, { Component } from "react";
import "./scss/style.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import Login from "./screens/Login/index";
import Home from "./containers/TheContent";

const sessionUser = JSON.parse(sessionStorage.getItem("user"));
class index extends Component {
  render() {
    return (
      <Router>
        <Switch>
            {/* <Route to="/admin/home" component={Home} /> */}
            <Route to="/admin" component={Login} />
        </Switch>

      </Router>

    );
  }
}

export default index;
