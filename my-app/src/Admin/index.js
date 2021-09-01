import React, { Component } from "react";
import "./scss/style.scss";
import { BrowserRouter as Router, Route, Switch, HashRouter} from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import Login from "./screens/Login/index";




const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

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
