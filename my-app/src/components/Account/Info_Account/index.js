import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Image } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Call_API from "./../../../Admin/utils/Callapi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConvertIMG from "../../../Admin/utils/getBase64";
import * as actions from "./../../../actions/index";
import { connect } from "react-redux";
import {
  faPlus,
  faUpload,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
var sessionUser = JSON.parse(sessionStorage.getItem("client"));
class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClickEdit: false,
      id: "",
      name: "",
      address: "",
      phone: "",
      image: "",
      email: "",
      gender: "",
      //cmnn_cccc: sessionUser.cmnn_cccc,
      password: "",
      score: "",
      ImgPrivew: "",
      isOpen: false,
      redirect: false,
      errorPhone: "",
    };
  }
  async componentDidMount() {
    var sessionUser = JSON.parse(sessionStorage.getItem("client"));

    Call_API(`customers/${sessionUser.id_user}`, "GET", null).then(
      (response) => {
        var data = response.data[0];
        console.log(data);
        this.setState({
          id: data.id,
          name: data.name,
          address: data.address,
          phone: data.phone,
          image: data.image,
          email: data.email,
          gender: data.gender,
          password: data.password,
          score: data.score,
        });
      }
    );
  }
  onHandleSubmitLogin = (e) => {
    e.preventDefault();
    var { history } = this.props;
    var {
      name,
      address,
      phone,
      image,
      email,
      gender,
      cmnn_cccc,
      score,
      password,
      ImgPrivew,
      id,
    } = this.state;
    var profile = {
      id: id,
      name: name,
      address: address,
      phone: phone,
      image: image,
      email: email,
      gender: gender,
      password: password,
      //cmnn_cccc: cmnn_cccc,
      //score: score,
    };
    this.props.onUpdateItemCustomer(profile);
    
    sessionStorage.removeItem("client");
    this.setState({
      redirect: true,
    });
  };
  onChangeImage = (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      ConvertIMG.getBase64(file).then((res) => {
        let objectURL = URL.createObjectURL(file);

        this.setState({
          ImgPrivew: objectURL,
          image: res,
        });
      });
    }
  };
  // onChange = (e, id) => {
  //   let coppyState = { ...this.state };
  //   coppyState[id] = e.target.value;
  //   this.setState(
  //     {
  //       ...coppyState,
  //     },
  //     () => {}
  //   );
  // };
  onField = () => {
    this.refs.fieldName.value = "";
    this.refs.fieldAddress.value = "";
    this.refs.fieldPhone.value = "";
    this.refs.fieldEmail.value = "";
    this.refs.fieldPass.value = "";
  };
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
  openPreviewIMG = () => {
    this.setState({
      isOpen: true,
    });
  };
  render() {
    let {
      password,
      name,
      address,
      phone,
      image,
      email,
      gender,
      cmnn_cccc,
      score,
      ImgPrivew,
      redirect,
    } = this.state;
    if (redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <Container>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0">
              <Card className="bg-danger card-profile">
                <Row className="justify-content-center">
                  <Col
                    className="order-lg-2 d-flex justify-content-center "
                    lg="3"
                  >
                    <div className="card-profile-image ">
                      <Image src={image} thumbnail />
                    </div>
                  </Col>
                </Row>
                <CardBody className="pt-0 pt-md-4">
                  <div className="text-center">
                    <h3>{name}</h3>
                    <div
                      className="h5 mt-4"
                      id="score"
                      name="score"
                      value={score}
                    >
                      Điểm thưởng: {score}
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card className="bg-danger shadow">
                <CardHeader className="bg-red border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Thông tin cá nhân</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={this.onHandleSubmitLogin}
                        size="sm"
                      >
                        Lưu Thay Đổi
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="name"
                            >
                              Tên
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={this.state.name}
                              id="name"
                              name="name"
                              placeholder="Tên"
                              type="text"
                              onChange={this.onChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="phone"
                            >
                              Số Điện Thoại
                            </label>
                            <Input
                              required
                              autofocus
                              type="text"
                              placeholder=" Số Điện Thoại"
                              name="txtPhone"
                              id="txtPhone"
                              maxlength="11"
                              minlength="10"
                              pattern="^[0-9]*$"
                              ref="fieldPhone"
                              className="form-control-alternative"
                              value={phone}
                              onChange={this.onChange}
                            />
                            <div className="invalid-feedback d-block">
              {this.state.errorPhone}
            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="gender"
                            >
                              Giới Tính
                            </label>
                            <Input
                              type="select"
                              name="gender"
                              id="gender"
                              value={gender === 1 ? "Nam" : "Nữ"}
                              onChange={this.onChange}
                            >
                              <option value="1">Nam</option>
                              <option value="0">Nữ</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="email"
                            >
                              Email
                            </label>
                            <Input
                              className="form-control-alternative"
                              required
                              autofocus
                              type="email"
                              placeholder=" Email"
                              name="txtEmail"
                              id="txtEmail"
                              ref="fieldEmail"
                              onChange={this.onChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="cmnn_cccc"
                            >
                              Mật Khẩu
                            </label>
                            <Input
                              required
                              autofocus
                              type="password"
                              name="txtPassword"
                              id="txtPassword"
                              pattern=".{6,}"
                              ref="fieldPass"
                              className="form-control-alternative"
                              value={password}
                              placeholder="Mật Khẩu"
                              onChange={this.onChange}
                            />
                          </FormGroup>
                        </Col>

                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="address"
                            >
                              Địa Chỉ
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={address}
                              id="address"
                              name="address"
                              placeholder="Địa chỉ"
                              type="text"
                              onChange={this.onChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <hr className="my-4" />
                      <Row>
                        <Col sm="2" className="d-flex justify-content-center">
                          <FormGroup>
                            <label
                              className="border border-dark"
                              style={{
                                backgroundColor: "reds",
                                padding: "10px",
                                marginTop: "100px",
                                cursor: "pointer",
                              }}
                              htmlFor="txtImage"
                            >
                              <FontAwesomeIcon
                                icon={faUpload}
                                className="mr-2 fa-3x"
                              />
                              Tải Ảnh
                            </label>
                            <Input
                              type="file"
                              id="txtImage"
                              name="txtImage"
                              hidden
                              onChange={(e) => {
                                this.onChangeImage(e);
                              }}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="6" className="d-flex justify-content-center">
                          <div
                            style={{
                              backgroundImage: `url(${ImgPrivew})`,
                              height: "200px",
                              width: "300px",
                              align: "center",
                              background: "center center no-repeat",
                              backgroundSize: "contain",
                              cursor: "pointer",
                              margin: "30px",
                            }}
                            onClick={() => this.openPreviewIMG()}
                          ></div>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
var mapStateToProps = (state) => {
  return {
    customer: state.customer,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onUpdateItemCustomer: (customer) => {
      return dispatch(actions.onUpdateCustomersClientResquest(customer));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
