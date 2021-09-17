import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { connect } from "react-redux";
import List_News from './List_News/index'
import * as actions from "./../../actions/index";
class index extends Component {
  
  render() {
    
   
    return (
      <Container>    
        <Row>
<List_News/>
        </Row>
      </Container>
    );
  }
}
var mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

var mapDispatchToProps = (dispatch, props) => {
  return {
    onAddToCart: (product) => {
      dispatch(actions.addToCart(product, 1));
    },
    onGetAllProduct: () => {
      dispatch(actions.fetchProductResquest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
