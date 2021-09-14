import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Component } from "react"
class index extends Component{
  constructor(props) {
    super(props);
    
  }
  
  onToggleForm=()=>{
    this.props.onToggleForm();
  };
    render(){
        return(
          <Col>
            <h5 className="text-center">Đăng Nhập</h5>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Control
                  className="fas fa-phone-alt"
                  type="text"
                  placeholder="&#xf879; Số Điện Thoại"
                  ref="memberPhone"
                  onChange={this.onHandleChange}
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
                  ref="memberPassword"
                  onChange={this.onHandleChange}
                  name="txtPassword"
                  minlength="8" 
                  maxlength="25" 
                  required autofocus
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

export default index;

