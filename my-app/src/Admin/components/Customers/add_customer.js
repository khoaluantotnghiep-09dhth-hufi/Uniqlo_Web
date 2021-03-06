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
      txtGender: 0,
      ImgPrivew: "",
      txtPassword: "",
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
        txtGender: customer.gender !== null ? customer.gender : 0
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
    let check = ['txtName', 'txtAddress', 'txtGender'];
    let isValid = true;
    if (!this.state[check[0]]) {
      isValid = false;
      toast.error("Vui l??ng nh???p t??n kh??ch h??ng");
    }
    if (!this.state[check[1]]) {
      isValid = false;
      toast.error("Vui l??ng nh???p ?????a ch???");
    }
    // if (!this.state[check[2]]) {
    //   isValid = false;
    //   toast.error("Vui l??ng ch???n gi???i t??nh");
      
    // }
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
      txtGender,
      txtPassword
    } = this.state;

    var customer = {
      id: uniqid("customer-"),
      name: txtName,
      address: txtAddress,
      phone: txtPhone,
      image: txtImage,
      email: txtEmail,
      gender: txtGender,
      password: txtPassword,
    };
    var customerUpdate = {
      id: match.params.id_customer,
      name: txtName,
      address: txtAddress,
      phone: txtPhone,
      image: txtImage,
      email: txtEmail,
      gender: txtGender,
      password: txtPassword,
    };
    if(txtGender === null) {
      this.setState({
        txtGender: 2
      })
    }
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
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />Tr??? v???
          </Button>
        </Link>

        <Form onSubmit={this.onSubmitForm}>
          <Row sm="12">
            <Col sm="4">
              <Form.Group className="mb-3" >
                <Form.Label>T??n Kh??ch H??ng</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nh???p t??n..."
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
                <Form.Label>S??T</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nh???p s??? ??i???n tho???i..."
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
                <Form.Label>?????a Ch???</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nh???p ?????a ch???..."
                  name="txtAddress"
                  id="txtAddress"
                  value={txtAddress}
                  onChange={(e) => { this.onChange(e, 'txtAddress') }} />
              </Form.Group>
            </Col>
            <Col sm="4">
              <Form.Group className="mb-3">
                <Form.Label>Gi???i T??nh</Form.Label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  name="txtGender"
                  value={txtGender}
                  onChange={(e) => { this.onChange(e, 'txtGender') }}
                  required
                >
                  <option value="0">Nam</option>
                  <option value="1">N???</option>
                  <option value="2">Kh??c</option>
                </select>
              </Form.Group>
            </Col>
          </Row>
          <Row sm="12" className="d-flex justify-content-center">
            <Col sm="4">
              <Form.Group >
                <Form.Label className="border border-dark" style={{ backgroundColor: "#ffe6e6", padding: "10px", marginTop: "100px", cursor: "pointer" }} htmlFor="txtImage"><FontAwesomeIcon icon={faUpload} className="mr-2 fa-3x" />T???i ???nh</Form.Label>
                <Form.Control
                  type="file"
                  id="txtImage"
                  name="txtImage"
                  hidden
                  onChange={(e) => { this.onChangeImage(e) }}

                />
              </Form.Group>
            </Col>
            <Col sm="8">
              <div style={{ backgroundImage: `url(${ImgPrivew})`, height: "200px", width: "300px", align: "center", background: "center center no-repeat", backgroundSize: "contain", cursor: "pointer", margin: "30px" }}
                onClick={() => this.openPreviewIMG()}
              ></div>
            </Col>
          </Row>


          <Row sm="12">
            <Col sm="8">
              <Form.Group className="mb-3">
                <Form.Label>M???t Kh???u</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="M???t kh???u..."
                  name="txtPassword"
                  id="txtPassword"

                  onChange={(e) => { this.onChange(e, 'txtPassword') }} />
              </Form.Group>
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
                  size="lg" />L??u
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