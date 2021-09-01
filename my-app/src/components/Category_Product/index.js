import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import Silder_Collection from './../Slider_Collection/index'
import { connect } from "react-redux";

import * as actions from "./../../actions/index";

class index extends Component {
  render() {
    var { children, location } = this.props;
    console.log(location);
    return (
      <Container className="mt-4">
      <Row><Silder_Collection/></Row>
        <Row>{children}</Row>

        <Row></Row>
      </Container>
    );
  }
}
var mapStateToProps = (state) => {
  return {
    cart: state.cart,
    products: state.products,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onDeleteInCart: (product) => {
      dispatch(actions.removeToCart(product));
    },
    onUpdateQuantityCart: (product, quantity) => {
      dispatch(actions.updateQuantity(product, quantity));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
