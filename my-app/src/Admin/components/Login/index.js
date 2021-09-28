import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Component } from "react";
import * as actions from "./../../../actions/index";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";
import HomePage from "../../containers/TheLayout";
import { toast } from 'react-toastify';
import "./login.scss";
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
      toastLogin: "",
      isCheckLogin: false,
    };
  }
  componentDidMount() {
    this.props.onFetchUsers();
  }

  onHandleSubmitLogin = (users) => (event) => {
    event.preventDefault();
    var { txtEmail, txtPassword, items } = this.state;
    console.log("data user", users)
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === txtEmail && users[i].password === txtPassword) {
        var user = {
          id_user: users[i].id,
          name: users[i].name,
          phone: users[i].phone,
          password: users[i].password,
          postion: users[i].postion,
          role: users[i].role,
          gender: users[i].gender,
          image: users[i].image,
          address: users[i].address,
          email: users[i].email,
          place_of_birth: users[i].place_of_birth,
          cmnn_cccc: users[i].cmnn_cccc,
        };
        this.setState({
          isCheckLogin: true,
        });
        sessionStorage.setItem("user", JSON.stringify(user));
        break;
      } else {
        this.setState({
          isCheckLogin: false,
        });
        // toast.error("Sai Email hoặc Mật Khẩu vui lòng thử lại !");
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
    var { staff } = this.props;
    var { isCheckLogin } = this.state;
    console.log(isCheckLogin);
    if (isCheckLogin) {
      return <Route path="/admin" component={HomePage} />
    }
    return (
      <>
        <div fluid="sm" className="login-container login-background">
          <Row className="login-content">
            <Col >
              <h1 className="text-center">Đăng Nhập</h1>
              <Form onSubmit={this.onHandleSubmitLogin(staff)}>
                <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Control
                    className="fas fa-phone-alt login-input"
                    type="text"
                    placeholder="&#xf879; Số Điện Thoại"
                    ref="memberPhone"
                    onChange={this.onHandleChange}
                    name="txtEmail"
                    minlength="10"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    required
                    autofocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    className="fas fa-lock login-input"
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
                    className="btn btn-login"
                  >
                    Đăng Nhập
                  </Button>
                </Form.Group>
                {/* <Form.Group
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
                </Form.Group> */}
              </Form>
            </Col>
          </Row>

        </div>
        {/* <div>
          <Form.Group className="mb-3 " controlId="formBasicPassword">
            <Button
              variant="outline-secondary"
              type="submit"
              className="btn btn-login"
            >
              Đăng Nhập
            </Button>
          </Form.Group>
        </div> */}
      </>
    );
  }
}
var mapStateToProps = (state) => {
  return {
    staff: state.staff,
    cart: state.cart,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onFetchUsers: () => {
      return dispatch(actions.fetchStaffsResquest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
