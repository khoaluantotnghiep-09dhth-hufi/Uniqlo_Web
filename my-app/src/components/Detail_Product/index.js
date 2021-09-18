import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "./../../actions/productActions";
class index extends Component {
  componentDidMount() {
    
    this.props.onGetAllProduct();
  }

  showDetailProduct = (products, id_product) => {
    var result = null;
    result = products
      .filter((product) => product.id === id_product)
      .map((product, index) => {
        return (
          <Container >
            <Row className="mt-4">
              <h4 className="text-center mb-4">CHI TIẾT SẢN PHẨM</h4>
              <Col lg="3" style={{ backgroundColor: "red" }}>
                <Row>
                  <Col>
                    <h3>{product.name}</h3>
                  </Col>
                  <Col>{product.price}</Col>
                </Row>
              </Col>
              <Col lg="6">
                <Image src={product.image}></Image>
              </Col>

              <Col lg="3" style={{ backgroundColor: "red" }}>
                <Row>
                  <Col>
                    
                  </Col>
                  <Col>299.000VND</Col>
                </Row>
              </Col>
            </Row>
          </Container>
        );
      });
    return result;
  };
  render() {
    var { match, products } = this.props;

    var id_product = match.params.id_product;

    return (
      <React.Fragment>
        {this.showDetailProduct(products, id_product)}
      </React.Fragment>
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
    onGetAllProduct: () => {
      dispatch(actions.fetchProductResquest());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
