import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Item from "./../../components/Category_Product/Item_Product/index";
import { connect } from "react-redux";
import * as actions_of_index from "./../../actions/productActions";

import * as actions from "./../../actions/index";
class index extends Component {
  componentDidMount() {
    this.props.onGetAllProduct();
  }
  
  showListProduct = (products, getName) => {
    var { onAddToCart } = this.props;
    var result = null;
      var resultFilter = null;

      if(getName){
        result = products.filter((product) => product.nameCategory.toLowerCase().includes(getName.toLowerCase())||product.name.toLowerCase().includes(getName.toLowerCase()))
      }
    //Xoa Phan Tu Trung
      var resultRemoveDulicate = result.reduce((unique, o) => {
        if(!unique.some(obj => obj.id === o.id && obj.value === o.value)) {
          unique.push(o);
        }
        return unique;
    },[]);

    resultFilter=resultRemoveDulicate.filter(product=>product.name).map((product, index) => {
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
   

    return  resultFilter;
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
      dispatch(actions_of_index.fetchProductResquest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
