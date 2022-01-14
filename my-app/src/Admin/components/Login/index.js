import { Component } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { toast } from "react-toastify";
import HomePage from "../../containers/TheLayout";
import * as actions from "./../../../actions/index";
import callApi from "./../../../Admin/utils/Callapi";
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

  onHandleSubmitLogin = (event) => {
    event.preventDefault();
    var { txtEmail, txtPassword } = this.state;
    var userPost = {
      phone: txtEmail,
      password: txtPassword,
    };

    callApi("login-admin", "POST", userPost)
      .then((response) => {
        var users = response.data[0];

        var userAccountAdmin = {
          id_user: users.id,
          name: users.name,
          phone: users.phone,
          image: users.image,
          email: users.email,
          gender: users.gender,
          cmnn_cccc: users.cmnn_cccc,
          password: users.password,
          place_of_birth: users.place_of_birth,
          address: users.address,
          role: users.role,
        };

        toast.success(
          <div>Đăng nhập thành công!</div>,
          { autoClose: 2500 },
          { position: toast.POSITION.UPPER_RIGHT }
        );
        sessionStorage.setItem("admin", JSON.stringify(userAccountAdmin));
        this.setState({
          isCheckLogin: true,
        });
      })
      .catch( (error) => {
        console.error(error);
        toast.error(
          <div>
            Đăng nhập thất bại.
            <br /> Bạn cần nhập đúng thông tin!
          </div>,
          { autoClose: 2500 },
          { position: toast.POSITION.UPPER_RIGHT }
        )
      }
        
      );
  };
  onToggleForm = () => {
    this.props.onToggleForm();
  };
  forgotPassword = () => {
    <Route to="/admin/forgotpasword" />;
  };
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
  };
  render() {
    var { staff } = this.props;
    var { isCheckLogin } = this.state;

    if (isCheckLogin) {
      //toast.error("Sai Email hoặc Mật Khẩu vui lòng thử lại !");
      return <Route path="/admin" component={HomePage} />;
    }
    return (
      <>
        <div fluid="sm" className="login-background login-container">
          <div className=" login-container2 ">
            <Row className="login-content">
              <Col>
                <h1 className="text-center text-danger">Đăng Nhập</h1>
                <Form onSubmit={this.onHandleSubmitLogin}>
                  <Form.Group className="mb-3">
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
                  <Form.Group className="mb-3">
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

                  <Form.Group className="mb-3 text-center">
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
                  ></Form.Group>
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
