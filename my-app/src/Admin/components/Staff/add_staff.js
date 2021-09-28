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
  faPlus, faArrowLeft, faUpload
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';

class addStaff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idItem: "",
      txtNameStaff: "",
      txtEmail: "",
      txtPhone: "",
      txtAddress: "",
      txtPassword: "",
      txtChucVu: "",
      ImgPrivew: "",
      isOpen: false,
    };
  }
  componentDidMount() {
    var { match } = this.props;

    this.props.onEditItemStaff(match.params.id_staff);
    var { staff } = this.props;
    if (match.params.id_staff) {
      const result = staff.find((o) => o.id === match.params.id_staff);
      this.setState({
        txtNameStaff: result.name,
        txtEmail: result.email,
        txtPhone: result.phone,
        txtAddress: result.address,
        txtPassword: result.password,
        txtChucVu: result.postion,
        txtImage: result.image,
        ImgPrivew: result.image,
      });
    }
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
          txtImage: result.image,
          ImgPrivew: result.image,
        });
      }
    }
  }
  onChange = (e, id) => {
    let coppyState = { ...this.state };
    coppyState[id] = e.target.value;
    this.setState({
      ...coppyState
    })
  }
  onChangeImage = (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let objectURL = URL.createObjectURL(file);
      this.setState({
        ImgPrivew: objectURL,
        txtImage: objectURL
      })

    }
  }
  openPreviewIMG = () => {
    this.setState({
      isOpen: true
    })
  }
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
      txtImage,
    } = this.state;

    var staff = {
      id: uniqid("staff-"),
      nameStaff: txtNameStaff,
      email: txtEmail,
      phone: txtPhone,
      address: txtAddress,
      password: txtPassword,
      position: txtChucVu,
      image: txtImage,
    };
    console.log(staff);
    var staffUpdate = {
      id: match.params.id_staff,
      nameStaff: txtNameStaff,
      email: txtEmail,
      phone: txtPhone,
      address: txtAddress,
      password: txtPassword,
      position: txtChucVu,
      image: txtImage,
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
    let { txtNameStaff, txtEmail, txtPhone, txtAddress, txtPassword, txtChucVu, txtImage, ImgPrivew } = this.state;
    return (
      <CContainer fluid>
        <CRow>
          <Link to="/admin/manage/staffs">
            <Button type="button" className="btn btn-primary" size="sm">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />Trở về
            </Button>
          </Link>
          <CCol sm="12">
            <CForm onSubmit={this.onSubmitForm}>
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
                  onChange={(e) => { this.onChange(e, 'txtNameStaff') }}
                  value={txtNameStaff}
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
                  onChange={(e) => { this.onChange(e, 'txtEmail') }}
                  value={txtEmail}
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
                  onChange={(e) => { this.onChange(e, 'txtPhone') }}
                  value={txtPhone}
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
                  onChange={(e) => { this.onChange(e, 'txtAddress') }}
                  value={txtAddress}
                />
              </CFormGroup>
              <Form.Group >
                <Form.Label className="border border-dark" style={{ backgroundColor: "#ffe6e6", padding: "10px", marginTop: "100px", cursor: "pointer" }} htmlFor="txtImage"><FontAwesomeIcon icon={faUpload} className="mr-2 fa-3x" />Tải Ảnh</Form.Label>
                <Form.Control
                  type="file"
                  id="txtImage"
                  name="txtImage"
                  hidden
                  onChange={(e) => { this.onChangeImage(e) }}
                  required
                />
              </Form.Group>
              <div style={{ backgroundImage: `url(${ImgPrivew})`, height: "200px", width: "300px", align: "center", background: "center center no-repeat", backgroundSize: "contain", cursor: "pointer", margin: "30px" }}
                onClick={() => this.openPreviewIMG()}
              ></div>

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
