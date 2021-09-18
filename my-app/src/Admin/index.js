import React, { Component } from "react";
import "./scss/style.scss";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import Login from "./screens/Login/index";
class index extends Component {
  
  
  render() {
    return (
      <Router>
       
              <Switch>
                <Route to="/admin/login" component={Login} />
                {/* <Route to="/admin/home" component={Home} /> */}
              </Switch>
      </Router>
      
    );
  }
}

export default index;
