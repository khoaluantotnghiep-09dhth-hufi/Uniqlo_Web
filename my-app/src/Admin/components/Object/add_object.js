import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import uniqid from "uniqid";
import {
  CCol,
  CRow,
  CButton,
  CContainer,
  CForm,
  CLabel,
  CFormGroup,
  CInput,
} from "@coreui/react";
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

    this.props.onEditItemObject(match.params.id_object);
  }
  componentWillReceiveProps(NextProps) {
    var { match } = this.props;
    if (NextProps && NextProps.object_menu) {
      var { object_menu } = NextProps;

      if (match.params.id_object_menu) {
        const result = object_menu.find((o) => o.id === match.params.id_object);
        console.log(result);
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
    var { idItem, txtName } = this.state;

    var object_menu = {
      id: uniqid("object-"),
      nameObject: txtName,
    };
    var objectUpdate = {
      idItem: match.params.id_object,
      nameObject: txtName,
    };
    console.log(objectUpdate);
    console.log(idItem)
    if (match.params.id_object) {
      this.props.onUpdateItemObject(objectUpdate);
      alert("Sửa thành công");
      history.goBack();
    } else {
      this.props.onAddItemObject(object_menu);
      alert("Thêm thành công");
      history.goBack();
    }
  };
  render() {
    return (
      <CContainer fluid>
        <CRow>
          <Link to="/admin/manage/objects">
            <CButton type="button" className="btn btn-primary" size="sm">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />
              Trở về
            </CButton>
          </Link>
          <CCol sm="12">
            <CForm onSubmit={this.onSubmitForm}>
              <CFormGroup>
                <CLabel htmlFor="exampleFormControlInput1">
                  Tên Đối Tượng
                </CLabel>
                <CInput
                  type="text"
                  name="txtName"
                  placeholder="Tên đối tượng..."
                  autoComplete="name"
                  onChange={this.onChange}
                />
              </CFormGroup>

              <CFormGroup>
                <CButton type="submit" color="danger" className="m-2">
                  <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />
                  Lưu
                </CButton>
              </CFormGroup>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
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
