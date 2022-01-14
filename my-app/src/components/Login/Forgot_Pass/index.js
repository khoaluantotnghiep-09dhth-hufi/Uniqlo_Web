import { getAuth, RecaptchaVerifier } from "firebase/auth";
import React, { Component } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import firebase from "../../../firebase";
import * as actions from "./../../../actions/index";
import callApi from "./../../../Admin/utils/Callapi";
import "./Forgot_Pass.scss";

const auth = getAuth();

var sessionUser = JSON.parse(sessionStorage.getItem("client"));
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      passwordnew: "",
      otp: "",
      isCheckLogin: false,
      isDisplayFormAuthen: false,
      redirect: false,
    };
  }
  componentDidMount() {
    this.props.onFetchUsers();
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  configureCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onSignInSubmit();
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
          toast.success(
            <div>Nhập reCAPTCHA và thử lại!</div>,
            { autoClose: 2500 },
            { position: toast.POSITION.UPPER_RIGHT }
          );
        },
        //defaultCountry: "IN"
      },
      auth
    );
  };
  onSignInSubmit = (e) => {
   
    e.preventDefault();
    this.configureCaptcha();
    const phoneNumber = "+84" + this.state.mobile;

    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        toast.success(
          <div>Mã OTP đã được gửi!</div>,
          { autoClose: 2500 },
          { position: toast.POSITION.UPPER_RIGHT }
        );

        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        toast.error(
          <div>Không thể gửi SMS!</div>,
          { autoClose: 2500 },
          { position: toast.POSITION.UPPER_RIGHT }
        );

      });
    this.setState({
      isDisplayFormAuthen: true,
    });
  };
  onSubmitOTP = (e) => {
    e.preventDefault();
    const code = this.state.otp;

    var{users}=this.props;
    var { mobile, passwordnew } = this.state;
    var takeIdUserToUpdate=users.find(user => user.phone===mobile);

    var userPost = {
     
      phone: mobile,
      password: passwordnew,
    };


    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;

        toast.success(
          <div>Xác minh thành công!</div>,
          { autoClose: 2500 },
          { position: toast.POSITION.UPPER_RIGHT }
        );
        // this.props.onUpdateItemCustomerClient(userPost);
        var id = takeIdUserToUpdate.id;
        callApi(`customers_client/${id}`, "PUT", userPost).then(res=>{
          this.setState({redirect:true});
        });

        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        toast.error(
          <div>Xác minh thất bại!</div>,
          { autoClose: 2500 },
          { position: toast.POSITION.UPPER_RIGHT }
        );
      });
  };
  render() {

    var { isDisplayFormAuthen,redirect } = this.state;
    if (redirect) {
      return <Redirect to="/login" />;
    }
    var confirmAuthen =
      isDisplayFormAuthen === false ? (
        ""
      ) : (
        <Col>
          <h3 className="text-left">Xác Nhận OTP</h3>
          <Form onSubmit={this.onSubmitOTP}>
            <Form.Group className="mb-3">
              <Form.Control
                className="fas fa-phone-alt mt-5"
                type="number"
                placeholder="&#xf879; Enter OTP"
                ref="memberOTP"
                onChange={this.handleChange}
                name="otp"
                required
                autofocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Button
                variant="outline-secondary"
                type="submit"
                className="button--width"
              >
                Xác nhận
              </Button>
            </Form.Group>
            <Form.Group
              className="mb-3 text-center"
              controlId="formBasicPassword"
            ></Form.Group>
          </Form>
        </Col>
      );
    return (
      <Container>
        <Row className="Account-padding">
          <Col>
            <h3 className="text-left">Quên Mật Khẩu</h3>

            <Form onSubmit={this.onSignInSubmit}>
              {/* <div class="acctitle"><i class="fa fa-refresh"></i> Quên mật khẩu</div> */}
              <div id="sign-in-button"></div>
              <Form.Group className="mb-5">
                <Form.Control
                  className="fas fa-phone-alt mt-5"
                  type="number"
                  placeholder="&#xf879; Số Điện Thoại"
                  ref="memberPhone"
                  onChange={this.handleChange}
                  name="mobile"
                  maxlength="11"
                  minlength="10"
                  pattern="^[0-9]*$"
                  required
                  autofocus
                />
                <Form.Control
                  className="fas fa-key-alt mt-3"
                  type="password"
                  placeholder="&#xf084; Mật khẩu mới"
                  ref="memberPasswordNew"
                  onChange={this.handleChange}
                  name="passwordnew"
                  maxlength="20"
                  minlength="6"
                  //pattern="^[0-9]*$"
                  required
                  autofocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Button
                  variant="outline-secondary"
                  type="submit"
                  className="button--width"
                >
                
                  Gửi
                </Button>
              </Form.Group>
              <Form.Group
                className="mb-3 text-center"
                controlId="formBasicPassword"
              ></Form.Group>
            </Form>
          </Col>
          <Col>{confirmAuthen}</Col>
        </Row>
        {/* <Row>
          <Col>
            
          </Col>
        </Row> */}
      </Container>
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
    onUpdateItemCustomerClient: (customer) => {
      dispatch(actions.onUpdateCustomersClientResquest(customer));
    },
    onFetchUsers: () => {
      return dispatch(actions.fetchUserRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
