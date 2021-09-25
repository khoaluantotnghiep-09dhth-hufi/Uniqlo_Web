import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import Moment from "react-moment";

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
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckSignOut: false,
      show: false,
      setShow: false,
      txtHuyDon: "",
      txtPhone: "",
      txtPassword: "",
      isCheckRequest: false,
    };
  }
  componentDidMount() {
    this.props.fetchBillsCustomer();
  }
  handleClose = () => {
    this.setState({
      show: !true,
    });
  };
  handleShow = () => {
    this.setState({
      show: !false,
    });
  };
  onSignOut = () => {
    var { cart } = this.props;
    sessionStorage.clear("user");
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
  onSubmitForm = (users) => (event) => {
    var {txtPhone, txtPassword, txtHuyDon } = this.state;    
    event.preventDefault();

    for (let i = 0; i < users.length; i++) {
      if (users[i].phone === txtPhone && users[i].password === txtPassword) {
        var user = {
          id_user: users[i].id,
          name: users[i].name,
          phone: users[i].phone,
          password: users[i].password,
        };
        this.setState({
          isCheckLogin: true,
        });
        sessionStorage.setItem("user", JSON.stringify(user));
      } else {
        this.setState({
          isCheckLogin: true,
        });
      }
    }
    console.log(txtHuyDon);
    this.handleClose();
  };
  render() {
    var { bills_customer } = this.props;
    var { show, isCheckRequest } = this.state;
    var sessionUser = JSON.parse(sessionStorage.getItem("user"));
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
                  {/* Xin chào, <span>{sessionUser.name}</span> */}
                </h6>
              </Col>
            </Row>
            <Row>
              <Col>
                <CDataTable
                  items={bills_customer}
                  fields={fields}
                  itemsPerPage={5}
                  hover
                  sorter
                  pagination
                  scopedSlots={{
                    status: (item) => (
                      <td>
                        {/* <CBadge color={getBadge(item.status)}>
                                                        {item.status}
                                                    </CBadge> */}
                      </td>
                    ),
                  }}
                  scopedSlots={{
                    total: (item) => <td>{formatter.format(item.total)}</td>,
                    status: (item) => (
                      <td>{item.status === 0 ? "Chưa Giao" : "Đã Giao"}</td>
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
                            onClick={this.handleShow}
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
                {/* <h6>Tên tài khoản: {sessionUser.name}</h6> */}
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
    fetchBillsCustomer: () => {
      dispatch(actions.fetchBillsCustomerResquest());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
