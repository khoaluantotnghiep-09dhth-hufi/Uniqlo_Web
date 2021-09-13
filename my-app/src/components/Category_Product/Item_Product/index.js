import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

class index extends Component {
  render() {
    var { product } = this.props;
    return (
      <Card>
        <Card.Img variant="top" src={product.image} />
        <span class="badge badge-danger" style={{transform: "translateX(190px)"}}>50<i class="fas fa-percent " aria-hidden="true"></i></span>
        <Card.Body>
          <Card.Title>{product.name_product}</Card.Title>

          <Card.Text className="text-left">
            <span> <del>{product.price} VND</del></span>
            <span style={{marginLeft:'40px',color:'red'}} className="font-weight-bold"> {product.price} VND</span>
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
