import React, { Component } from "react";
import "./Account.scss";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./../../actions/index";
import Signin from "./Signin/index";
import Register from "./Register/index";
import Forgot_Password from "./Forgot_Pass/index";
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
      isCheckLogin: false,
      isForgotPass: false,
    };
  }
  componentDidMount() {
    this.props.onFetchUsers();
  }
  onHandleSubmitLogin = (users) => (event) => {
    event.preventDefault(); //Xoá dòng này sẽ tự chuyển trang chứ ko chuyển trang bằng tay
    var { txtSDT, txtPassword, items } = this.state;

    for (let i = 0; i < users.length; i++) {
      if (users[i].phone === txtSDT && users[i].password === txtPassword) {
        var user = {
          id: users[i].id,
          name: users[i].name,
          phone: users[i].phone,
          password: users[i].password,
        };
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("items", JSON.stringify(items));
        this.setState({
          isCheckLogin: true,
        });
      } else {
     
        this.setState({
          isCheckLogin: false,
        });
      }
    }
  };

  onToggleForm = () => {
    this.setState({
      isForgotPass: !this.state.isForgotPass
    });
  };

  onCloseForm = () => {
    this.setState({
      isForgotPass: false
    });
  };

  onHandleChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onHandleSubmitSignUp = (event) => {
    event.preventDefault();
  };
  
  render() {
    var { users } = this.props;
    var { isCheckLogin, isForgotPass } = this.state;
    
    var elmForgotPass = isForgotPass ? (
      <Forgot_Password 
        onCloseForm={this.onCloseForm} 
        onHandleSubmitSignUp = {this.onHandleSubmitSignUp}/>
        ) : ("");
    var elmSignIn = !isForgotPass ? (
      <Signin 
        onCloseForm={this.onCloseForm} 
        onSubmit = {this.onHandleSubmitLogin(users)}/>
      ) : ("");
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
      <Container>
        <Row className="Account-padding">    

          {elmForgotPass}

          {elmSignIn}
          
          {/* <Signin className="col-sm-6 col-xs-12" onSubmit={this.onHandleSubmitLogin(users)}/> */}
          {/* <Form.Group
            className="mb-3 text-center"
            controlId="formBasicPassword">
              <a
                href="#"
                style={{ color: "#666", borderBottom: "1px solid #ccc" }}
                onClick={this.onToggleForm}>
                Quên Mật Khẩu?
              </a>
          </Form.Group> */}

          <Register className="col-sm-6 col-xs-12" onSubmit={this.onHandleSubmitSignUp}/>

        </Row>
      </Container>
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

const ShowTheLocationWithRouter = withRouter(index);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowTheLocationWithRouter);
