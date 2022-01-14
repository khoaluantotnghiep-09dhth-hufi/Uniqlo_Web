import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "./../../actions/index";
import Item from "./../Category_Product/Item_Product/index";



class index extends Component {
  constructor(props) {
    super(props);
    this.onShowSlider = this.onShowSlider.bind(this);
  }
  componentDidMount() {

    this.props.onGetAllProduct();
  }
  onShowSlider() {

  }
 
  render() {

    const data = this.props.arrayList;
    return (
      <div>
        <Container className="mt-5">
          <h2
            className="d-flex justify-content-start"
            onClick={this.onShowSlider}
          >
            {this.props.name}
          </h2>
          <Row className="mt-4 ">{this.showListProduct(data)}</Row>
        </Container>
      </div>
    );
  }
  showListProduct = (products) => {
    var result = null;

    result = products.map((product) => (
      <React.Fragment>
        <Col lg="3" className="mt-4">
          <Item key={product.id} product={product} />
        </Col>
      </React.Fragment>
    ));

    return result;
  };
}

var mapStateToProps = (state) => {
  return {
    products: state.products,
    products_category: state.products_category,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onGetAllProduct: () => {
      dispatch(actions.fetchProductResquest());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
