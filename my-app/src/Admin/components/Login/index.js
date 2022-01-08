import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Component } from "react";
import * as actions from "./../../../actions/index";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";
import HomePage from "../../containers/TheLayout";
import { toast } from 'react-toastify';
import "./login.scss";
import forgotPW from '../Login/forgotPassword';
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
      }
      else {
        toast.error("Sai Email hoặc Mật Khẩu vui lòng thử lại !");
        this.setState({
          isCheckLogin: false,
        });
      }
    }
  };
  onToggleForm = () => {
    this.props.onToggleForm();
  };
  forgotPassword = () => {
    <Route to="/admin/forgotpasword" />
  }
  onHandleChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === 13) {
      this.onHandleSubmitLogin();
    }
  }
  render() {
    var { staff } = this.props;
    var { isCheckLogin } = this.state;

    if (isCheckLogin) {
      //toast.error("Sai Email hoặc Mật Khẩu vui lòng thử lại !");
      return <Route path="/admin" component={HomePage} />
    }
    return (
      <>
        <div fluid="sm" className="login-background login-container">
          <div className=" login-container2 ">


            <Row className="login-content">
              <Col >
                <h1 className="text-center text-danger">Đăng Nhập</h1>
                <Form onSubmit={this.onHandleSubmitLogin(staff)} >
                  <Form.Group className="mb-3" >
                    <Form.Control
                      className="fas fa-envelope login-input"
                      type="email"
                      placeholder="&#xf0e0; Email"
                      ref="memberEmail"
                      onChange={this.onHandleChange}
                      name="txtEmail"
                      minlength="10"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      required
                      autofocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" >
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

                  <Form.Group className="mb-3 text-center" >
                    <Button
                      variant="outline-secondary"
                      type="submit"
                      className="btn btn-login"
                      onKeyDown={(event) => this.handleKeyDown(event)}
                    >
                      Đăng Nhập
                    </Button>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 text-center"
                    controlId="formBasicPassword"
                  >
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </div>
        </div>

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
