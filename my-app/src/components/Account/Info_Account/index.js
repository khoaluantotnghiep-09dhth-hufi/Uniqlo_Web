import React from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ConvertIMG from '../../../Admin/utils/getBase64';
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
            name: sessionUser.name,
            address: sessionUser.address,
            phone: sessionUser.phone,
            image: sessionUser.image,
            email: sessionUser.email,
            gender: sessionUser.gender,
            //cmnn_cccc: sessionUser.cmnn_cccc,
            password: sessionUser.password,
            score: sessionUser.score,
            ImgPrivew: sessionUser.image,
            isOpen: false,
        }
    }
    onHandleSubmitLogin = (e) => {
        e.preventDefault();
        var { history } = this.props;
        var { name, address, phone, image, email, gender, cmnn_cccc, score, password, ImgPrivew } = this.state;
        var profile = {
            id: sessionUser.id_user,
            name: name,
            address: address,
            phone: phone,
            image: image,
            email: email,
            gender: gender,
            password: password,
            //cmnn_cccc: cmnn_cccc,
            //score: score,            
        }
        this.props.onUpdateItemCustomer(profile);
        //history.goBack();
    }
    onChangeImage = (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            ConvertIMG.getBase64(file).then(res => {
                let objectURL = URL.createObjectURL(file);
                console.log(res);
                this.setState({
                    ImgPrivew: objectURL,
                    image: res
                })
            });
        }
    }
    onChange = (e, id) => {
        let coppyState = { ...this.state };
        coppyState[id] = e.target.value;
        this.setState({
            ...coppyState
        }, () => {
            console.log(this.state);
        })
    }
    openPreviewIMG = () => {
        this.setState({
            isOpen: true
        })
    }
    render() {
        let { name, address, phone, image, email, gender, cmnn_cccc, score, ImgPrivew } = this.state;
        console.log("state load", this.state)
        return (
        <>
          <Container>
            <Row>
              <Col className="order-xl-2 mb-5 mb-xl-0">
                <Card className="bg-danger card-profile">
                    <Row className="justify-content-center">
                        <Col className="order-lg-2 d-flex justify-content-center " lg="3">
                            <div className="card-profile-image ">
                                <img  style={{ width: "200px", height: "200px", marginTop:"15px"}}
                                    alt="..."
                                    className="rounded-circle"
                                    src={sessionUser.image}
                                />
                            </div>
                        </Col>
                    </Row>
                    <CardBody className="pt-0 pt-md-4">
                        <div className="text-center">
                            <h3>
                                {name}
                            </h3>  
                            <div className="h5 mt-4" 
                                  id="score"
                                  name="score"                                                           
                                  value={score}>
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
                                                value={name}
                                                id="name"
                                                name="name"
                                                placeholder="Tên"
                                                type="text"
                                                onChange={(e) => { this.onChange(e, 'name') }}
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
                                                className="form-control-alternative"
                                                id="phone"
                                                name="phone"                                                           
                                                type="number"
                                                value={phone}
                                                onChange={(e) => { this.onChange(e, 'phone') }}
                                            />
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
                                                onChange={(e) => { this.onChange(e, 'gender') }}
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
                                                value={email}
                                                id="email"
                                                name="email"
                                                placeholder="Email..."
                                                type="email"
                                                onChange={(e) => { this.onChange(e, 'email') }}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    {/* <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="cmnn_cccc"
                                            >
                                                CMND
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                value={cmnn_cccc}
                                                id="cmnn_cccc"
                                                name="cmnn_cccc"
                                                placeholder="CCCD/CMND..."
                                                type="text"
                                                onChange={(e) => { this.onChange(e, 'cmnn_cccc') }}
                                            />
                                        </FormGroup>
                                    </Col> */}
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
                                                onChange={(e) => { this.onChange(e, 'address') }}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <hr className="my-4" />
                                <Row>
                                    <Col sm="2" className="d-flex justify-content-center">
                                        <FormGroup >
                                            <label className="border border-dark" style={{ backgroundColor: "reds", padding: "10px", marginTop: "100px", cursor: "pointer" }} htmlFor="txtImage"><FontAwesomeIcon icon={faUpload} className="mr-2 fa-3x" />Tải Ảnh</label>
                                            <Input
                                                type="file"
                                                id="txtImage"
                                                name="txtImage"
                                                hidden
                                                onChange={(e) => { this.onChangeImage(e) }}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col sm="6" className="d-flex justify-content-center">
                                        <div style={{ backgroundImage: `url(${ImgPrivew})`, height: "200px", width: "300px", align: "center", background: "center center no-repeat", backgroundSize: "contain", cursor: "pointer", margin: "30px" }}
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
      onUpdateItemCustomer: (customer) => {
            return dispatch(actions.onUpdateCustomersClientResquest(customer));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(index)


