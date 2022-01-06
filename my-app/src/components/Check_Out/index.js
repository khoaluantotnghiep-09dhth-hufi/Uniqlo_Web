import React, { Component } from "react";
import io from "socket.io-client";
import emailjs from "emailjs-com";
import Call_API from "./../../Admin/utils/Callapi";

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FloatingLabel,
  Alert,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import uniqid from "uniqid";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./../../actions/index";
import API_Address from "./../../Admin/utils/Api_Address_CheckOut";
import { toast } from "react-toastify";

const socket = io("http://localhost:3008");
const sessionUser = JSON.parse(sessionStorage.getItem("client"));
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtEmail: "",
      txtHoTen: "",
      txtSDT: "",
      txtDiaChi: "",
      txtCity: "",
      txtPhuong: "",
      txtXa: "",
      txtGhiChu: "",
      display: "---",
      cities: [],
      districts: [],
      wards: [],
      id_city: 1,
      id_district: 1,
      isCheckOrder: false,
    };
  }
  async componentDidMount() {
    var sessionUser = JSON.parse(sessionStorage.getItem("client"));

    Call_API(`customers/${sessionUser.id_user}`, "GET", null).then(
      (response) => {
        var data = response.data[0];
        console.log(data);
        this.setState({
          txtHoTen: data.name,
          txtDiaChi: data.address,
          txtSDT: data.phone,

          txtEmail: data.email,
        });
      }
    );

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
    await this.setState({
      txtEmail: sessionUser.email,
      txtHoTen: sessionUser.name,
      txtSDT: sessionUser.phone,
      txtDiaChi: sessionUser.address,
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

    var query = wards.filter((item) => item.district_code === id_district);

    result = query.map((ward, index) => {
      return (
        <option key={index} value={ward.name}>
          {ward.name}
        </option>
      );
    });
    return result;
  };

  handleChangeDistricts = (e) => {
    var { id_city } = this.state;
    let index = e.target.selectedIndex;
    // console.log(e.target[index].text)
    var number = parseInt(e.target.value);

    this.setState({ id_city: number, txtCity: e.target[index].text });
  };

  handleChangeWards = (e) => {
    var { id_district } = this.state;
    let index = e.target.selectedIndex;

    var number = parseInt(e.target.value);

    this.setState({ id_district: number, txtPhuong: e.target[index].text });
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
  showTotalAmount = (cart) => {
    var total = 0;
    for (let index = 0; index < cart.length; index++) {
      if (cart[index].product.priceSaleProduct) {
        total += cart[index].product.priceSaleProduct * cart[index].quantity;
      } else {
        total += cart[index].product.priceProduct * cart[index].quantity;
      }
    }
    return total;
  };
  showTotalProduct = (cart) => {
    var total = 0;
    for (let index = 0; index < cart.length; index++) {
      total += cart[index].quantity;
    }
    return total;
  };
  onSubmit = (e) => {};
  onHandleSubmitForm = (e) => {
    e.preventDefault();
    var {
      txtEmail,
      txtHoTen,
      txtSDT,
      txtDiaChi,
      txtCity,
      txtPhuong,
      txtXa,
      txtGhiChu,
    } = this.state;
    var sessionUser = JSON.parse(sessionStorage.getItem("client"));
    var sessionCart = JSON.parse(sessionStorage.getItem("cart"));
    let dateNow = new Date().toISOString().slice(0, 10);

    var bill = {
      id: uniqid("bill-customer-"),
      order_date: dateNow,
      total: this.showTotalAmount(sessionCart),
      status: 0,
      id_customer: sessionUser.id_user,
      name_customer: txtHoTen,
      address: txtDiaChi + " , " + txtCity + " , " + txtPhuong + " , " + txtXa,
      phone: txtSDT,
      email: txtEmail,
      total_quantity: this.showTotalProduct(sessionCart),
      note: txtGhiChu,
    };

    var bill_info = sessionCart.map((item) => ({
      id: uniqid("bill-customer-info-"),
      id_bill: bill.id,
      id_product_info: item.product.id_product_info,
      into_money: item.product.priceSaleProduct
        ? item.product.priceSaleProduct
        : item.product.priceProduct,
      quantity: item.quantity,
    }));

    if (this.refs.fieldCity.value === "Tỉnh, Thành Phố") {
      toast.error(
        <div>
          Đặt hàng thất bại.
          <br />
          Vui lòng chọn Tỉnh, Thành Phố!
        </div>,
        { autoClose: 2500 },
        { position: toast.POSITION.UPPER_RIGHT }
      );
      return;
    }
    if (this.refs.fieldDistrict.value === "Quận, Huyện") {
      toast.error(
        <div>
          Đặt hàng thất bại.
          <br />
          Vui lòng chọn Quận, Huyện!
        </div>,
        { autoClose: 2500 },
        { position: toast.POSITION.UPPER_RIGHT }
      );
      return;
    }
    if (this.refs.fieldWards.value === "Phường, Xã") {
      toast.error(
        <div>
          Đặt hàng thất bại.
          <br />
          Vui lòng chọn Phường, Xã!
        </div>,
        { autoClose: 2500 },
        { position: toast.POSITION.UPPER_RIGHT }
      );
      return;
    }

    if (bill && bill_info) {
      this.props.onCreateBill(bill);
      this.props.onCreateBillInfo(bill_info);
      //////Test Web Socket
      var name = sessionUser.name;
      var quantity = 1;
      var today = new Date();
      //Khách hàng phát tín hiệu khi Order
      socket.emit("customer-order", { name, quantity, today });
      toast.success("Khách Hàng Đã Order Gửi Lên WebSocket");
      console.log("On reset Cart: " + JSON.stringify(bill_info));
      this.props.onResetCart(sessionCart);
      sessionStorage.removeItem("cart");

      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var bills = {
        id: uniqid("message- "),
        content: "Có " + "Khách Hàng " + name + " Order Nè",
        time: date + " " + time,
      };

      if (bills) {
        this.props.onBillCancel(bills);
        toast.success("Khách Hàng Đã Yêu Cầu Hủy Đơn Thành Công, WebSocket");
      }
      this.setState({
        isCheckOrder: true,
      });
      this.sendEmail(e);
    } else {
      this.setState({
        isCheckOrder: false,
      });
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

  sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "gmail",
        "gmail_template",
        e.target,
        "user_Kb6t170ZY6RBAoo92zlwi"
      )
      .then(
        (result) => {},
        (error) => {}
      );
    e.target.reset();
  };
  render() {
    var {
      cities,
      display,
      districts,
      wards,
      txtEmail,
      txtHoTen,
      txtSDT,
      txtDiaChi,
    } = this.state;
    var { isCheckOrder } = this.state;

    if (isCheckOrder) {
      return (
        this.onSubmit(),
        (
          <Redirect
            to={{
              pathname: "/account",
            }}
          />
        )
      );
    }
    return (
      <Container style={{ paddingTop: "5%", paddingBottom: "5%" }}>
        <Row>
          <Col lg={4}>
            <h5 className="font-weight-normal">Thông Tin Nhận Hàng</h5>
            <Form onSubmit={this.onHandleSubmitForm}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  onChange={this.onHandleChange}
                  name="txtEmail"
                  value={txtEmail}
                  required
                  autofocus
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Họ và Tên"
                  onChange={this.onHandleChange}
                  name="txtHoTen"
                  value={txtHoTen}
                  autofocus
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="tel"
                  placeholder="Số Điện Thoại"
                  onChange={this.onHandleChange}
                  name="txtSDT"
                  minlength="10"
                  pattern="^[0-9]*$"
                  value={txtSDT}
                  required
                  autofocus
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Địa Chỉ"
                  onChange={this.onHandleChange}
                  name="txtDiaChi"
                  value={txtDiaChi}
                  required
                  autofocus
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Select
                  defaultValue={display}
                  onChange={this.handleChangeDistricts}
                  name="txtCity"
                  ref="fieldCity"
                >
                  <option>Tỉnh, Thành Phố</option>
                  {cities.map((city, index) => {
                    return (
                      <option
                        key={index}
                        value={city.code}
                        namecity={city.name}
                      >
                        {city.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Select
                  onChange={this.handleChangeWards}
                  name="txtPhuong"
                  ref="fieldDistrict"
                >
                  <option>Quận, Huyện</option>
                  {this.showListDistrict(districts)}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Select
                  name="txtXa"
                  onChange={this.onHandleChange}
                  ref="fieldWards"
                >
                  <option>Phường, Xã</option>
                  {this.showListWards(wards)}
                </Form.Select>
              </Form.Group>
              <FloatingLabel label="Ghi Chú" name="txtGhiChu">
                <Form.Control
                  as="textarea"
                  placeholder="Ghi Chú"
                  name="txtGhiChu"
                  style={{ height: "100px" }}
                  onChange={this.onHandleChange}
                />
              </FloatingLabel>
              <Button
                variant="danger"
                type="submit"
                size="lg"
                className="Cart__Checkout-button mt-5"
              >
                Đặt Hàng
              </Button>
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
                  Thanh toán khi giao hàng (COD){" "}
                  <i
                    style={{ color: "#2194C8", fontSize: "20px" }}
                    class="far fa-money-bill-alt"
                  ></i>
                </Alert>
              </Col>
            </Row>
            <Row>
              <Col lg={8}></Col>
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
    onCreateBill: (bills_customer) => {
      dispatch(actions.onAddBillCustomerResquest(bills_customer));
    },
    onCreateBillInfo: (bills_info_customer) => {
      dispatch(actions.onAddBillInfoCustomerResquest(bills_info_customer));
    },

    onBillCancel: (bills) => {
      dispatch(actions.onAddNotificationCancelResquest(bills));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
