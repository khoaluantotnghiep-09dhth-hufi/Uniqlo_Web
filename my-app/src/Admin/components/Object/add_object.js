import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import uniqid from 'uniqid';
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CContainer,
  CForm,
  CLabel,
  CFormGroup,
  CInput,
} from '@coreui/react';
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

    this.props.onEditItemObject(match.params.id);
  }
  componentWillReceiveProps(NextProps) {
    var { match } = this.props;
    if (NextProps && NextProps.object) {
      var { object } = NextProps;
      if (match.params.id) {
        const result = object.find(
          (o) => o.id === match.params.id
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
      id: match.params.id,
      name: txtName,
    };

    if (idItem) {
      this.props.onUpdateItemObject(objectUpdate);
      history.goBack();
    } else {
      this.props.onAddItemObject(object);
      alert("Thêm thành công");
      history.goBack();
    }
  };
  render() {

    return (
      <CContainer fluid>
        <CRow>
          <Link to="/admin/manage/object">
            <Button type="button" className="btn btn-primary" size="sm">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg"/>Trở về
            </Button>
          </Link>
          <CCol sm="12">
            <CForm action="" method="post" onSubmit={this.onSubmitForm}>
              <CFormGroup>
                <CLabel htmlFor="exampleFormControlInput1">Tên Đối Tượng</CLabel>
                <CInput
                  type="text"
                  id="txtName"
                  name="txtName"
                  placeholder="Tên đối tượng..."
                  autoComplete="name"
                  onChange={this.onChange}
                />
              </CFormGroup>

              <CFormGroup >
                <CButton
                  type="submit"
                  color='danger'
                  className="m-2" >
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="mr-2"
                    size="lg" />
                  Lưu
                </CButton>

              </CFormGroup>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
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
    onAddItemObject: (object) => {
      dispatch(actions.onAddObjectResquest(object));
    },
    onEditItemObject: (id) => {
      dispatch(actions.onEditObjectResquest(id));
    },
    onUpdateItemObject: (object) => {
      dispatch(actions.onUpdateObjectResquest(object));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(addObject)