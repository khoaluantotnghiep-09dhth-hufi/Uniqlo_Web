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
class addObject extends React.Component {
  constructor(props) {
    super(props);
    this.setState({
      idItem: "",
      txtName: "",

    });
  }
  componentDidMount() {
    var { match } = this.props;

    this.props.onEditItemObject(match.params.id_object);
  }
  componentWillReceiveProps(NextProps) {
    var { match } = this.props;
    if (NextProps && NextProps.object) {
      var { object } = NextProps;
      if (match.params.id_object) {
        const result = object.find(
          (o) => o.id === match.params.id_object
        );

        this.setState({
          idItem: result.id,
          txtName: result.name,
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
    var { idItem, txtName } =
      this.state;

    var object = {
      id: uniqid("object-"),
      name: txtName,

    };
    var objectUpdate = {
      id: idItem,
      name: txtName,
    };

    if (idItem) {
      this.props.onUpdateItemObject(objectUpdate);
      alert('Sửa thành công');
      history.goBack();
    } else {
      this.props.onAddItemObject(object);
      alert('Thêm thành công');
      history.goBack();
    }
  };
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
            <Form  onSubmit={this.onSubmitForm}>
              <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Label>Tên Đối Tượng</Form.Label>
                <Form.Control
                
                  type="text"
                  placeholder="Nhập tên đối tượng cần thêm..."
                  name="txtName"
                  autoComplete="name"
                  id="txtName"
                  onChange={this.onChange} />
              </Form.Group>
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
    object: state.object,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onAddItemObject: (size) => {
      dispatch(actions.onAddObjectResquest(size));
    },
    onEditItemObject: (id) => {
      dispatch(actions.onEditObjectResquest(id));
    },
    onUpdateItemObject: (size) => {
      dispatch(actions.onUpdateObjectResquest(size));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(addObject)