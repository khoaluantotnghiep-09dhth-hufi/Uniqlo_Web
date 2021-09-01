import React, { Component } from "react";
import "./Account.scss";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./../../actions/index";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtPhone: "",
      txtPassword: "",

      txtHo: "",
      txtTen: "",
      txtEmail: "",
      txtSDT: "",
      txtMatKhau: "",
      isCheckLogin: false,
    };
  }
  componentDidMount() {
    this.props.onFetchUsers();
  }
  onHandleSubmitLogin = (users) => (event) => {
    event.preventDefault(); //Xoá dòng này sẽ tự chuyển trang chứ ko chuyển trang bằng tay
    var { txtSDT, txtPassword, items } = this.state;

    for (let i = 0; i < users.length; i++) {
      if (users[i].phone === txtSDT && users[i].password === txtPassword) {
        var user = {
          id: users[i].id,
          name: users[i].name,
          phone: users[i].phone,
          password: users[i].password,
        };
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("items", JSON.stringify(items));
        
        this.setState({
          isCheckLogin: true,
        });
      } else {
     
        this.setState({
          isCheckLogin: false,
        });
      }
    }
  };
  onHandleChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
  onHandleSubmitSignUp = (event) => {
    event.preventDefault();
  };
  render() {
    var { users } = this.props;
    var { isCheckLogin } = this.state;
    
    if (isCheckLogin) {
      return (
        <Redirect
          to={{
            pathname: "/account",
          }}
        />
      );
    }
   
    return (
      <Container>
        <Row className="Account-padding">
          <Col>
            <h5 className="text-center">Đăng Nhập</h5>
            <Form onSubmit={this.onHandleSubmitLogin(users)}>
              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Control
                  type="text"
                  placeholder="Số Điện Thoại"
                  ref="memberPhone"
                  onChange={this.onHandleChange}
                  name="txtSDT"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Mật Khẩu"
                  ref="memberPassword"
                  onChange={this.onHandleChange}
                  name="txtPassword"
                />
              </Form.Group>

              <Form.Group className="mb-3 " controlId="formBasicPassword">
                <Button
                  variant="outline-secondary"
                  type="submit"
                  className="button--width"
                >
                  Đăng Nhập
                </Button>
              </Form.Group>
              <Form.Group
                className="mb-3 text-center"
                controlId="formBasicPassword"
              >
                <a
                  href="#"
                  style={{ color: "#666", borderBottom: "1px solid #ccc" }}
                >
                  Quên Mật Khẩu?
                </a>
              </Form.Group>
            </Form>
          </Col>

          <Col>
            <h5 className="text-center">Đăng Ký</h5>
            <Form onSubmit={this.onHandleSubmitSignUp}>
              <Form.Group className="mb-3" controlId="formBasicHo">
                <Form.Control
                  type="text"
                  placeholder="Họ"
                  onChange={this.onHandleChange}
                  name="txtHo"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicTen">
                <Form.Control
                  type="text"
                  placeholder="Tên"
                  onChange={this.onHandleChange}
                  name="txtTen"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  onChange={this.onHandleChange}
                  name="txtEmail"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Control
                  type="text"
                  placeholder="Số Điện Thoại"
                  onChange={this.onHandleChange}
                  name="txtSDT"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Mật Khẩu"
                  onChange={this.onHandleChange}
                  name="txtMatKhau"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Button
                  variant="outline-secondary"
                  type="submit"
                  className="button--width"
                >
                  Đăng Ký
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

var mapStateToProps = (state) => {
  return {
    users: state.users,
    cart: state.cart,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onFetchUsers: () => {
      return dispatch(actions.fetchUserRequest());
    },
  };
};

const ShowTheLocationWithRouter = withRouter(index);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowTheLocationWithRouter);
