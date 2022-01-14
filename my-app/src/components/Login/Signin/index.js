import { Col, Form, Button } from "react-bootstrap";
import { Component } from "react";

import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import callApi from "./../../../Admin/utils/Callapi";

import Forgot_Password from "../Forgot_Pass/index";
import { NavLink } from "react-router-dom";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtPhone: "",
      txtPassword: "",

      isCheckLogin: false,
      isForgotPass: false,
      txtForgotButton: "Quên mật khẩu ?",
    };
  }

  onHandleSubmitLogin = (event) => {
    event.preventDefault();
    var { txtPhone, txtPassword } = this.state;
    var userPost = {
      phone: txtPhone,
      password: txtPassword,
    };

    callApi("login-web", "POST", userPost).then((response) => {
      var users = response.data;
      for (let i = 0; i < users.length; i++) {
        var userAccount = {
          id_user: users[i].id,
          name: users[i].name,
          address: users[i].address,
          phone: users[i].phone,
          image: users[i].image,
          email: users[i].email,
          gender: users[i].gender,
          cmnn_cccc: users[i].cmnn_cccc,
          score: users[i].score,
          password: users[i].password,
        };
      }

      if (response.data.length === 0) {
        toast.error(
          <div>
            Đăng nhập thất bại.
            <br /> Bạn cần nhập đúng thông tin!
          </div>,
          { autoClose: 2500 },
          { position: toast.POSITION.UPPER_RIGHT }
        );
      } else {
        toast.success(
          <div>Đăng nhập thành công!</div>,
          { autoClose: 2500 },
          { position: toast.POSITION.UPPER_RIGHT }
        );

        sessionStorage.setItem("client", JSON.stringify(userAccount));
        this.setState({
          isCheckLogin: true,
        });
      }
    });
  };

  onToggleFormForgotPass = () => {
    this.setState({
      isForgotPass: !this.state.isForgotPass,
      txtForgotButton:
        this.state.txtForgotButton == "Quên mật khẩu ?"
          ? "Huỷ !"
          : "Quên mật khẩu ?",
    });
  };
  onToggleForm = () => {
    this.props.onToggleForm();
  };
  onHandleChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
  render() {
    var { isCheckLogin } = this.state;
    var { isForgotPass } = this.state;
    var { txtForgotButton } = this.state;
    var elmForgotPass = isForgotPass ? (
      <Forgot_Password onCloseForm={this.onCloseForm} />
    ) : (
      ""
    );

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
      <Col>
        <h5 className="text-center">Đăng Nhập</h5>
        <Form onSubmit={this.onHandleSubmitLogin}>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Control
              id="txtPhone"
              className="fas fa-phone-alt"
              type="text"
              placeholder="&#xf879; Số Điện Thoại"
              ref="memberPhone"
              onChange={this.onHandleChange}
              name="txtPhone"
              maxlength="11"
              minlength="10"
              pattern="^[0-9]*$"
              required
              autofocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              className="fas fa-lock"
              type="password"
              placeholder="&#xf023; Mật Khẩu"
              ref="memberPassword"
              onChange={this.onHandleChange}
              name="txtPassword"
              id="txtPassword"
              minlength="1"
              maxlength="25"
              required
              autofocus
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
            {elmForgotPass}
            <Form.Group
              className="mb-3 text-center"
              controlId="formBasicPassword"
            >
              <NavLink
                style={{ color: "#666", borderBottom: "1px solid #ccc" }}
                to="/forgot_password"
              >
                {txtForgotButton}
              </NavLink>
            </Form.Group>
          </Form.Group>
        </Form>
      </Col>
    );
  }
}

export default index;
