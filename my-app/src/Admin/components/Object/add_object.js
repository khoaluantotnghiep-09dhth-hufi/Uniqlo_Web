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
    if (NextProps && NextProps.objects) {
      var { objects } = NextProps;
      if (match.params.id_object) {
        const result = objects.find(
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

    var objects = {
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
      this.props.onAddItemObject(objects);
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
    object2: state.object2,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onAddItemObject: (object2) => {
      dispatch(actions.onAddObjectResquest(object2));
    },
    onEditItemObject: (id) => {
      dispatch(actions.onEditObjectResquest(id));
    },
    onUpdateItemObject: (object2) => {
      dispatch(actions.onUpdateObjectResquest(object2));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(addObject)