import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Component } from "react";
import * as actions from "./../../../actions/index";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtPhone: "",
      txtPassword: "",
      txtHo: "",
      txtTen: "",
      txtEmail: "",
      isCheckLogin: false,
    };
  }
  componentDidMount() {
    this.props.onFetchUsers();
  }

  onHandleSubmitLogin = (users) => (event) => {
    event.preventDefault(); //Xoá dòng này sẽ tự chuyển trang chứ ko chuyển trang bằng tay
    var { txtPhone, txtPassword, items } = this.state;

    console.log("data user",users)
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
        sessionStorage.setItem("client", JSON.stringify(user));
      } else {
        this.setState({
          isCheckLogin: false,
        });
      }
    }
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
    var { users } = this.props;
    var { isCheckLogin } = this.state;
    console.log(isCheckLogin);
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
        <Form onSubmit={this.onHandleSubmitLogin(users)}>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Control
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
            <a
              href="#"
              style={{ color: "#666", borderBottom: "1px solid #ccc" }}
              onClick={this.props.onToggleForm}
            >
              Quên Mật Khẩu?
            </a>
          </Form.Group>
        </Form>
      </Col>
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

export default connect(mapStateToProps, mapDispatchToProps)(index);
