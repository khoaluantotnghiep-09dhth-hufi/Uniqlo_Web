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
      txtPhone: "",
      txtPassword: "",
      isCheckLogin: false,
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
   
    var checkCart = sessionStorage.getItem("cart");

   
    var showLinkSearch = (
      <NavLink to={`/search/${input_Search}`}>
        <MDBIcon icon="search" className="sizeIcon" onClick={this.handleOnSearch} />
      </NavLink>
    );
    
    var isCheckAccount =
      sessionStorage.getItem("client") !== null ? (
        <NavLink to="/account">
          <MDBIcon icon="user" className="sizeIcon" id="sizeIconUser" />
        </NavLink>
        
      ) : (
        <NavLink to="/login">
          <MDBIcon icon="user" className="sizeIcon" id="sizeIconUser" />
        </NavLink>
      );

    return (
      <Container className="header">
        <Row style={{ width: "100%" }}>
          <Col lg={1}>
            <NavLink to="/">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UNIQLO_logo.svg/120px-UNIQLO_logo.svg.png"
                rounded
                width="60rem"
                height="60rem"
              />
            </NavLink>{" "}
          </Col>

          <Col sm={6} md={6} lg={6} xl={6} >
            <Header_Center />
          </Col>
          <Col sm={3} md={3} lg={3} xl={3} >
            <InputGroup>
              <MDBInput
                hint="Tìm Kiếm"
                type="text"
                containerClass="mt-0"
                maxlength="100"
                name="input_Search"
                onChange={this.onHandleChange}
              />
              {showLinkSearch}
            </InputGroup>               
          </Col>
          <Col sm={1} md={1} lg={1} xl={1}>
            {isCheckAccount}
          </Col>
          <Col sm={1} md={1} lg={1} xl={1} >
           {checkCart ===null?<NavLink to="/cart-empty">
           <MDBIcon
                icon="shopping-cart"
                md="4"
                className="sizeIcon icon"
                style={{ fontSize: "22px" }}
              >
                {this.showTotalQuantityCart(cart)}
              </MDBIcon>
           </NavLink>:
           <NavLink to="/cart">
              <MDBIcon
                icon="shopping-cart"
                md="4"
                className="sizeIcon icon"
                style={{ fontSize: "22px" }}
              >
                {this.showTotalQuantityCart(cart)}
              </MDBIcon>
            </NavLink>
           } 
          </Col>
        </Row>
      </Container>
    );
  }
}

export default index;
