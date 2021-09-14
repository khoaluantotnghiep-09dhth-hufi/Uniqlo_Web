import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import CallAPI from '../../utils/Callapi';
import { Link } from "react-router-dom";
import uniqid from 'uniqid';
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
export default class addObject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      txtName: ''
    }
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  }
  onAdd = (e) => {
    e.preventDefault();
    var { id, txtName } = this.state;
    if (id) {
      CallAPI(`/objects/${id}`, 'PUT', {
        name: txtName,
      }).then(res => {
        alert('Sửa thành công !');
      });
    }
    else {
      CallAPI('/objects', 'POST', {
        id: uniqid('object-'),
        name: txtName,
      }).then(res => {
        alert('Thêm thành công !');
      });
    }
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Link to="/admin/manage/objects">
            <Button type="button" className="btn btn-primary" size="sm">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />Trở về
            </Button>
          </Link>
          <Col sm="12">
            <Form onSubmit={this.onAdd}>
              <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Label>Tên Đối Tượng</Form.Label>
                <Form.Control required type="text" 
                placeholder="Nhập tên đối tượng cần thêm..." 
                name="txtName" onChange={this.onChange} />
                <Form.Control.Feedback type="invalid" >
                  Vui lòng nhập tên cần thêm !
                </Form.Control.Feedback>
              </Form.Group>
              <Link to="/admin/manage/objects">
                <Button type="button" className="btn btn-danger" onClick={this.onAdd}>
                  <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />Thêm
                </Button>
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }

}