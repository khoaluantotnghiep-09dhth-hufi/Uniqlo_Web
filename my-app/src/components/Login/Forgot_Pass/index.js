import { Col, Form, Button, Container, Row } from "react-bootstrap";
import React, { Component } from "react"
import firebase from '../../../firebase'
import { toast } from "react-toastify";
import { connect } from "react-redux";
import "./Forgot_Pass.scss"
import * as actions from "./../../../actions/index";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import callApi from "./../../../Admin/utils/Callapi";
const auth = getAuth();
var sessionUser = JSON.parse(sessionStorage.getItem("client"));
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      passwordnew:"",
      otp: "",
      isCheckLogin: false,
      isDisplayFormAuthen: false,
    };
  }
  componentDidMount() {
    this.props.onFetchUsers();
  }
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  configureCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit();

      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
        toast.success(<div>Nhập reCAPTCHA và thử lại!</div>, { autoClose: 2500 }, { position: toast.POSITION.UPPER_RIGHT });
      }
      //defaultCountry: "IN"
    }, auth);
  }
  onSignInSubmit = (e) => {
    debugger
    e.preventDefault()
    this.configureCaptcha()
    const phoneNumber = "+84" + this.state.mobile
    console.log(phoneNumber)
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        toast.success(<div>Mã OTP đã được gửi!</div>, { autoClose: 2500 }, { position: toast.POSITION.UPPER_RIGHT });
        console.log("OTP has been sent")
        // ...
      }).catch((error) => {
        // Error; SMS not sent
        // ...
        toast.error(<div>Không thể gửi SMS!</div>, { autoClose: 2500 }, { position: toast.POSITION.UPPER_RIGHT });
        console.log("SMS not sent")
      });
    this.setState({
      isDisplayFormAuthen: true,
    });
  }
  onSubmitOTP = (e) => {
    e.preventDefault()      
    const code = this.state.otp
    console.log(code)
    var { mobile, passwordnew } = this.state;
    var userPost = {
      // id: sessionUser.id_user,
      phone: mobile,
      password: passwordnew,
    };
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(JSON.stringify(user))
      toast.success(<div>Xác minh thành công!</div>, { autoClose: 2500 }, { position: toast.POSITION.UPPER_RIGHT });
      this.props.onUpdateItemCustomerClient(userPost);
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
      toast.error(<div>Xác minh thất bại!</div>, { autoClose: 2500 }, { position: toast.POSITION.UPPER_RIGHT });
    });
  }
  render() {
    var { users } = this.props;
    var { isDisplayFormAuthen } = this.state;
    var confirmAuthen = isDisplayFormAuthen === false ? "" : (
    <Col>
        <h3 className="text-left">Xác Nhận OTP</h3>
    <Form onSubmit={this.onSubmitOTP}>
      <Form.Group className="mb-3" >
        <Form.Control
          className="fas fa-phone-alt"
          type="number"
          placeholder="&#xf879; Enter OTP"
          ref="memberOTP"
          onChange={this.handleChange}
          name="otp"
          required autofocus
        />
      </Form.Group>
      <Form.Group className="mb-3" >
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
      >
      </Form.Group>
    </Form></Col>);
    return (
      <Container >
        <Row className="Account-padding">

          <Col>
        <h3 className="text-left">Quên Mật Khẩu</h3>

            <Form onSubmit={this.onSignInSubmit}>
              {/* <div class="acctitle"><i class="fa fa-refresh"></i> Quên mật khẩu</div> */}
              <div id="sign-in-button"></div>
              <Form.Group className="mb-3" >
                <Form.Control
                  className="fas fa-phone-alt"
                  type="number"
                  placeholder="&#xf879; Số Điện Thoại"
                  ref="memberPhone"
                  onChange={this.handleChange}
                  name="mobile"
                  maxlength="11"
                  minlength="10"
                  pattern="^[0-9]*$"
                  required autofocus
                />
                <Form.Control
                  className="fas fa-phone-alt"
                  type="password"
                  placeholder="&#xf879; Mật khẩu mới"
                  ref="memberPasswordNew"
                  //onChange={this.handleChange}
                  name="passwordnew"
                  maxlength="20"
                  minlength="6"
                  //pattern="^[0-9]*$"
                  required autofocus
                />
              </Form.Group>
              <Form.Group className="mb-3 " >
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
              >
              </Form.Group>
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