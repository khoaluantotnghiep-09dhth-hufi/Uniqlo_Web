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
import * as actions from "./../../../actions/customerAction";
class AddCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.setState({
      idItem: "",
      name: "",
      address: "",
      phone: "",
      image: "",
      password: "",
      email: "",
    });
  }
  componentDidMount() {
    var { match } = this.props;

    this.props.onEditItemCustomer(match.params.idItem);
  }
  componentWillReceiveProps(NextProps) {
    var { match } = this.props;
    if (NextProps && NextProps.customer) {
      var { customer } = NextProps;
      if (match.params.idItem) {
        const result = customer.find(
          (o) => o.id === match.params.idItem
        );

        this.setState({
          idItem: result.id,
          name: result.name,
          address: result.address,
          phone: result.phone,
          image: result.image,
          password: result.password,
          email: result.email,
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
    var { idItem, name, address, phone, image, password, email } = this.state;

    var customer = {
      id: uniqid("customer-"),
      name: name,
      address: address,
      phone: phone,
      image: image,
      password: password,
      email: email,
    };
    var customerUpdate = {
      id: idItem,
      name: name,
      address: address,
      phone: phone,
      image: image,
      password: password,
      email: email,
    };

    if (idItem) {
      this.props.onUpdateItemCustomer(customerUpdate);
      alert('Sửa thành công');
      history.goBack();
    } else {
      this.props.onAddItemCustomer(customer);
      alert('Thêm thành công');
      history.goBack();
    }
  };
  render() {

    return (
      <Container fluid>
        <Row>
          <Link to="/admin/manage/customers">
            <Button type="button" className="btn btn-primary" size="sm">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg"/>Trở về
            </Button>
          </Link>
          <Col sm="12">
            <Form action="" method="post" onSubmit={this.onSubmitForm}>
              <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Label>Tên Khách Hàng</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nhập tên..."
                  name="name"

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
                  name="address"
                  onChange={this.onChange} />

              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Label>SĐT</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nhập số điện thoại..."
                  name="phone"
                  onChange={this.onChange} />

              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Label>Ảnh</Form.Label>
                <Form.Control
                  required
                  type="file"
                
                  name="image"
                  onChange={this.onChange} />

              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Mật khẩu..."
                  name="password"
                  onChange={this.onChange} />

              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Label>Gmail</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Gmail..."
                  name="email"
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
    news: state.news,
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
      dispatch(actions.onUpdateCustomerResquest(customer));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer)