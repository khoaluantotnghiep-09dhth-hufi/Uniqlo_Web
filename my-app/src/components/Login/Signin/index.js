import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Component } from "react";
import * as actions from "./../../../actions/index";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Forgot_Password from "../Forgot_Pass/index";
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
      isForgotPass: false,
      txtForgotButton: "Quên mật khẩu ?",
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
      // if (users[i].phone !== txtPhone || users[i].password !== txtPassword){
      //   toast.error(<div>Đăng nhập thất bại.<br /> Bạn cần nhập đúng thông tin!</div>, {autoClose: 2500} , { position: toast.POSITION.UPPER_RIGHT });
      //   return;
      // }
      if (users[i].phone !== txtPhone){
        //toast.error(<div>Đăng nhập thất bại.<br />Tài khoản không tồn tại!</div>, {autoClose: 2500} , { position: toast.POSITION.UPPER_RIGHT });
       
      }
     else if (users[i].phone === txtPhone && users[i].password !== txtPassword){
        //toast.error(<div>Đăng nhập thất bại.<br />Mật khẩu không chính xác!</div>, {autoClose: 2500} , { position: toast.POSITION.UPPER_RIGHT });
        
      }  
      else if (users[i].phone === txtPhone && users[i].password === txtPassword) {
        // var user = {
        //   id_user: users[i].id,
        //   name: users[i].name,
        //   phone: users[i].phone,
        //   password: users[i].password,
        // };
        var user = {
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

  onToggleFormForgotPass = () => {
    this.setState({
      isForgotPass: !this.state.isForgotPass,  
      txtForgotButton: this.state.txtForgotButton == "Quên mật khẩu ?"?"Huỷ !" : "Quên mật khẩu ?",
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
    
    var { users } = this.props;
    var { isCheckLogin } = this.state;
    var {  isForgotPass } = this.state;
    var { txtForgotButton } = this.state;
    var elmForgotPass = isForgotPass ? (
      <Forgot_Password onCloseForm={this.onCloseForm} />
    ) : (
      ""
    );
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
            {/* <a
              href="#"
              style={{ color: "#666", borderBottom: "1px solid #ccc" }}
              onClick={this.props.onToggleForm}
            >
              Quên Mật Khẩu?
            </a> */}
            {/* <Forgot_Password
            className="col-sm-6 col-xs-12"
            onSubmit={this.onToggleFormForgotPass}
          /> */}
          {elmForgotPass}
          <Form.Group
            className="mb-3 text-center"
            controlId="formBasicPassword">
              <a
                style={{ color: "#666", borderBottom: "1px solid #ccc" }}
                //onClick={this.onToggleFormForgotPass}
                href="/forgot_password">
                {txtForgotButton}
                
              </a>
          </Form.Group>
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
