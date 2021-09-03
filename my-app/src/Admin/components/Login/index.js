import React, { Component } from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";

import HomePape from "../../containers/TheLayout";
import { Route } from "react-router-dom";

import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtPhone: "",
      txtPassword: "",
      isCheckLogin: false
    };
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
    var { txtPhone, txtPassword } = this.state;
    if (txtPhone === "admin" && txtPassword === "admin") {
      var admin = {
        txtPhone: txtPhone,
        txtPassword: txtPassword,
      };

      sessionStorage.setItem("admin", JSON.stringify(admin));
      this.setState({ isCheckLogin: true })
    }
  };
  render() {
    var { isCheckLogin } = this.state;
    console.log(isCheckLogin);
    if (!isCheckLogin) {
      return <Route pathname="/admin/home" component={HomePape} />;
    }
    return (
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
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody >
                    <CForm onSubmit={this.onSubmit}>
                      <h1>Đăng Nhập</h1>
                      <p className="text-muted">Đăng Nhập Tài Khoản Admin Của Bạn</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Tên đăng nhập" autoComplete="username" name="txtPhone" onChange={this.onChange} />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" placeholder="Mật khẩu" autoComplete="current-password" name="txtPassword" onChange={this.onChange} />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton color="primary" className="px-4" >Đăng Nhập</CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">Bạn Quên Mật Khẩu?</CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Logo để ở đây</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

export default index;
