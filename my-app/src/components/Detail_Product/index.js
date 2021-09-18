import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "./../../actions/productActions";
class index extends Component {
  componentDidMount() {
    this.props.onGetAllProduct();
  }

  showDetailProduct = (products_category, id_product) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });

    var result = null;
    result = products_category
      .filter((product) => product.id === id_product)

      .map((product, index) => {
        console.log(product.percentSale);
        if (product.percentSale) {
          var newPrice = (parseInt(product.percentSale) / 100) * product.price;
        }
        var elementNewPrice = newPrice ? (
          <span
          // style={{ marginLeft: "40px", color: "red" }}
          // className="font-weight-bold "
          >
            {" "}
            {formatter.format(newPrice)}{" "}
          </span>
        ) : (
          ""
        );

        var elementPrice = elementNewPrice ? (
          <span>
            {" "}
            <del>{formatter.format(product.price)} </del>
          </span>
        ) : (
          <span> {formatter.format(product.price)}</span>
        );
        return (
          <React.Fragment>
            <h4 className="text-center mb-4">CHI TIẾT SẢN PHẨM</h4>
            <Col lg="3" style={{ backgroundColor: "red" }}>
              <Row>
                <Col>
                  <h3>{product.name}</h3>
                </Col>
              </Row>
              <Row>
                <Col>{elementPrice}</Col>
              </Row>
              <Row>
                <Col>{elementNewPrice}</Col>
              </Row>
            </Col>
            <Col lg="6">
              <Image src={product.image}></Image>
            </Col>
          </React.Fragment>
        );
      });

    return result;
  };

  ShowColorAndSize = (products, id_product) => {
    var result = null;
    result = products
      .filter((product) => product.id === id_product)
      .map((product, index) => {
        return (
          <React.Fragment>
            <Row>
              <Col>
                <h3>doan 1</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>doan 2</h3>
              </Col>
            </Row>
          </React.Fragment>
        );
      });
    return result;
  };
  render() {
    var { match, products, products_category } = this.props;

    var id_product = match.params.id_product;

    return (
      <React.Fragment>
        <Container>
          <Row className="mt-4">
            {this.showDetailProduct(products_category, id_product)}
            <Col lg="3" style={{ backgroundColor: "red" }}>
              {this.ShowColorAndSize(products, id_product)}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
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
