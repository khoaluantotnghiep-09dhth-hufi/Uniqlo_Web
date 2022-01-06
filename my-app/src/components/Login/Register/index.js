import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Callapi from "../../../Admin/utils/Callapi";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import uniqid from "uniqid";
import { Button, Form, Col, Container, Row } from "react-bootstrap";
import * as actions from "./../../../actions/index";
import { toast } from "react-toastify";
class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idItem: "",
      txtName: "",
      txtAddress: "",
      txtPhone: "",
      txtImage: "",
      txtPassword: "",
      txtEmail: "",
      errorPhone: "",
    };
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
      errorPhone: target.validationMessage,
    });
  };
  onField = () => {
    this.refs.fieldName.value = "";
    this.refs.fieldAddress.value = "";
    this.refs.fieldPhone.value = "";
    this.refs.fieldEmail.value = "";
    this.refs.fieldPass.value = "";
  };
  onSubmitForm = (event) => {
    event.preventDefault();
    var { txtName, txtAddress, txtPhone, txtImage, txtPassword, txtEmail } =
      this.state;

    var customer = {
      id: uniqid("customer-"),
      name: txtName,
      address: txtAddress,
      phone: txtPhone,
      image: txtImage,
      password: txtPassword,
      email: txtEmail,
    };
    var { users } = this.props;
    for (let i = 0; i < users.length; i++) {
      if (users[i].phone === txtPhone && users[i].email === txtEmail) {
        toast.error(
          <div>
            Số điện thoại và Email đã tồn tại.
            <br /> Bạn cần nhập lại thông tin khác!
          </div>,
          { autoClose: 2500 },
          { position: toast.POSITION.UPPER_RIGHT }
        );
        return;
      }
      if (users[i].phone === txtPhone) {
        toast.error(
          <div>
            Số điện thoại đã tồn tại.
            <br /> Bạn cần nhập lại số khác!
          </div>,
          { autoClose: 2500 },
          { position: toast.POSITION.UPPER_RIGHT }
        );
        return;
      }
      if (users[i].email === txtEmail) {
        toast.error(
          <div>
            Email đã tồn tại.
            <br /> Bạn cần nhập lại email khác!
          </div>,
          { autoClose: 2500 },
          { position: toast.POSITION.UPPER_RIGHT }
        );
        return;
      }
    }
    if (
      txtName === "" &&
      txtAddress === "" &&
      txtPhone === "" &&
      txtEmail === "" &&
      txtPassword === ""
    ) {
      toast.error(
        <div>
          Đăng ký thất bại.
          <br /> Bạn cần nhập đủ thông tin!
        </div>,
        { autoClose: 2500 },
        { position: toast.POSITION.UPPER_RIGHT }
      );
    } else {
      this.props.onAddItemCustomerClient(customer);
      this.onField();
    }
  };

  render() {
    return (
      <Col>
        <h5 className="text-center">Đăng Ký</h5>
        <Form onSubmit={this.onSubmitForm}>
          <Form.Group className="mb-3" controlId="formBasicObject">
            <Form.Control
              required
              autofocus
              className="fas fa-user"
              type="text"
              placeholder="&#xf007; Họ và tên..."
              name="txtName"
              id="txtName"
              pattern=".{3,}"
              ref="fieldName"
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicObject">
            <Form.Control
              required
              autofocus
              className="fas fa-address-card"
              type="text"
              placeholder="&#xf2bb; Địa chỉ..."
              name="txtAddress"
              id="txtAddress"
              ref="fieldAddress"
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicObject">
            <Form.Control
              required
              autofocus
              className="fas fa-phone-alt"
              type="text"
              placeholder="&#xf879; Số Điện Thoại"
              name="txtPhone"
              id="txtPhone"
              maxlength="11"
              minlength="10"
              pattern="^[0-9]*$"
              ref="fieldPhone"
              onChange={this.onChange}
            />
            <div className="invalid-feedback d-block">
              {this.state.errorPhone}
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicObject">
            <Form.Control
              required
              autofocus
              className="fas fa-envelope"
              type="email"
              placeholder="&#xf0e0; Email"
              name="txtEmail"
              id="txtEmail"
              ref="fieldEmail"
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicObject">
            <Form.Control
              required
              autofocus
              className="fas fa-lock"
              type="password"
              placeholder="&#xf023; Mật Khẩu"
              name="txtPassword"
              id="txtPassword"
              pattern=".{6,}"
              ref="fieldPass"
              //pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
              onChange={this.onChange}
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
    );
  }
}
var mapStateToProps = (state) => {
  return {
    customer: state.customer,
    users: state.users,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onAddItemCustomerClient: (customer) => {
      dispatch(actions.onAddCustomerClientResquest(customer));
    },
    onFetchUsers: () => {
      return dispatch(actions.fetchUserRequest());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
