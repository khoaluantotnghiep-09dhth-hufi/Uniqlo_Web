import React from 'react';
import uniqid from "uniqid";
import { connect } from "react-redux";
import * as actions from "./../../../actions/index";

import {
  CForm,
  CLabel,
  CContainer,
  CInput,
  CCol,
  CRow,
  CFormGroup,
  CButton,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
class addColor extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      idItem: "",
      txtName: "",

    };
  }
  componentDidMount() {
    var { match } = this.props;
    this.props.onEditItemColor(match.params.id_color);
    var { color } = this.props;
    if (match.params.id_color) {
      const result = color.find((o) => o.id === match.params.id_color);
      this.setState({
        txtName: result.name,
      });
    }
  }
  componentWillReceiveProps(NextProps) {
    var { match } = this.props;
    if (NextProps && NextProps.color) {
      var { color } = NextProps;
      if (match.params.id_color) {
        const result = color.find(
          (o) => o.id === match.params.id_color
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

    var color = {
      id: uniqid("color-"),
      name: txtName,

    };
    var colorUpdate = {
      id: match.params.id_color,
      name: txtName,
    };
    console.log(color);
    if (idItem) {
      this.props.onUpdateItemColor(colorUpdate);
      history.goBack();
    } else {
      this.props.onAddItemColor(color);
      history.goBack();
    }
  };
  render() {
    let {txtName} = this.state;
    return (
      <CContainer fluid>
        <CRow>
          <Link to="/admin/manage/color">
            <CButton type="button" className="btn btn-primary" size="sm">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg"/>Trở về
            </CButton>
          </Link>
          <CCol sm="12">
            <CForm action="" method="post" onSubmit={this.onSubmitForm}>
              <CFormGroup>
                <CLabel htmlFor="exampleFormControlInput1">Tên Màu</CLabel>
                <CInput
                  type="text"
                  id="txtName"
                  name="txtName"
                  placeholder="Tên màu..."
                  autoComplete="name"
                  onChange={this.onChange}
                  required
                  value={txtName}
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
    color: state.color,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onAddItemColor: (color) => {
      dispatch(actions.onAddColorResquest(color));
    },
    onEditItemColor: (id) => {
      dispatch(actions.onEditColorResquest(id));
    },
    onUpdateItemColor: (color) => {
      dispatch(actions.onUpdateColorResquest(color));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(addColor)