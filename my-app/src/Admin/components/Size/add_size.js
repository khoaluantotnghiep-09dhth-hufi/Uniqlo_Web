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
  faPlus, faArrowLeft

} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
class addColor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idItem: "",
      txtName: "",

    };
  }
  componentDidMount() {
    var { match } = this.props;

    this.props.onEditItemSize(match.params.id_size);
    var { size } = this.props;
    if (match.params.id_size) {
      const result = size.find((o) => o.id === match.params.id_size);
      this.setState({
        txtName: result.name,
      });
    }
  }
  componentWillReceiveProps(NextProps) {
    var { match } = this.props;
    if (NextProps && NextProps.size) {
      var { size } = NextProps;
      if (match.params.id_size) {
        const result = size.find(
          (o) => o.id === match.params.id_size
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

    var size = {
      id: uniqid("size-"),
      nameSize: txtName,

    };
    var sizeUpdate = {
      id: match.params.id_size,
      nameSize: txtName,
    };

    if (idItem) {
      this.props.onUpdateItemSize(sizeUpdate);
      history.goBack();
    } else {
      this.props.onAddItemSize(size);
      history.goBack();
    }
  };
  render() {
    let { txtName } = this.state;
    return (

      <CContainer fluid>
        <CRow>
          <Link to="/admin/manage/size">
            <Button type="button" className="btn btn-primary" size="sm">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />Trở về
            </Button>
          </Link>
          <CCol sm="12">
            <CForm action="" method="post" onSubmit={this.onSubmitForm}>
              <CFormGroup>
                <CLabel htmlFor="exampleFormControlInput1">Tên Kích Cỡ</CLabel>
                <CInput
                  type="text"
                  id="txtName"
                  name="txtName"
                  placeholder="Tên kích cỡ..."
                  autoComplete="name"
                  onChange={this.onChange}
                  required
                  value={txtName}
                />
              </CFormGroup>

              <CFormGroup >
                <CButton type="submit" color='danger' className="m-2" >  <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" /> Thêm</CButton>

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
    size: state.size,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onAddItemSize: (size) => {
      dispatch(actions.onAddSizeResquest(size));
    },
    onEditItemSize: (id) => {
      dispatch(actions.onEditSizeResquest(id));
    },
    onUpdateItemSize: (size) => {
      dispatch(actions.onUpdateSizeResquest(size));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(addColor)