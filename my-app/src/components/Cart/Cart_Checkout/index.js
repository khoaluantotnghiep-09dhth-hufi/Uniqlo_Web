import React, { Component } from "react";
import { Row, Col, Accordion, Form, Button } from "react-bootstrap";
import "./Cart_Checkout.scss";
import { NavLink } from "react-router-dom";
class index extends Component {
  showTotalAmount = (cart) => {
    
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });
    var total = 0;
    for (let index = 0; index < cart.length; index++) {
      if(cart[index].product.priceSaleProduct){
        total += cart[index].product.priceSaleProduct * cart[index].quantity;
      }else{
        total += cart[index].product.priceProduct * cart[index].quantity;
      }
     
     
    }
    return formatter.format(total);
  };
showTotalProduct=(cart)=>{
    var total = 0;
    for (let index = 0; index < cart.length; index++) {
      total += cart[index].quantity;

    }
    return total;
};
  render() {
    const { cart } = this.props;

    return (
      <div>
        <Row className="Cart_CheckOut--border ">
          <Col style={{ paddingLeft: "0" }}>
            <h6 className="d-flex justify-content-start">Order Summary</h6>
          </Col>
          <Col>
            <h6 className="d-flex justify-content-end">
              {this.showTotalProduct(cart)} cart
            </h6>
          </Col>
        </Row>
        <Row className="Cart_CheckOut--border mt-2">
          <Col style={{ paddingLeft: "0" }}>
            <h6 className="d-flex justify-content-start">Order Total</h6>
          </Col>
          <Col>
            <h6 className="d-flex justify-content-end">
              {this.showTotalAmount(cart)}
            </h6>
          </Col>
        </Row>
        <Row>
          <Accordion
            defaultActiveKey="0"
            className="mt-2 Cart__Checkout-voucher"
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>Áp Dụng Voucher</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Row className="align-cart-center">
                    <Col lg="7">
                      <Form.Control
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Nhập Mã Voucher"
                      />
                    </Col>

                    <Col>
                      <Button
                        variant="outline-secondary"
                        type="submit"
                        className="mb-2 Cart_Checkout-button"
                        size="lg"
                      >
                        Xác Nhận
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>

        <Row>
        <NavLink to="/checkout">
          <Button
            variant="danger"
            type="button"
            size="lg"
            className="Cart__Checkout-button mt-5"
          >
            Thanh Toán
          </Button>
          </NavLink>
        </Row>
      </div>
    );
  }
}

export default index;
