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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as actions from "./../../../actions/index";
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import {
    faPlus,
    faUpload,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
var sessionUser = JSON.parse(sessionStorage.getItem("admin"));
var md5 = require("md5"); 
class AddAccountAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: sessionUser.name,
            id: sessionUser.id_user,
            passwordold: '',
            passwordnew: '',
            cofirmpasswordnew: '',
        }
    }
    componentDidMount(){

    }
    checkValidate = () => {
        let check = ['passwordold', 'passwordnew', 'cofirmpasswordnew'];
        let isValid = true;
        if (!this.state[check[0]]) {
            isValid = false;
            toast.error("Vui lòng nhập mật khẩu cũ");
        }
        if (!this.state[check[1]]) {
            isValid = false;
            toast.error("Vui lòng nhập mật khẩu mới");
        }
        if (!this.state[check[2]]) {
            isValid = false;
            toast.error("Vui lòng nhập lại mật khẩu mới");
        }

        return isValid;
    }
    onHandleSubmitLogin = (e) => {
        let isValid = this.checkValidate();
        if (isValid === false) return;
        e.preventDefault();
        var { history } = this.props;
        var { name, passwordold, passwordnew, cofirmpasswordnew } = this.state;
        if (sessionUser.password !== md5(passwordold)) {
            toast.error("Mật khẩu cũ sai, vui lòng thử lại !")
        }
        else if (passwordnew !== cofirmpasswordnew) {
            toast.error("Mật khẩu nhập lại không trùng khớp với mật khẩu mới, vui lòng thử lại !")
        }
        else {
            var profile = {
                id: sessionUser.id_user,
                password: cofirmpasswordnew
            }
            this.props.onUpdateItemStaff(profile);
            history.goBack();
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
    render() {
        let { name, passwordold, passwordnew, cofirmpasswordnew } = this.state;

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
                                            <h3 className="mb-0">Đổi Mật Khẩu</h3>
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
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="passwordold"
                                                >
                                                    Mật Khẩu Cũ
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="passwordold"
                                                    name="passwordold"
                                                    placeholder="Nhập mật khẩu cũ..."
                                                    type="password"
                                                    value={passwordold}
                                                    onChange={(e) => { this.onChange(e, 'passwordold') }}
                                                />
                                            </FormGroup>

                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="passwordnew"
                                                >
                                                    Mật Khẩu Mới
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    value={passwordnew}
                                                    id="passwordnew"
                                                    name="passwordnew"
                                                    placeholder="Nhập mật khẩu mới..."

                                                    type="password"
                                                    onChange={(e) => { this.onChange(e, 'passwordnew') }}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="cofirmpasswordnew"
                                                >
                                                    Mật Khẩu Mới
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    value={cofirmpasswordnew}
                                                    id="cofirmpasswordnew"
                                                    name="cofirmpasswordnew"
                                                    placeholder="Nhập lại mật khẩu mới..."

                                                    type="password"
                                                    onChange={(e) => { this.onChange(e, 'cofirmpasswordnew') }}
                                                />
                                            </FormGroup>
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
            return dispatch(actions.onUpdateStaffsPasswordResquest(staff));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddAccountAdmin)


