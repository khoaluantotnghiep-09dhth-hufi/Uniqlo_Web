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
import ConvertIMG from '../../utils/getBase64';
import * as actions from "./../../../actions/index";
import { connect } from "react-redux";
import {
    faUpload,
} from "@fortawesome/free-solid-svg-icons";
var sessionUser = JSON.parse(sessionStorage.getItem("admin"));

class AddAccountAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClickEdit: false,
            name: sessionUser.name,
            phone: sessionUser.phone,
            gender: sessionUser.gender,
            image: sessionUser.image,
            address: sessionUser.address,
            email: sessionUser.email,
            place_of_birth: sessionUser.place_of_birth,
            cmnn_cccc: sessionUser.cmnn_cccc,
            ImgPrivew: sessionUser.image,
            isOpen: false,
        }
    }
    onHandleSubmitLogin = (e) => {
        e.preventDefault();
        var { history } = this.props;
        var { name, phone, gender, image, address, email, place_of_birth, cmnn_cccc, ImgPrivew } = this.state;
        var profile = {
            id: sessionUser.id_user,
            name: name,
            phone: phone,
            gender: gender,
            image: image,
            address: address,
            place_of_birth: place_of_birth,
            cmnn_cccc: cmnn_cccc,
        }
        this.props.onUpdateItemStaff(profile);
        history.goBack();
    }
    onChangeImage = (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            ConvertIMG.getBase64(file).then(res => {
                let objectURL = URL.createObjectURL(file);
           
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
          
        })
    }
    openPreviewIMG = () => {
        this.setState({
            isOpen: true
        })
    }
    render() {
        let { name, phone, gender, image, address, email, place_of_birth, cmnn_cccc, ImgPrivew } = this.state;
   
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                            <Card className="card-profile shadow">
                                <Row className="justify-content-center">
                                    <Col className="order-lg-2 d-flex justify-content-center " lg="3">
                                        <div className="card-profile-image ">
                                            <img  style={{ width: "200px", height: "200px" }}
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
                                        <div className="h5 mt-4">
                                            <i className="ni business_briefcase-24 mr-2" />
                                            {sessionUser.role === 0 ? "Quản Lý" : "Nhân Viên"}
                                        </div>
                                        <div>
                                            <i className="ni education_hat mr-2" />
                                            Trình độ học vấn chưa làm
                                        </div>
                                        <hr className="my-4" />
                                        <p>
                                            Giới thiệu chưa làm
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className="order-xl-1" xl="8">
                            <Card className="bg-secondary shadow">
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
                                                            placeholder="jesse@example.com"
                                                            type="email"
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
                                                            htmlFor="place_of_birth"
                                                        >
                                                            Nơi Sinh
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            value={place_of_birth}
                                                            id="place_of_birth"
                                                            name="place_of_birth"
                                                            placeholder="Nơi sinh..."
                                                            type="text"
                                                            onChange={(e) => { this.onChange(e, 'place_of_birth') }}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            {/* <hr className="my-4" /> */}
                                            <Row>
                                                <Col lg="6">
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
        staff: state.staff,
    };
};
var mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateItemStaff: (staff) => {
            return dispatch(actions.onUpdateStaffsProfileResquest(staff));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddAccountAdmin)


