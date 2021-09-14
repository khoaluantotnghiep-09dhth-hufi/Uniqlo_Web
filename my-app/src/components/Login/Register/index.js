import { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
class index extends Component{
  onHandleChange = (event) => {
    event.preventDefault();
    this.props.onHandleChange(this.state);
  };
    render(){
        return(
          <Col>
            <h5 className="text-center">Đăng Ký</h5>
            <Form >
              <Form.Group className="mb-3" controlId="formBasicHo">
                <Form.Control       
                  className="fas fa-user"          
                  type="text"
                  placeholder="&#xf007; Họ"
                  onChange={this.props.onHandleChange}
                  name="txtHo"
                  required autofocus
                />
              </Form.Group>           
              <Form.Group className="mb-3" controlId="formBasicTen">
                <Form.Control
                  className="fas fa-user"          
                  type="text"
                  placeholder="&#xf007; Tên"
                  onChange={this.props.onHandleChange}
                  name="txtTen"
                  required autofocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  className="fas fa-envelope"
                  type="email"
                  placeholder="&#xf0e0; Email"
                  onChange={this.props.onHandleChange}
                  name="txtEmail"
                  required autofocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Control
                  className="fas fa-phone-alt"
                  type="text"
                  placeholder="&#xf879; Số Điện Thoại"
                  onChange={this.props.onHandleChange}
                  name="txtSDT"
                  maxlength="11" 
                  minlength="10" 
                  pattern="^[0-9]*$" 
                  required autofocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  className="fas fa-lock"
                  type="password"
                  placeholder="&#xf023; Mật Khẩu"
                  onChange={this.props.onHandleChange}
                  name="txtMatKhau"
                  minlength="8" 
                  maxlength="25" 
                  required autofocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Button
                  variant="outline-secondary"
                  type="submit"
                  className="button--width"
                >
                  Đăng Ký
                </Button>
              </Form.Group>
            </Form>
          </Col>
        );
    }
}
export default index;