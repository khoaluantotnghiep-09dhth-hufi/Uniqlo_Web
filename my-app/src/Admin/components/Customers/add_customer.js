import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import CallAPI from '../../utils/Callapi';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import uniqid from 'uniqid';
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import * as actions from "./../../../actions/index";
class AddCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idItem: "",
      txtName: "",
      txtAddress: "",
      txtPhone: "",
      txtImage: "",
      txtPassword: "",
      txtEmail: "",
    };
  }
  componentDidMount() {
    var { match } = this.props;

    this.props.onEditItemCustomer(match.params.id_customer);
    var { customer } = this.props;
    if (match.params.id_customer) {
      const result = customer.find((o) => o.id === match.params.id_customer);
      this.setState({
        txtName: result.name,
        txtAddress: result.address,
        txtPhone: result.phone,
        txtImage: result.image,
        txtPassword: result.password,
        txtEmail: result.email,
      });
    }
  }
  componentWillReceiveProps(NextProps) {
    var { match } = this.props;
    if (NextProps && NextProps.customer) {
      var { customer } = NextProps;
      if (match.params.id_customer) {
        const result = customer.find((o) => o.id === match.params.id_customer);

        this.setState({
          idItem: result.id,
          txtName: result.name,
          txtAddress: result.address,
          txtPhone: result.phone,
          txtImage: result.image,
          txtPassword: result.password,
          txtEmail: result.email,
        });
      }
    }
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
    var { match } = this.props;

    event.preventDefault();
    var { history } = this.props;
    var {
      idItem,
      txtName,
      txtAddress,
      txtPhone,
      txtImage,
      txtPassword,
      txtEmail,
    } = this.state;

    var customer = {
      id: uniqid("customer-"),
      nameCustomer: txtName,
      address: txtAddress,
      phone: txtPhone,
      image: txtImage,
      password: txtPassword,
      email: txtEmail,
    };
    var customerUpdate = {
      idItem: match.params.id_customer,
      nameCustomer: txtName,
      address: txtAddress,
      phone: txtPhone,
      image: txtImage,
      password: txtPassword,
      email: txtEmail,
    };

    if (match.params.id_customer) {
      this.props.onUpdateItemCustomer(customerUpdate);
      history.goBack();
    } else {
      this.props.onAddItemCustomer(customer);
      history.goBack();
    }
  };
  render() {
    let { txtName, txtAddress, txtPhone, txtImage, txtPassword, txtEmail } = this.state;
    return (
      <Container fluid>
        <Row>
          <Link to="/admin/manage/customers">
            <Button type="button" className="btn btn-primary" size="sm">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />Trở về
            </Button>
          </Link>
          <Col sm="12">
            <Form onSubmit={this.onSubmitForm}>
              <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Label>Tên Khách Hàng</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nhập tên..."
                  name="txtName"
                  id="txtName"
                  value={txtName}
                  onChange={this.onChange} />
                <Form.Control.Feedback
                  type="invalid" >
                  Vui lòng nhập tên cần thêm !
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Label>Địa Chỉ</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nhập địa chỉ..."
                  name="txtAddress"
                  id="txtAddress"
                  value={txtAddress}
                  onChange={this.onChange} />

              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Label>SĐT</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nhập số điện thoại..."
                  name="txtPhone"
                  id="txtPhone"
                  value={txtPhone}
                  onChange={this.onChange} />

              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Label>Ảnh</Form.Label>
                <Form.Control
                  required
                  type="file"
                  id="txtImage"
                  value={txtImage}
                  name="txtImage"
                  onChange={this.onChange} />

              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Mật khẩu..."
                  name="txtPassword"
                  id="txtPassword"
                  value={txtPassword}
                  onChange={this.onChange} />

              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Label>Gmail</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Gmail..."
                  name="txtEmail"
                  id="txtEmail"
                  value={txtEmail}
                  onChange={this.onChange} />

              </Form.Group>
              {/* <Link to="/admin/manage/objects" > */}
              <Button type="button"
                className="btn btn-danger"
                onClick={this.onSubmitForm}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  className="mr-2"
                  size="lg" />Lưu
              </Button>
              {/* </Link> */}
            </Form>
          </Col>
        </Row>
      </Container>
    )
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
    onEditItemCustomer: (id) => {
      dispatch(actions.onEditCustomerResquest(id));
    },
    onUpdateItemCustomer: (customer) => {
      dispatch(actions.onUpdateCustomersResquest(customer));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer)