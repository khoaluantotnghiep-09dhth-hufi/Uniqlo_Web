import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

class index extends Component {
  render() {
    var { product } = this.props;
    // product.desciption==='' &&
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });
    var elementSale =
      product.desciption === "0" ? (
        ""
      ) : (
        <span
          class="badge badge-danger"
          style={{ transform: "translateX(190px)" }}
        >
          {product.desciption}
          <i class="fas fa-percent " aria-hidden="true"></i>
        </span>
      );

    if (product.desciption) {
      var newPrice = (parseInt(product.desciption) / 100) * product.price;
    }

    var elementNewPrice = newPrice ? (
      <span
        style={{ marginLeft: "40px", color: "red" }}
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
        <Card.Img variant="top" src={product.image} />
        {elementSale}
        <Card.Body>
          <Card.Title>{product.name_product}</Card.Title>

          <Card.Text className="text-left">
            {elementPrice}
            {elementNewPrice}
          </Card.Text>

          <Button
            variant="dark"
            style={{ width: "100%" }}
            onClick={() => {
              this.onAddToCart(product);
            }}
          >
            Mua
          </Button>
        </Card.Body>
      </Card>
    );
  }
  onAddToCart = (product) => {
    this.props.onAddToCart(product);
  };
}

export default index;
