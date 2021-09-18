import React, { Component } from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";

import HomePape from "../../containers/TheLayout";
import { Route } from "react-router-dom";
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import './login.scss';
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      txtPassword: "",
      isCheckLogin: false
    };
  }
  handleChangeName = (event) => {
    this.setState({ 
      txtName:event.target.value
    })
  }
  handleChangePass = (event) => {
    this.setState({ 
      txtPassword:event.target.value
    })
  }
  handleLogin = () => {
    console.log(this.state.txtName);
    console.log(this.state.txtPassword);
  }
  onChange = (event) => {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    this.setState({
      [name]: value,
    });
  };
  onSubmit = (event) => {
    event.preventDefault();
    var { txtName, txtPassword } = this.state;
    if (txtName === "admin" && txtPassword === "admin") {
      var admin = {
        txtName: txtName,
        txtPassword: txtPassword,
      };

      sessionStorage.setItem("admin", JSON.stringify(admin));
      this.setState({ isCheckLogin: true })
    }
  };
  render() {
    var { isCheckLogin } = this.state;

    if (isCheckLogin) {
      return <Route pathname="/admin/home" component={HomePape} />;
    }
    return (
      <div className="login-background">
        <div className="login-container login-background">
          <div className="login-content row">
            <div className="col-12 text-center"><h2>Đăng Nhập</h2></div>
            <div className="col-12 form-group login-input">
              <label><h4>Tài Khoản</h4></label>
              <input 
              type="text" 
              className="form-control form-control-lg" 
              placeholder="Tên đăng nhập"
              value={this.state.txtName}
              onChange={(event) => this.handleChangeName(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label><h4>Mật Khẩu</h4></label>
              <input 
              type="text" 
              className="form-control form-control-lg" 
              placeholder="Mật khẩu" 
              onChange={(event) => this.handleChangePass(event)}
              value={this.state.txtPassword}
              type="password"/>
            </div>
            <div className="col-12">
              <button type="submit" 
              className="btn btn-danger btn-login" 
              onClick={(event) => {this.onSubmit(event)}}><h3>Đăng Nhập</h3></button>
            </div>
          </div>
        </div>
      </div>
      // <Container>
      //   <Row>
      //     <Col>
      //       <Form style={{ paddingTop: "5%" }} onSubmit={this.onSubmit}>
      //         <h3 className="text-center font-weight-normal">
      //           CHÀO MỪNG BẠN ĐẾN VỚI UNIQLO
      //         </h3>
      //         <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
      //           <Form.Control
      //             type="text"
      //             placeholder="Số điện thoại"
      //             name="txtPhone"
      //             onChange={this.onChange}
      //           />
      //         </Form.Group>

      //         <Form.Group className="mb-3" controlId="formBasicPassword">
      //           <Form.Control
      //             type="password"
      //             placeholder="Mật khẩu"
      //             name="txtPassword"
      //             onChange={this.onChange}
      //           />
      //         </Form.Group>

      //         <Button
      //           variant="outline-secondary"
      //           type="submit"
      //           style={{ transform: "translateX(322%)" }}
      //         >
      //           Đăng Nhập
      //         </Button>
      //       </Form>
      //     </Col>
      //   </Row>
      // </Container>
    );
  }
}

export default index;
