import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FloatingLabel,
  Alert,
  InputGroup,
  FormControl
} from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./../../actions/index";
import API_Address from "./../../Admin/utils/Api_Address_CheckOut";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "---",
      cities: [],
      districts: [],
      wards: [],
      id_city: 1,
      id_district: 1,
    };
  }
  componentDidMount() {
    API_Address("api/p", "GET", null).then((response) => {
      this.setState({
        cities: response.data,
      });
    });

    API_Address("api/d", "GET", null).then((response) => {
      this.setState({
        districts: response.data,
      });
    });

    API_Address("api/w", "GET", null).then((response) => {
      this.setState({
        wards: response.data,
      });
    });
  }

  showListCities = (cities) => {
    var result = null;

    result = cities.map((city, index) => {
      return (
        <option key={index} value={city.code}>
          {city.name}
        </option>
      );
    });
    return result;
  };

  showListWards = (wards) => {
    var { id_district } = this.state;
    var result = null;

    console.log(id_district);
    var query = wards.filter((item) => item.district_code === id_district);
    console.log(query);
    result = query.map((ward, index) => {
      return (
        <option key={index} value={ward.code}>
          {ward.name}
        </option>
      );
    });
    return result;
  };

  handleChangeDistricts = (e) => {
    var { id_city } = this.state;

    var number = parseInt(e.target.value);

    this.setState({ id_city: number });
  };

  handleChangeWards = (e) => {
    var { id_district } = this.state;

    var number = parseInt(e.target.value);

    this.setState({ id_district: number });
  };

  showListDistrict = (districts) => {
    var { id_city } = this.state;
    var result = null;
    var query = districts.filter((item) => item.province_code === id_city);

    result = query.map((district, index) => {
      return (
        <option key={index} value={district.code}>
          {district.name}
        </option>
      );
    });

    return result;
  };
  render() {
    var { cities, display, districts, wards } = this.state;

    return (
      <Container style={{ paddingTop: "5%", paddingBottom: "5%" }}>
        <Row>
          <Col lg={4}>
            <h5 className="font-weight-normal">Thông Tin Nhận Hàng</h5>
            <Form onSubmit={this.onHandleSubmitSignUp}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Email"
                  onChange={this.onHandleChange}
                  name="txtEmail"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicHoTen">
                <Form.Control
                  type="text"
                  placeholder="Họ và Tên"
                  onChange={this.onHandleChange}
                  name="txtHoTen"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicSDT">
                <Form.Control
                  type="text"
                  placeholder="Số Điện Thoại"
                  onChange={this.onHandleChange}
                  name="txtSDT"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDC">
                <Form.Control
                  type="text"
                  placeholder="Địa Chỉ"
                  onChange={this.onHandleChange}
                  name="txtDiaChi"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Select
                  defaultValue={display}
                  onChange={this.handleChangeDistricts}
                >
                  <option>---</option>
                  {cities.map((city, index) => {
                    return (
                      <option key={index} value={city.code}>
                        {city.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Select onChange={this.handleChangeWards}>
                  <option>---</option>
                  {this.showListDistrict(districts)}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Select>
                  <option>---</option>
                  {this.showListWards(wards)}
                </Form.Select>
              </Form.Group>
              <FloatingLabel controlId="floatingTextarea2" label="Ghi Chú">
                <Form.Control
                  as="textarea"
                  placeholder="Ghi Chú"
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
            </Form>
          </Col>
          <Col lg={8}>
            <Row>
              <Col lg={8}>
                <h5 className="font-weight-normal">Vận chuyển</h5>
                <Alert variant="danger">
                  Vui lòng nhập thông tin giao hàng
                </Alert>
              </Col>
            </Row>
            <Row>
              <Col lg={8}>
                <h5 className="font-weight-normal">Vận chuyển</h5>
                <Alert variant="danger">
                Thanh toán khi giao hàng (COD) <i style={{color:'#2194C8',fontSize:'20px'}} class="far fa-money-bill-alt"></i>
                </Alert>
              </Col>
            </Row>
            <Row>
              <Col lg={8}>
              <NavLink to="/">
              <Button
            variant="danger"
            type="button"
            size="lg"
            className="Cart__Checkout-button mt-5"
          >
            Đặt Hàng
          </Button>
          </NavLink>
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
