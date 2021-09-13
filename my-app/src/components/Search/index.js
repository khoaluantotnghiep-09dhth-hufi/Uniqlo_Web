import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Item from "./../../components/Category_Product/Item_Product/index";
import { connect } from "react-redux";

import * as actions from "./../../actions/index";
class index extends Component {
  showListProduct = (products, getName) => {
    var { onAddToCart } = this.props;
    var result = null;
    result = products.filter((product) => product.name_product.toLowerCase().includes(getName.toLowerCase())).map((product, index) => {
      return (
          <Col lg="3" className="mt-4">
            <Item
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          </Col>
        );
      });
    return result;
  };
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
