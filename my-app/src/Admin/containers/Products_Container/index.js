import React, { Component } from "react";
import Table from "./../../components/Table/index";

import { connect } from "react-redux";

class index extends Component {
  showProductItems = (products) => {
    var result = null;
    console.log(products);
    if (products.length > 0) {
      result = products.map((product, index) => {
        return <Table key={index} index={index} product={product} />;
      });
    }
    return result;
  };
  render() {
    var { products } = this.props;

    return <div>{this.showProductItems(products)}</div>;
  }
}

var mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps, null)(index);
