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
      name: "",
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
  onHandleChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
  onBlurInputSearch=(event)=>{
    //  var { input_Search } = this.state;
    // var remove = input_Search?'':'';
    // console.log(remove);
    // this.setState({input_Search: remove})
   
   
  }
  onFocusInputSearch=(e)=>{
 
    //    var { input_Search } = this.state;
    // var remove = input_Search?'':'';
    // console.log(remove);
    // this.setState({input_Search: remove})
  }
  handleOnSearch=(event)=>{
    // var { input_Search } = this.state;
    // var remove = input_Search?'':'';
    // console.log(remove);
    // this.setState({input_Search: remove})
  }
  render() {
    var { cart } = this.props;
    var { input_Search } = this.state;
    
   
    var showLinkSearch = (
      <NavLink to={`/search/${input_Search}`}>
        <MDBIcon icon="search" className="sizeIcon" onClick={this.handleOnSearch} />
      </NavLink>
    );
    
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

    return (
      <Container className="header">
        <Row style={{ width: "100%" }}>
          <Col lg={1}>
            <NavLink to="/">
              <Image
                src="https://www.uniqlo.com/vn/explorer/img/logo_uq_01.gif"
                rounded
              />
            </NavLink>{" "}
          </Col>

          <Col lg={6}>
            <Header_Center />
          </Col>

          <Col lg={5}>
            <Row>
              <Col lg={9}>
                <InputGroup>
                  <MDBInput
                    hint="Tìm Kiếm"
                    type="text"
                    containerClass="mt-0"
                    maxlength="100"
                    name="input_Search"
                    onChange={this.onHandleChange}
                   
                    
                  />{" "}
                  {showLinkSearch}
                </InputGroup>
              </Col>
              <Col lg={1}>
                {isCheckAccount}
                {/* <NavLink to="/login">
                  <MDBIcon icon="user" md="4" className="sizeIcon" />
                </NavLink>{" "} */}
              </Col>
              <Col lg={1}>
                {" "}
                <NavLink to="/cart">
                  {" "}
                  <MDBIcon
                    icon="shopping-cart"
                    md="4"
                    className="sizeIcon icon"
                    style={{ fontSize: "22px" }}
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
