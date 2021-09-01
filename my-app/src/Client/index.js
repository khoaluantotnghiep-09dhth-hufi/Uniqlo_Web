import React, { Component } from "react";
import Header from "./../containers/Header_Container/index";
import Footer from "./../components/Footer/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from './../routes/index';
class Client extends Component {
  showContentRoute = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return result;
  };
  render() {
    return (
      <Router>
        <Header />
        <Switch>{this.showContentRoute(routes)}</Switch>
        <Footer />
      </Router>
    );
  }
}

export default Client;
