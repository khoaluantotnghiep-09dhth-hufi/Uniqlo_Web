import {   Col, Form, Button } from "react-bootstrap";
import { Component } from "react"
class index extends Component{
    render(){
        return(
          <Col>
            <h5 className="text-center">Đăng Nhập</h5>
            <Form>
            <div class="acctitle"><i class="fa fa-refresh"></i> Quên mật khẩu</div>
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
              <Form.Group className="mb-3 " controlId="formBasicPassword">
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
                <a
                  href="#"
                  style={{ color: "#666", borderBottom: "1px solid #ccc" }}
                >
                  Huỷ
                </a>
              </Form.Group>
            </Form>
          </Col>
        );
    }
}

export default index;

