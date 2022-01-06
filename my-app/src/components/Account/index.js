import React, { Component } from "react";
import io from "socket.io-client";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { MDBIcon } from "mdbreact";
import Call_API from "./../../Admin/utils/Callapi";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  FloatingLabel,
  Form,
} from "react-bootstrap";

import { toast } from "react-toastify";
import uniqid from "uniqid";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./../../actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus, faTimes, faTools } from "@fortawesome/free-solid-svg-icons";
import { CButton, CDataTable } from "@coreui/react";
const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  minimumFractionDigits: 0,
});

const fields = [
  "STT",
  { key: "order_date", label: "Ngày Đặt" },
  { key: "delivery_date", label: "Ngày Giao" },
  { key: "total", label: "Giá Đơn hàng" },
  { key: "total_quantity", label: "Số Lượng" },
  { key: "status", label: "Tình Trạng" },
  "Hành Động",
];
const socket = io("http://localhost:3008");

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckSignOut: false,
      show: false,
      showReturn: false,
      setShow: false,
      txtHuyDon: "",
      txtPhone: "",
      txtPassword: "",
      isCheckRequest: "",
      isCheckRequestReturn: "",
      dataBill: [],
    };
  }
  componentDidMount() {
    var sessionUser = JSON.parse(sessionStorage.getItem("client"));
    this.props.fetchBillsCustomer(sessionUser.id_user);

    Call_API(`bill-customer/${sessionUser.id_user}`, "GET", null).then((response) => {
      this.setState({
        dataBill: response.data,
      })
    })
  }
  handleClose = () => {
    this.setState({
      show: !true,
      showReturn: !true,
    });
  };
  handleShow = (id) => {
    this.setState({
      show: !false,
      isCheckRequest: id,
    });
  };
  handleReturnShow = (id) => {
    this.setState({
      showReturn: !false,
      isCheckRequestReturn: id,
    });
  };
  onSignOut = () => {
    var { cart } = this.props;
    sessionStorage.clear("client");
    localStorage.clear();

    this.props.onResetCart(cart);

    this.setState({ isCheckSignOut: true });
  };
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
  onSubmitForm = (event) => {
    // eslint-disable-next-line no-return-assign, no-param-reassign
    event.preventDefault(); // eslint-disable
    var { txtPhone, txtPassword, txtHuyDon, isCheckRequest } = this.state;
    console.log(isCheckRequest);

    // for (let i = 0; i < users.length; i++) {
    //   if (users[i].phone === txtPhone && users[i].password === txtPassword) {
    //     var user = {
    //       id_user: users[i].id,
    //       name: users[i].name,
    //       phone: users[i].phone,
    //       password: users[i].password,
    //     };
    //     this.setState({
    //       isCheckLogin: true,
    //     });
    //     sessionStorage.setItem("client", JSON.stringify(user));
    //   } else {
    //     this.setState({
    //       isCheckLogin: false,
    //     });
    //   }
    // }
    var sessionUser = JSON.parse(sessionStorage.getItem("client"));

    var name = sessionUser.name;
    var id_bill = isCheckRequest.id;
    var reasons = txtHuyDon;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var bills = {
      id: uniqid("message- "),
      content: "Có " + "Khách Hàng " + name + " Hủy Đơn " + id_bill + " Lý Do " + reasons + " Nè",
      time: date + ' ' + time,
    };
    
    if (bills) {

      this.props.onBillCancel(bills);
      toast.success("Khách Hàng Đã Yêu Cầu Hủy Đơn Thành Công, WebSocket");
    }

    socket.emit("customer-request-cancel-bill", {
      name,
      id_bill,
      today,
      reasons,
    });


    this.handleClose();
  };
  onSubmitFormReturn = (event) => {
    event.preventDefault();
    var { txtPhone, txtPassword, txtHuyDon, isCheckRequestReturn } = this.state;
    console.log(isCheckRequestReturn);
    var sessionUser = JSON.parse(sessionStorage.getItem("client"));

    var name = sessionUser.name;
    var id_billReturn = isCheckRequestReturn.id;
    var reasons = txtHuyDon;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var billReturn = {
      id: uniqid("message- "),
      content: "Có " + "Khách Hàng " + name + " Yêu cầu trả hàng " + id_billReturn + " Lý Do " + reasons + " Nè",
      time: date + ' ' + time,
    };
    if (billReturn) {

      this.props.onBillCancel(billReturn);
      toast.success("Khách Hàng Đã Yêu Cầu Trả Hàng Thành Công, WebSocket");
    }
    socket.emit("customer-request-cancel-bill", {
      name,
      id_billReturn,
      today,
      reasons,
    });
    this.handleClose();
  };
  render() {
    var { bills_customer, users } = this.props;
    var { show, showReturn, isCheckRequest, dataBill, isCheckRequestReturn } = this.state;
    var sessionUser = JSON.parse(sessionStorage.getItem("client"));

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
                  {/* Xin chào, <span>{sessionUser && sessionUser.length > 0 ? sessionUser.name : ''}</span> */}
                  Xin chào: <strong> {sessionUser && sessionUser.name}</strong>
                </h6>
                <h6>
                  {/* Xin chào, <span>{sessionUser && sessionUser.length > 0 ? sessionUser.name : ''}</span> */}
                  Điểm tích luỹ: <strong> {sessionUser.score} <MDBIcon fab icon="viacoin" /></strong>
                </h6>
              </Col>
            </Row>
            <Row>
              <Col>
                <CDataTable
                  items={dataBill}
                  fields={fields}
                  itemsPerPage={5}
                  hover
                  sorter
                  pagination
                  scopedSlots={{
                    total: (item) => <td>{formatter.format(item.total)}</td>,
                    status: (item) => (
                      <td>{item.status === 0 ? "Chờ xác nhận" 
                      : item.status === 1 ? "Đã xác nhận" 
                      : item.status === 2 ? "Chờ giao hàng" 
                      : item.status === 3 ? "Đang giao hàng" : "Đã giao hàng"}</td>
                    ),
                    order_date: (item) => (
                      <td>
                        <Moment format="DD/MM/YYYY">{item.order_date}</Moment>
                      </td>
                    ),

                    delivery_date: (item) => (
                      <td>
                        {item.delivery_date ? (
                          <Moment format="DD/MM/YYYY">
                            {item.delivery_date}
                          </Moment>
                        ) : (
                          <p>Chờ Xác Nhận</p>
                        )}
                      </td>
                    ),
                    "Hành Động": (item) => (
                      <td>
                        {item.status === 0 ? (
                          <Button
                            type="button"
                            variant="outline-secondary"
                            size="sm"
                            style={{ margin: 0 }}
                            onClick={() => {
                              this.handleShow(item);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faTimes}
                              className="mr-2"
                              size="sm"
                            />
                            
                            {isCheckRequest ? (
                              <small> Chờ Xác Nhận</small>
                            ) : ( 
                            <small> Hủy Đơn</small>
                            )}
                          </Button>
                        ) : (
                          ""
                        )}
                        {item.status === 4 ? (
                          <Button
                            type="button"
                            variant="outline-secondary"
                            size="sm"
                            style={{ margin: 0 }}
                            onClick={() => {
                              this.handleReturnShow(item);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faTimes}
                              className="mr-2"
                              size="sm"
                            />
                            
                            {isCheckRequestReturn ? (
                              <small> Chờ Xác Nhận</small>
                            ) : ( 
                            <small> Yêu cầu trả hàng</small>
                            )}
                          </Button>
                        ) : (
                          ""
                        )}
                        <Link to={`/account/customer-detail-bill/${item.id}`}>
                          <Button className="mt-2"
                            type="button"
                            variant="outline-secondary"
                            size="sm"
                            style={{ margin: 0 }}
                          >
                            <small> Chi Tiết</small>
                          </Button>
                        </Link>
                      </td>
                    ),
                    STT: (item, index) => <td>{index + 1}</td>,
                  }}
                />
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
                {/* <h6>Tên tài khoản: {sessionUser && sessionUser.length > 0 ? sessionUser.name : ''}</h6> */}
                <h6>
                  Tên tài khoản: <strong> {sessionUser && sessionUser.name}</strong>
                </h6>
              </Col>
            </Row>
            <Row>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <Link to="/account/customer-profile">
                  <Button
                    type="submit"
                    variant="outline-secondary"
                    size="sm"
                    style={{ margin: 0 }}
                  >
                    <h6 style={{ marginBottom: 0 }}>Thay đổi thông tin</h6>
                  </Button>
                </Link>&nbsp;
                <Link to="/account/member-benifits">
                  <Button
                    className="mt-2"
                    type="submit"
                    variant="outline-secondary"
                    size="sm"
                    style={{ margin: 0 }}
                  >
                    <h6 style={{ marginBottom: 0 }}>Quyền Lợi Thành Viên</h6>
                  </Button>
                </Link>&nbsp;
                <Button
                  type="submit"
                  variant="outline-secondary"
                  size="sm"
                  style={{ margin: 0, marginTop: 5 }}
                  onClick={this.onSignOut}
                >
                  <h6 style={{ marginBottom: 0 }}>Đăng Xuất</h6>
                </Button>{" "}
              </Col>
            </Row>
          </Col>
        </Row>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Yêu Cầu Hủy Đơn Hàng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.onSubmitForm}>
              <FloatingLabel
                controlId="floatingTextarea"
                label="Xin Mời Nhập Lý Do"
                className="mb-3"
                required
                name="txtHuyDon"
              >
                <Form.Control
                  as="textarea"
                  name="txtHuyDon"
                  placeholder="Leave a comment here"
                  maxlenght="100"
                  required
                  autofocus
                  onChange={this.onChange}
                />
              </FloatingLabel>
              <Button type="submit" variant="outline-secondary">
                Gửi Yêu Cầu
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={this.handleClose}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showReturn} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Yêu Cầu Trả Hàng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.onSubmitFormReturn}>
              <FloatingLabel
                controlId="floatingTextarea"
                label="Xin Mời Nhập Lý Do"
                className="mb-3"
                required
                name="txtHuyDon"
              >
                <Form.Control
                  as="textarea"
                  name="txtHuyDon"
                  placeholder="Leave a comment here"
                  maxlenght="100"
                  required
                  autofocus
                  onChange={this.onChange}
                />
              </FloatingLabel>
              <Button type="submit" variant="outline-secondary">
                Gửi Yêu Cầu
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={this.handleClose}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}
var mapStateToProps = (state) => {
  return {
    cart: state.cart,
    bills_customer: state.bills_customer,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onResetCart: (product) => {
      dispatch(actions.onRestCart(product));
    },
    onBillCancel: (bills) => {
      dispatch(actions.onAddNotificationCancelResquest(bills));
    },
    fetchBillsCustomer: (id_customer) => {
      dispatch(actions.fetchBillsCustomerResquest(id_customer));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
