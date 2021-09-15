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
      id:'',
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
  componentDidMount() {
    var { match } = this.props;
    if (match) {
      var id = match.params.id;
      CallAPI(`objects/${id}`, 'GET', null).then(res => {
        var data = res.data;
        this.setState({
          name: data.name,
         
        });
        console.log(data.name);
      });
    }


  }
  onAdd = (e) => {
    e.preventDefault();
    var { id, txtName } = this.state;
    var { history } = this.props;
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
        history.goBack();
      });
    }
  }

  render() {
    var { txtName } = this.state;
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
                <Form.Control
                  required
                  type="text"
                  placeholder="Nhập tên đối tượng cần thêm..."
                  name="txtName"
                  value={this.txtName}
                  onChange={this.onChange} />
                <Form.Control.Feedback
                  type="invalid" >
                  Vui lòng nhập tên cần thêm !
                </Form.Control.Feedback>
              </Form.Group>
              <Link to="/admin/manage/objects" onClick={this.onAdd}>
                <Button type="button"
                  className="btn btn-danger"
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="mr-2"
                    size="lg" />Lưu
                </Button>
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }

}