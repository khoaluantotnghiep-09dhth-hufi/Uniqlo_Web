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
import UserHeader from '../../containers/UserHeader';
var sessionUser = JSON.parse(sessionStorage.getItem("user"));

export default class AddAccountAdmin extends React.Component {
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
            isOpen: false,
        }
    }
    onHandleSubmitLogin = () => {

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
        let { name, phone, gender, image, address, email, place_of_birth, cmnn_cccc } = this.state;
        console.log("state load", this.state)
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                            <Card className="card-profile shadow">
                                <Row className="justify-content-center">
                                    <Col className="order-lg-2 d-flex justify-content-center" lg="3">
                                        <div className="card-profile-image">
                                            <img style={{ width: "200px", height: "200px" }}
                                                alt="..."
                                                className="rounded-circle"
                                                src={sessionUser.image}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                {/* <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                    <div className="d-flex justify-content-between">
                                        <Button
                                            className="mr-4"
                                            color="info"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm"
                                        >
                                            Connect
                                        </Button>
                                        <Button
                                            className="float-right"
                                            color="default"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm"
                                        >
                                            Message
                                        </Button>
                                    </div>
                                </CardHeader> */}
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
                                                onClick={(e) => e.preventDefault()}
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
                                            {/* <hr className="my-4" /> */}
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
                                                            defaultValue={gender === 1 ? "Nam" : "Nữ"}
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
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="cmnn_cccc"
                                                        >
                                                            T
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            value={cmnn_cccc}
                                                            id="cmnn_cccc"
                                                            name="cmnn_cccc"
                                                            placeholder="CMND"
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
                                                            abc
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
                                        </div>
                                        {/* <hr className="my-4" />
                                        <h6 className="heading-small text-muted mb-4">
                                            Contact information
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col md="12">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-address"
                                                        >
                                                            Address
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                                            id="input-address"
                                                            placeholder="Home Address"
                                                            type="text"
                                                            onChange={this.onHandleChange}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-city"
                                                        >
                                                            City
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue="New York"
                                                            id="input-city"
                                                            placeholder="City"
                                                            type="text"
                                                            onChange={this.onHandleChange}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-country"
                                                        >
                                                            Country
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue="United States"
                                                            id="input-country"
                                                            placeholder="Country"
                                                            type="text"
                                                            onChange={this.onHandleChange}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-country"
                                                        >
                                                            Postal code
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-postal-code"
                                                            placeholder="Postal code"
                                                            type="number"
                                                            onChange={this.onHandleChange}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                        <hr className="my-4" />
                                        <h6 className="heading-small text-muted mb-4">About me</h6>
                                        <div className="pl-lg-4">
                                            <FormGroup>
                                                <label>About Me</label>
                                                <Input
                                                    className="form-control-alternative"
                                                    placeholder="A few words about you ..."
                                                    rows="4"
                                                    defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and Open Source."
                                                    type="textarea"
                                                />
                                            </FormGroup>
                                        </div> */}
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


