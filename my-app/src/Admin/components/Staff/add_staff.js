import React, { useState } from "react";
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
import Call_API from "./../../utils/Callapi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as actions from "./../../../actions/index";
import { connect } from "react-redux";
import {
  faPlus, faArrowLeft, faUpload
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ConvertIMG from '../../utils/getBase64';
import Lightbox from 'react-image-lightbox';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import 'react-image-lightbox/style.css';
import { toast } from 'react-toastify';

function FormExample() {
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
}
class addStaff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idItem: "",
      txtNameStaff: "",
      txtEmail: "",
      txtPhone: "",
      txtAddress: "",
      txtImage: "",
      ImgPrivew: "",
      isOpen: false,
    };
  }
  componentDidMount() {
    var { match } = this.props;


 
    

    Call_API(`staffs/${match.params.id_staff}`, "GET", null)
      .then((response) => {
        var data = response.data[0];
        this.setState({
          txtNameStaff: data.name,
          txtEmail: data.email,
          txtPhone: data.phone,
          txtAddress: data.address,
          txtImage: data.image,
          ImgPrivew: data.image,
        });
      })
      .catch((error) => console.log(error));
  }
  // componentWillReceiveProps(NextProps) {
  //   var { match } = this.props;
  //   if (NextProps && NextProps.staff) {
  //     var { staff } = NextProps;
  //     if (match.params.id_staff) {
  //       const result = staff.find((o) => o.id === match.params.id_staff);
  //       this.setState({
  //         txtNameStaff: result.name,
  //         txtEmail: result.email,
  //         txtPhone: result.phone,
  //         txtAddress: result.address,
  //         txtImage: result.image,
  //         ImgPrivew: result.image,
  //       });
  //     }
  //   }
  // }
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
      ConvertIMG.getBase64(file).then(res => {
        let objectURL = URL.createObjectURL(file);

        this.setState({
          ImgPrivew: objectURL,
          txtImage: res
        })
      });

    }
  }
  openPreviewIMG = () => {
    this.setState({
      isOpen: true
    })
  }
  checkValidate = () => {
    let check = ['txtNameStaff', 'txtEmail', 'txtPhone', 'txtImage', 'txtAddress'];
    let isValid = true;
    if (!this.state[check[3]]) {
      isValid = false;
      toast.error("Vui lòng tải ảnh nhân viên !");
    }
    return isValid;
  }
  onSubmitForm = (event) => {
 
    let isValid = this.checkValidate();
    if (isValid === false) return;
    var { match } = this.props;
    event.preventDefault();
    var { history } = this.props;
    var {
      txtNameStaff,
      txtEmail,
      txtPhone,
      txtAddress,
      txtImage,
    } = this.state;

    var staff = {
      id: uniqid("staff-"),
      name: txtNameStaff,
      email: txtEmail,
      phone: txtPhone,
      address: txtAddress,
      image: txtImage,
    };
    var staffUpdate = {
      id: match.params.id_staff,
      name: txtNameStaff,
      email: txtEmail,
      phone: txtPhone,
      address: txtAddress,
      image: txtImage,
    };

    if (match.params.id_staff) {
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
      <Container fluid>
        <Link to="/admin/manage/staffs">
          <Button type="button" className="btn btn-primary" size="sm">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />Trở về
          </Button>
        </Link>
        <Row>
          <Col sm="12">
            <Form onSubmit={this.onSubmitForm}>
              <Form.Group>
                <Form.Label htmlFor="txtNameStaff">
                  Tên Nhân Viên
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  autofocus
                  id="txtNameStaff"
                  name="txtNameStaff"
                  placeholder="Tên nhân viên..."
                  autoComplete="name"
                  onChange={(e) => { this.onChange(e, 'txtNameStaff') }}
                  value={txtNameStaff}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="txtEmail">Email</Form.Label>
                <Form.Control
                  type="text"
                  id="txtEmail"
                  name="txtEmail"
                  placeholder="Email..."
                  autoComplete="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  required
                  autofocus
                  onChange={(e) => { this.onChange(e, 'txtEmail') }}
                  value={txtEmail}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="txtPhone">
                  Số Điện Thoại
                </Form.Label>
                <Form.Control
                  type="text"
                  id="txtPhone"
                  name="txtPhone"
                  placeholder="Số điện thoại..."
                  autoComplete="phone"
                  onChange={(e) => { this.onChange(e, 'txtPhone') }}
                  value={txtPhone}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="txtAddress">Địa Chỉ</Form.Label>
                <Form.Control
                  type="text"
                  id="txtAddress"
                  name="txtAddress"
                  placeholder="Địa chỉ..."
                  autoComplete="address"
                  onChange={(e) => { this.onChange(e, 'txtAddress') }}
                  value={txtAddress}
                  required
                />
              </Form.Group>
              <Form.Group >
                <Form.Label className="border border-dark" style={{ backgroundColor: "#ffe6e6", padding: "10px", marginTop: "100px", cursor: "pointer" }} htmlFor="txtImage"><FontAwesomeIcon icon={faUpload} className="mr-2 fa-3x" />Tải Ảnh</Form.Label>
                <Form.Control
                  type="file"
                  id="txtImage"
                  name="txtImage"
                  hidden
                  onChange={(e) => { this.onChangeImage(e) }}
                
                />
              </Form.Group>
              <div style={{ backgroundImage: `url(${ImgPrivew})`, height: "200px", width: "300px", align: "center", background: "center center no-repeat", backgroundSize: "contain", cursor: "pointer", margin: "30px" }}
                onClick={() => this.openPreviewIMG()}
                required
              ></div>
              <Form.Group>
                <Button color="danger" className="m-2" type="submit"
                // onClick={this.onSubmitForm}
                >
                  {" "}
                  <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />
                  Lưu
                </Button>
              </Form.Group>
            </Form>
          </Col>
          {
            this.state.isOpen === true &&
            <Lightbox
              mainSrc={this.state.ImgPrivew}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          }
        </Row>
      </Container>
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
