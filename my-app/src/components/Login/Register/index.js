import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Callapi from '../../../Admin/utils/Callapi';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import uniqid from 'uniqid';
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import * as actions from "./../../../actions/index";
class index extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      idItem: "",
      txtName:"",
      txtAddress:"",
      txtPhone:"",
      txtImage:"",
      txtPassword: "",
      txtEmail: "",
    };
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
  onSubmitForm = (event) => {
    event.preventDefault();
    var{
      txtName,
      txtAddress,
      txtPhone,
      txtImage,
      txtPassword,
      txtEmail,
    }= this.state;
    
    var customer = {
      id: uniqid("customer-"),
      nameCustomer: txtName,
      address: txtAddress,
      phone: txtPhone,
      image: txtImage,
      password: txtPassword,
      email: txtEmail,
    };
    this.props.onAddItemCustomer(customer);
  };
  render() {

    return(
      <Col>
        <h5 className="text-center">Đăng Ký</h5>
        <Form >
        <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Control
                  required autofocus
                  className="fas fa-user"          
                  type="text"
                  placeholder="&#xf007; Họ và tên..."
                  name ="txtName"
                  id="txtName"
                  onChange={this.onChange} />
          </Form.Group>         
          <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Control
                  required autofocus
                  className="fas fa-address-card" 
                  type="text"
                  placeholder="&#xf2bb; Địa chỉ..."
                  name="txtAddress"
                  id="txtAddress"
                  onChange={this.onChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Control
                  required autofocus
                  className="fas fa-phone-alt"
                  type="text"
                  placeholder="&#xf879; Số Điện Thoại"
                  name="txtPhone"
                  id="txtPhone"
                  maxlength="11" 
                  minlength="10" 
                  pattern="^[0-9]*$" 
                  onChange={this.onChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Control
                  required autofocus
                  className="fas fa-envelope"
                  type="email"
                  placeholder="&#xf0e0; Email"
                  name="txtEmail"
                  id="txtEmail"
                  onChange={this.onChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Control
                  required autofocus
                  className="fas fa-lock"
                  type="password"
                  placeholder="&#xf023; Mật Khẩu"
                  name="txtPassword"
                  id="txtPassword"
                  onChange={this.onChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Button
              variant="outline-secondary"
              type="submit"
              className="button--width"
              onClick={this.onSubmitForm}
            >
              Đăng Ký
            </Button>
          </Form.Group>
        </Form>
      </Col>
    );
  }
}
var mapStateToProps = (state) => {
  return {
    customer: state.customer,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onAddItemCustomer: (customer) => {
      dispatch(actions.onAddCustomerResquest(customer));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index)