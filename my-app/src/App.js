import React, { Component } from "react";

import Admin from "./screens/Screen_Admin/index";
import Client from "./Client/index";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/" component={Client} />
        </Switch>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    );
  }
}

export default App;
