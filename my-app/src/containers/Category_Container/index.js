import React, { Component } from "react";
import Category_Products from "./../../components/Category_Product/index";
import Item from "./../../components/Category_Product/Item_Product/index";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import * as actions from "./../../actions/index";
class index extends Component {
  componentDidMount() {
this.props.onGetAllProduct();
  }

  render() {
    var { products,location } = this.props;
 console.log(location);

    return (
      <Category_Products >
        {this.showListProduct(products)}
      </Category_Products>
    );
  }
  
  showListProduct = (products) => {
    var {onAddToCart,match}=this.props;
    var result = null;
    var url =match.url;
    var id_Category = match.params.name_category;
    console.log(id_Category);
    // <NavLink to={`${url}/${product.title}`}></NavLink> Navlink is redirect detail product pass parameter on URL
    result = products.filter((product)=>product.id_category===id_Category).map((product, index) => {
      return <Col lg="3" className="mt-4"><Item key={product.id} product={product} onAddToCart={onAddToCart}/></Col>;
    });
    return result;
  };
}


var mapStateToProps = (state) => {
  return {
    products: state.products,

  };
};

var mapDispatchToProps = (dispatch,props) => {
  return {
    onAddToCart:(product)=>{
      dispatch(actions.addToCart(product,1));
    },
    onGetAllProduct:()=>{
      dispatch(actions.fetchProductResquest())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
