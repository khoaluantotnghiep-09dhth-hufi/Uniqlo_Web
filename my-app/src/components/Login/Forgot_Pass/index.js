import {   Col, Form, Button } from "react-bootstrap";
import React, { Component } from "react"
import firebase from '../../../firebase'
import { toast } from "react-toastify";
import { connect } from "react-redux";
import * as actions from "./../../../actions/index";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
const auth = getAuth();
class index extends Component{
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      otp:"",
      isCheckLogin: false,
    };
  }
  componentDidMount() {
    this.props.onFetchUsers();
  }
  handleChange = (e) =>{
    const {name, value } = e.target
    this.setState({
        [name]: value
      })
  }
  configureCaptcha = () =>{
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit();
        console.log("Recaptca varified")
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
        toast.success(<div>Nhập reCAPTCHA và thử lại!</div>, {autoClose: 2500} , { position: toast.POSITION.UPPER_RIGHT });
      }
      //defaultCountry: "IN"
    }, auth);
  }
  onSignInSubmit = (e) => {
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
          toast.success(<div>Mã OTP đã được gửi!</div>, {autoClose: 2500} , { position: toast.POSITION.UPPER_RIGHT });
          console.log("OTP has been sent")
          // ...
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          toast.error(<div>Không thể gửi SMS!</div>, {autoClose: 2500} , { position: toast.POSITION.UPPER_RIGHT });
          console.log("SMS not sent")
        });
  }
  onSubmitOTP = (users) => (e) =>{
    e.preventDefault()
    const code = this.state.otp
    console.log(code)
    var { mobile } = this.state;
    
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(JSON.stringify(user))    
      toast.success(<div>Xác minh thành công!</div>, {autoClose: 2500} , { position: toast.POSITION.UPPER_RIGHT });
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }
    render(){
      var { users } = this.props;
        return(
          <Col>           
            <Form onSubmit={this.onSignInSubmit}>
            <div class="acctitle"><i class="fa fa-refresh"></i> Quên mật khẩu</div>
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
            <Form onSubmit={this.onSubmitOTP(users)}>
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
            </Form>
          </Col>
        );
    }
}
var mapStateToProps = (state) => {
  return {
    users: state.users,
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