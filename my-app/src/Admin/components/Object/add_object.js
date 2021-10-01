import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import uniqid from "uniqid";
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import * as actions from "../../../actions/index";
class addObject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idItem: "",
      txtName: "",
    };
  }
  componentDidMount() {
    var { match } = this.props;
    this.props.onEditItemObject(match.params.id_object_menu);
    var { object_menu } = this.props;
    if (match.params.id_object_menu) {
      const result = object_menu.find((o) => o.id === match.params.id_object_menu);
      console.log("resui", result);
      this.setState({
        txtName: result.name,
      });
    }
  }
  // componentWillReceiveProps(NextProps) {
  //   var { match } = this.props;
  //   if (NextProps && NextProps.object_menu) {
  //     var { object_menu } = NextProps;

  //     console.log("state nè", object_menu)
  //   }
  // }
  componentWillReceiveProps(NextProps) {
    var { match } = this.props;
    if (NextProps && NextProps.object_menu) {
      var { object_menu } = NextProps;
      if (match.params.id_object_menu) {
 
        this.setState({
          idItem: object_menu.id,
          txtName: object_menu.name,
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
    var { idItem, txtName } = this.state;

    var object_menu = {
      id: uniqid("object-"),
      name: txtName,
    };
    var objectUpdate = {
      idItem: match.params.id_object_menu,
      name: txtName,
    };
    if (match.params.id_object_menu) {
      this.props.onUpdateItemObject(objectUpdate);
      history.goBack();
    } else {
      this.props.onAddItemObject(object_menu);
      history.goBack();
    }
  };
  render() {
    return (
      <Container fluid>
        <Row>
          <Link to="/admin/manage/objects">
            <Button type="button" className="btn btn-primary" size="sm">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />
              Trở về
            </Button>
          </Link>
          <Col sm="12">
            <Form onSubmit={this.onSubmitForm}>
              <Form.Group>
                <Form.Label htmlFor="exampleFormControlInput1">
                  Tên Đối Tượng
                </Form.Label>
                <Form.Control
                  required 
                  type="text"
                  name="txtName"
                  placeholder="Tên đối tượng..."
                  autoComplete="name"
                  onChange={this.onChange}
                  value={this.state.txtName}
                />
              </Form.Group>
              <Form.Group>
                <Button type="submit" className="m-2 btn btn-danger">
                  <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />
                  Lưu
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
var mapStateToProps = (state) => {
  return {
    object_menu: state.object_menu,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onAddItemObject: (object_menu) => {
      return dispatch(actions.onAddObjectsResquest(object_menu));
    },
    onEditItemObject: (id) => {
      return dispatch(actions.onEditObjectsResquest(id));
    },
    onUpdateItemObject: (object_menu) => {
      return dispatch(actions.onUpdateObjectsResquest(object_menu));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(addObject);
