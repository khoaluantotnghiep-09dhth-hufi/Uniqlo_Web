import React, { Component } from "react";
import { Row, Container, Col } from "react-bootstrap";
import Item from "./../Category_Product/Item_Product/index";
import { connect } from "react-redux";
import * as actions from "./../../actions/index";

import ListImage from "./Slider_Image/index";
import "./Slider.scss";
class index extends Component {
  constructor(props) {
    super(props);
    this.onShowSlider = this.onShowSlider.bind(this);
  }
  componentDidMount() {
    //  this.showListProduct();
    this.props.onGetAllProduct();
  }
  onShowSlider() {
    console.log(this.props.name + "" + this.props.arrayList.join(" "));
  }
  // onShowSlider = () => {
  //     // alter(this.props.name +' '+ 'abc');
  //     console.log(this.props.name + '' + this.props.arrayList.join(' '));
  // }
  render() {
    var { products } = this.props;
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
