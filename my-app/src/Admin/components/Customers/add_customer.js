import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faArrowLeft,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import CallAPI from '../../utils/Callapi';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import uniqid from 'uniqid';
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import * as actions from "./../../../actions/index";
import ConvertIMG from '../../utils/getBase64';
import Lightbox from 'react-image-lightbox';
import { toast } from 'react-toastify';
import 'react-image-lightbox/style.css';
class AddCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idItem: "",
      txtName: "",
      txtAddress: "",
      txtPhone: "",
      txtImage: "",
      txtEmail: "",
      txtGender: "",
      ImgPrivew: "",
      isOpen: false,
    };
  }
  componentDidMount() {
    var { match } = this.props;

    this.props.onEditItemCustomer(match.params.id_customer);
    var { customer } = this.props;
    if (match.params.id_customer) {
  
      this.setState({
        txtName: customer.name,
        txtAddress: customer.address,
        txtPhone: customer.phone,
        txtImage: customer.image,
        ImgPrivew: customer.image,
        txtEmail: customer.email,
        txtGender: customer.gender
      });
    }
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
  componentWillReceiveProps(NextProps) {
    var { match } = this.props;
    if (NextProps && NextProps.customer) {
      var { customer } = NextProps;
      if (match.params.id_customer) {
        const result = customer.find((o) => o.id === match.params.id_customer);
        this.setState({
          txtName: result.name,
          txtAddress: result.address,
          txtPhone: result.phone,
          txtImage: result.image,
          ImgPrivew: result.image,
          txtEmail: result.email,
          txtGender: result.gender
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
  openPreviewIMG = () => {
    this.setState({
      isOpen: true
    })
  }
  checkValidate = () => {
    let check = ['txtName', 'txtAddress','txtGender'];
    let isValid = true;
    if (!this.state[check[0]]) {
        isValid = false;
        toast.error("Vui lòng nhập tên khách hàng");
    }
    if (!this.state[check[1]]) {
        isValid = false;
        toast.error("Vui lòng nhập địa chỉ");
    }
    if (!this.state[check[2]]) {
        isValid = false;
        toast.error("Vui lòng chọn giới tính");
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
      idItem,
      txtName,
      txtAddress,
      txtPhone,
      txtImage,
      txtEmail,
      txtGender
    } = this.state;

    var customer = {
      id: uniqid("customer-"),
      name: txtName,
      address: txtAddress,
      phone: txtPhone,
      image: txtImage,
      email: txtEmail,
      gender: txtGender,
    };
    var customerUpdate = {
      idItem: match.params.id_customer,
      name: txtName,
      address: txtAddress,
      phone: txtPhone,
      image: txtImage,
      email: txtEmail,
      gender: txtGender
    };

    if (match.params.id_customer) {
      this.props.onUpdateItemCustomer(customerUpdate);
      history.goBack();
    } else {
      this.props.onAddItemCustomer(customer);
      history.goBack();
    }
  };
  render() {
    let { txtName, txtAddress, txtPhone, txtImage, txtPassword, txtEmail, ImgPrivew, txtGender } = this.state;
    return (
      <Container fluid>
        <Link to="/admin/manage/customers">
          <Button type="button" className="btn btn-primary" size="sm">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />Trở về
          </Button>
        </Link>

        <Form onSubmit={this.onSubmitForm}>
          <Row sm="12">
            <Col sm="4">
              <Form.Group className="mb-3" >
                <Form.Label>Tên Khách Hàng</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nhập tên..."
                  name="txtName"
                  id="txtName"
                  value={txtName}
                  onChange={(e) => { this.onChange(e, 'txtName') }} />
              </Form.Group>
            </Col>
            <Col sm="4">
              <Form.Group className="mb-3" >
                <Form.Label>Gmail</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Gmail..."
                  name="txtEmail"
                  id="txtEmail"
                  value={txtEmail}
                  onChange={(e) => { this.onChange(e, 'txtEmail') }} />
              </Form.Group>
            </Col>
            <Col sm="4">
              <Form.Group className="mb-3">
                <Form.Label>SĐT</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nhập số điện thoại..."
                  name="txtPhone"
                  id="txtPhone"
                  value={txtPhone}
                  onChange={(e) => { this.onChange(e, 'txtPhone') }} />
              </Form.Group>
            </Col>
          </Row>
          <Row sm="12">
            <Col sm="8">
              <Form.Group className="mb-3">
                <Form.Label>Địa Chỉ</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nhập địa chỉ..."
                  name="txtAddress"
                  id="txtAddress"
                  value={txtAddress}
                  onChange={(e) => { this.onChange(e, 'txtAddress') }} />
              </Form.Group>
            </Col>
            <Col sm="4">
              <Form.Group className="mb-3">
                <Form.Label>Giới Tính</Form.Label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  name="txtGender"
                  value={txtGender}
                  onChange={(e) => { this.onChange(e, 'txtGender') }}
                  required
                >
                  <option selected value="2">Khác</option>
                  <option value="0">Nam</option>
                  <option value="1">Nữ</option>
                </select>
              </Form.Group>
            </Col>
          </Row>
          <Row sm="12" className="d-flex justify-content-center">
            <Col sm="4">
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
            </Col>
            <Col sm="8">
              <div style={{ backgroundImage: `url(${ImgPrivew})`, height: "200px", width: "300px", align: "center", background: "center center no-repeat", backgroundSize: "contain", cursor: "pointer", margin: "30px" }}
                onClick={() => this.openPreviewIMG()}
              ></div>
            </Col>
          </Row>
          <Row>
            <Form.Group className="d-flex justify-content-center">
              <Button type="button"
                className="btn btn-danger"
                onClick={this.onSubmitForm}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  className="mr-2"
                  size="lg" />Lưu
              </Button>
            </Form.Group>
          </Row>
        </Form>
        {
          this.state.isOpen === true &&
          <Lightbox
            mainSrc={this.state.ImgPrivew}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        }
      </Container>
    )
  }
}
var mapStateToProps = (state) => {
  return {
    customer: state.customer,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onAddItemCustomer: (customer) => {
      dispatch(actions.onAddCustomerResquest(customer));
    },
    onEditItemCustomer: (id) => {
      dispatch(actions.onEditCustomerResquest(id));
    },
    onUpdateItemCustomer: (customer) => {
      dispatch(actions.onUpdateCustomersResquest(customer));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer)