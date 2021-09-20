import React from "react";
import uniqid from "uniqid";

import {
  CForm,
  CLabel,
  CContainer,
  CInput,
  CCol,
  CRow,
  CFormGroup,
  CButton,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as actions from "./../../../actions/index";
import { connect } from "react-redux";
import {
  faPlus,faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

class addStaff extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      idItem: "",
      txtNameStaff: "",
      txtEmail: "",
      txtPhone: "",
      txtAddress: "",
      txtPassword: "",
      txtChucVu: "",
    };
  }
  componentDidMount() {
    var { match } = this.props;

    this.props.onEditItemStaff(match.params.id_staff);
  }
  componentWillReceiveProps(NextProps) {
    var { match } = this.props;
    if (NextProps && NextProps.staff) {
      var { staff } = NextProps;
      if (match.params.id_staff) {
        const result = staff.find((o) => o.id === match.params.id_staff);
console.log(result);
        this.setState({
          idItem: result.id,
          txtNameStaff: result.name,
          txtEmail: result.email,
          txtPhone: result.phone,
          txtAddress: result.address,
          txtPassword: result.password,
          txtChucVu: result.postion,
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
    var {
      idItem,
      txtNameStaff,
      txtEmail,
      txtPhone,
      txtAddress,
      txtPassword,
      txtChucVu,
    } = this.state;
   
    var staff = {
      id: uniqid("staff-"),
      nameStaff: txtNameStaff,
      email: txtEmail,
      phone: txtPhone,
      address: txtAddress,
      password: txtPassword,
      position: txtChucVu,
    };
    
    var staffUpdate = {
      id: match.params.id_staff,
      nameStaff: txtNameStaff,
      email: txtEmail,
      phone: txtPhone,
      address: txtAddress,
      password: txtPassword,
      position: txtChucVu,
    };
    if (idItem) {
      this.props.onUpdateItemStaff(staffUpdate);
      history.goBack();
    } else {
      this.props.onAddItemStaff(staff);
      history.goBack();
    }
  };
  render() {
    return (
      <CContainer fluid>
        <CRow>
          <Link to="/admin/manage/staffs">
            <Button type="button" className="btn btn-primary" size="sm">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg"/>Trở về
            </Button>
          </Link>
          <CCol sm="12">
            <CForm  onSubmit={this.onSubmitForm}>
              <CFormGroup>
                <CLabel htmlFor="exampleFormControlInput1">
                  Tên Nhân Viên
                </CLabel>
                <CInput
                  type="text"
                  id="txtNameStaff"
                  name="txtNameStaff"
                  placeholder="Tên nhân viên..."
                  autoComplete="name"
                  onChange={this.onChange}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="exampleFormControlInput1">Email</CLabel>
                <CInput
                  type="text"
                  id="txtEmail"
                  name="txtEmail"
                  placeholder="Email..."
                  autoComplete="email"
                  onChange={this.onChange}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="exampleFormControlTextarea1">
                  Số Điện Thoại
                </CLabel>
                <CInput
                  type="text"
                  id="txtPhone"
                  name="txtPhone"
                  placeholder="Số điện thoại..."
                  autoComplete="phone"
                  onChange={this.onChange}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="exampleFormControlTextarea1">Địa Chỉ</CLabel>
                <CInput
                  type="text"
                  id="txtAddress"
                  name="txtAddress"
                  placeholder="Địa chỉ..."
                  autoComplete="address"
                  onChange={this.onChange}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="exampleFormControlTextarea1">Mật Khẩu</CLabel>
                <CInput
                  type="password"
                  id="txtPassword"
                  name="txtPassword"
                  placeholder="Mật khẩu..."
                  autoComplete="password"
                  onChange={this.onChange}
                />
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="exampleFormControlTextarea1">Chức Vụ</CLabel>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  name="txtChucVu"
                  onChange={this.onChange}
                  //   value={this.state.txtChucVu}
                >
                  <option selected>Chọn Chức Vụ</option>
                  <option value="1">Nhân Viên</option>
                  <option value="2">Quản Lý</option>
                </select>
              </CFormGroup>

              <CFormGroup>
                <CButton color="danger" className="m-2" type="submit">
                  {" "}
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
    staff: state.staff,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onAddItemStaff: (staff) => {
      dispatch(actions.onAddStaffsResquest(staff));
    },
    onEditItemStaff: (id) => {
      dispatch(actions.onEditStaffsResquest(id));
    },
    onUpdateItemStaff: (staff) => {
      dispatch(actions.onUpdateStaffsResquest(staff));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(addStaff);
