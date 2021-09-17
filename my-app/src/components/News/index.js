import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { connect } from "react-redux";

import * as actions from "./../../actions/index";
class index extends Component {
  
  render() {
    var { match, products } = this.props;
    var getName = match.params.input_Search;
   
    return (
      <Container>
        <h4 className="font-weight-normal" style={{marginTop:'10%',marginBottom:'5%'}}>Tìm kết quả với từ khóa "{getName}"...</h4>
        <Row>{this.showListProduct(products, getName)}</Row>
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
