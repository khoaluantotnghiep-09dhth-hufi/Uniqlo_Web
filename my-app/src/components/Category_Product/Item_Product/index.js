import React, { Component } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Item_Product.scss";
class index extends Component {
  render() {

    var { product } = this.props;
    // product.desciption==='' &&
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });
    console.log("Element Sale: "+ product.percentSale)
    var elementSale =
      product.percentSale === 0 ? (
        ""
      ) : (
        <span
          class="badge badge-danger"
          style={{ transform: "translateX(190px)" }}
        >
          {product.percentSale}
          <i class="fas fa-percent " aria-hidden="true"></i>
        </span>
      );

    if (product.percentSale) {
      var cacularSale = (parseInt(product.percentSale) / 100) * product.price;
      var newPrice=product.price-cacularSale;
    }

    var elementNewPrice = newPrice ? (
      <span
        style={{ color: "red" }}
        className="font-weight-bold "
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
      <span className="text-center"> {formatter.format(product.price)}</span>
    );

    return (
      <Card>
        <NavLink to={`/product/${product.id}`}>
          <Card.Img
            className="Adjust_Image"
            variant="top"
            src={product.image}
          />
          {elementSale}
        </NavLink>
        <Card.Body>
          <Row>
            <Col>
              {" "}
              <Card.Text className="font-weight-bold  Adjust_Title">
                {product.name}
              </Card.Text>
            </Col>
            <Col>
              <Row>
                <Col>
                  {" "}
                  <Card.Text className="Adjust_Title">{elementPrice}</Card.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  {" "}
                  <Card.Text className=" Adjust_NewPrice" >
                    {" "}
                    { elementNewPrice}
                  </Card.Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
  onAddToCart = (product) => {
    this.props.onAddToCart(product);
  };
}

export default index;
