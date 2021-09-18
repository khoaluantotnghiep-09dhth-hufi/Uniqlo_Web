import React, { Component } from "react";
import Category_Products from "./../../components/Category_Product/index";
import Item from "./../../components/Category_Product/Item_Product/index";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";


import * as actions from "./../../actions/index";
class index extends Component {
  componentDidMount() {
this.props.onGetAllProduct();
  }

  render() {
    var {  products_category,location } = this.props;


    return (
      <Category_Products >
        {this.showListProduct( products_category)}
      </Category_Products>
    );
  }
  
  showListProduct = (products) => {
    var {onAddToCart,match}=this.props;
    var result = null;
    
    var id_Category = match.params.name_category;
 
   
    result = products.filter((product)=>product.nameCategory===id_Category).map((product, index) => {
      return <Col lg="3" className="mt-4"><Item key={product.id} product={product} onAddToCart={onAddToCart}/></Col>;
    });
    return result;
  };
}


var mapStateToProps = (state) => {
  return {
    products_category: state.products_category,

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
