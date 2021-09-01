import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Table from "./Table/index";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./../../actions/index";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckSignOut: false,
    };
  }
  onSignOut = () => {
    var { cart} = this.props;
    sessionStorage.clear("user");
    localStorage.clear();
    
    this.props.onResetCart(cart);

    this.setState({ isCheckSignOut: true });
  };
  render() {
  
    var sessionUser=JSON.parse(sessionStorage.getItem('user'))
    console.log(sessionUser);
    var { isCheckSignOut } = this.state;
    if (isCheckSignOut) {
      // window.location.reload();
      return <Redirect push to={{ path: "/" }} />;
    }
    return (
      <Container style={{ paddingTop: "5%", paddingBottom: "5%" }}>
        <Row>
          <Col lg="8">
            <Row>
              <Col>
                {" "}
                <h3>THÔNG TIN TÀI KHOẢN</h3>
                <br></br>
                <h6>
                  Xin chào, <span>{sessionUser.name}</span>
                </h6>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                <h6>Tài khoản của tôi</h6>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6>Tên tài khoản: {sessionUser.name}</h6>
              </Col>
            </Row>
            <Row>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <Button
                  type="submit"
                  variant="outline-secondary"
                  size="sm"
                  style={{ margin: 0 }}
                  onClick={this.onSignOut}
                >
                  <h6 style={{ marginBottom: 0 }}>Đăng Xuất</h6>
                </Button>{" "}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
var mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onResetCart: (product) => {
      dispatch(actions.onRestCart(product));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
