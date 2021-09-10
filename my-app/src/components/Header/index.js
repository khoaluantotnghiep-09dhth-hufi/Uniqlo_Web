import React, { Component } from "react";
import { Container, Row, Col, Image, Badge, InputGroup } from "react-bootstrap";
import { MDBInput, MDBIcon } from "mdbreact";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Header_Center from "./Header_Center/index";

import { NavLink } from "react-router-dom";

import "./Header.scss";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: "",
    };
  }
  onClick() {
    alert("Day Bam Click");
  }
  showTotalQuantityCart = (cart) => {
    var total = 0;
    if (cart.length > 0) {
      for (let index = 0; index < cart.length; index++) {
        total += cart[index].quantity;
      }
    } else {
      return;
    }

    return (
      <Badge bg="danger" className="badge">
        {total}
      </Badge>
    );
  };
  render() {
    var { cart } = this.props;
    var isCheckAccount =
      sessionStorage.getItem("user") === null ? (
        <NavLink to="/login">
          <MDBIcon icon="user" md="4" className="sizeIcon" />
        </NavLink>
      ) : (
        <NavLink to="/account">
          <MDBIcon icon="user" md="4" className="sizeIcon" />
        </NavLink>
      );
    console.log(isCheckAccount);
    return (
      <Container className="header">
        <Row>
          <Col xl={1}>
            <NavLink to="/">
              <Image
                src="https://www.uniqlo.com/vn/explorer/img/logo_uq_01.gif"
                rounded
              />
            </NavLink>{" "}
          </Col>

          <Col xs="6" sm="6" md="6" lg="6">
            <Header_Center />
          </Col>

          <Col>
            <Row>
              <Col xs="9" sm="9" md="9" lg="9">
                <NavLink to="/search">
                  <InputGroup>
                    <MDBInput
                      hint="Tìm Kiếm"
                      type="text"
                      containerClass="mt-0"
                    />{" "}
                    <MDBIcon icon="search" className="sizeIcon" />
                  </InputGroup>
                </NavLink>
              </Col>
              <Col xs="1" sm="1" md="1" lg="1">
                {isCheckAccount}
                {/* <NavLink to="/login">
                  <MDBIcon icon="user" md="4" className="sizeIcon" />
                </NavLink>{" "} */}
              </Col>
              <Col xs="1" sm="1" md="1" lg="1">
                {" "}
                <NavLink to="/cart">
                  {" "}
                  <MDBIcon
                    icon="shopping-cart"
                    md="4"
                    className="sizeIcon icon"
                  >
                    {this.showTotalQuantityCart(cart)}
                  </MDBIcon>
                </NavLink>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default index;
