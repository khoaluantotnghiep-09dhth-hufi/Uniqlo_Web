import React, { Component } from "react";
import Table from "./../../components/Table/index";
import Item from "./../Table/Item/index";
import * as actions from "./../../../actions/index";
import { connect } from "react-redux";


class index extends Component {
  componentDidMount() {
    this.props.onFetchProduct();
  }
  showProductItems = (products) => {
    var result = null;

    if (products.length > 0) {
      result = products.map((product, index) => {
        return (
          <Item
            key={index}
            index={index}
            product={product}
            onDelete={this.onDelete}
          />
        );
      });
    }
    return result;
  };

  onDelete = (id) => {
    this.props.onDeleteProduct(id);
  };

  render() {
    var { products } = this.props;

    return <Table>{this.showProductItems(products)}</Table>;
  }
}

var mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onFetchProduct: () => {
      dispatch(actions.fetchProductResquest());
    },
    onDeleteProduct: (id) => {
      dispatch(actions.onDeleteProductResquest(id));
    },
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
