import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "./../../actions/productActions";
import "./Detail_Product.scss";
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
        if (product.percentSale) {
          var newPrice = (parseInt(product.percentSale) / 100) * product.price;
        }
        var elementNewPrice = newPrice ? (
          <span
          // style={{ marginLeft: "40px", color: "red" }}
          className="font-weight-bold "
          style={{color: "red"}}
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
          <span  className="font-weight-bold " style={{color: "red"}}> {formatter.format(product.price)}</span>
        );
        return (
          <React.Fragment>
            <Col lg="3" style={{ backgroundColor: "#ECECEC" }}>
              <Row>
                <Col>
                  <h3 style={{ marginTop: "50px" }}>{product.name}</h3>
                </Col>
              </Row>
              <Row>
                <Col className="mt-2">
                  <h5  className="font-weight-normal ">Giá Bán:</h5>
                </Col>
              </Row>
              <Row>
                <Col className="mt-4">
                  <h5>{elementPrice}</h5>
                </Col>
              </Row>
              <Row>
                <Col className="mt-2">
                  <h5>{elementNewPrice}</h5>
                </Col>
              </Row>
              <Row>
                <Col className="mt-2">
                  <h5>--------------------------------------------</h5>
                </Col>
              </Row>
            </Col>
            <Col lg="5">
              <Row>
                <Col>
                  <Image
                    class="Adjust__Image"
                    src={product.image}
                    style={{ maxWidth: "470px" }}
                  ></Image>
                </Col>
              </Row>
              <Row>
                <Col
                  className="ml-4 mt-2"
                  style={{ backgroundColor: "#666666" }}
                >
                  <p
                    className="font-weight-normal text-left"
                    style={{ color: "#f0f0f0", marginBottom: "0" }}
                  >
                    Thông Tin Về Sản Phẩm
                  </p>
                </Col>
              </Row>
              <Row>
                <Col
                  className="ml-4 mt-2"
                  style={{ backgroundColor: "#f0f0f0" }}
                >
                  <h4
                    className="font-weight-normal text-left"
                    style={{ color: "#666", marginBottom: "0" }}
                  >
                    {product.description}
                  </h4>
                </Col>
              </Row>
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
            <Col className="ml-4" lg="3" style={{ backgroundColor: "#ECECEC" }}>
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
