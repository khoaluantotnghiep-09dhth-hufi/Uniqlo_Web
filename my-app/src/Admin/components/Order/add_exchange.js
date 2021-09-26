import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import uniqid from 'uniqid';
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import * as actions from "./../../../actions/exchangeActions";
import * as actionsBill from "./../../../actions/billInfoActions";
let isLoadingExternally = false;
var sessionUser = JSON.parse(sessionStorage.getItem("user"));
class AddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            id_bill_info: "",
            id_staff_change: "",
            txtReason: "",
            billArr: [],
        };

    }
    componentDidMount() {
        var { match } = this.props;

        this.props.onEditItemExchange(match.params.id_category);
        isLoadingExternally = true;

        this.setState({
            billArr: this.props.fetchBillInfo()
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.billInfo !== this.props.billInfo) {
            let arrBill = this.props.billInfo;
            this.setState({
                billArr: arrBill,
                id_bill_info: arrBill && arrBill.length > 0 ? arrBill[0].id : ''
            })
        }
    }
    componentWillReceiveProps(NextProps) {
        var { match } = this.props;
        if (NextProps && NextProps.category) {
            var { category } = NextProps;
            if (match.params.id_category) {
                const result = category.find((o) => o.id === match.params.id_category);
                // this.setState({
                //     idItem: result.id,
                //     txtName: result.name,
                //     id_sector: result.id_sector,
                // });
            }
        }
    }
    onChange = (e, id) => {
        let coppyState = { ...this.state };
        coppyState[id] = e.target.value;
        this.setState({
            ...coppyState
        })

    };
    checkValidate = () => {
        let check = ['txtReason'];
        let isValid = true;

        if (!this.state[check[0]]) {
            isValid = false;
            alert("Vui lòng nhập tên");

        }
        return isValid;
    }
    onSubmitForm = (event) => {
        let isValid = this.checkValidate();
        var { match } = this.props;
        if (isValid === false) return;
        event.preventDefault();
        var { history } = this.props;
        var { id_bill_info, txtReason } = this.state;

        var exchange = {
            id: uniqid("exchange-"),
            id_bill_info: id_bill_info,
            id_staff_change: sessionUser.id_user,
            reason: txtReason,
        };
        // var categoryUpdate = {
        //     id: match.params.id_category,
        //     name: txtName,
        //     id_sector: id_sector,
        // };

        // if (match.params.id_category) {
        //     this.props.onUpdateItemExchange(categoryUpdate);
        //     history.goBack();
        // } else {
        this.props.onAddItemExchange(exchange);
        history.goBack();
        // }
    };
    render() {
        var { billInfo } = this.props;
        let {txtReason} = this.state;
        return (
            <Container fluid>
                <Row>
                    <Link to="/admin/system/order/exchange">
                        <Button type="button" className="btn btn-primary" size="sm">
                            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />Trở về
                        </Button>
                    </Link>
                    <Col sm="12">
                        <Form action="" method="post" onSubmit={this.onSubmitForm}>
                            <Form.Group className="mb-3" controlId="formBasicObject">
                                <Form.Label>Hóa Đơn</Form.Label>
                                <Form.Select name="form-field-name"
                                    value={this.setState.id_bill_info}
                                    onChange={(e) => { this.onChange(e, 'id_bill_info') }}
                                    labelKey={'Tên'}
                                    valueKey={'Mã'}
                                    isLoading={isLoadingExternally}
                                    options={this.setState.id_bill_info}
                                >
                                    {billInfo && billInfo.length > 0 &&
                                        billInfo.map((option, index) => (

                                            <option value={option.id} key={index}>Tên khách hàng: {option.name} | Tên sản phẩm: {option.nameProduct} | Số lượng: {option.quantity} | Giá: {option.into_money}</option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group >
                                <Form.Label htmlFor="exampleFormControlInput1">Lý Do</Form.Label>
                                <textarea
                                    className="form-control"
                                    id="txtReason"
                                    name="txtReason"
                                    value={txtReason}
                                    placeholder="Mô tả..."
                                    onChange={(e) => { this.onChange(e, 'txtReason') }}
                                    rows="8"
                                    required
                                ></textarea>
                            </Form.Group>
                            {/* <Link to="/admin/manage/objects" > */}
                            <Button type="button"
                                className="btn btn-danger"
                                onClick={this.onSubmitForm}
                            >
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className="mr-2"
                                    size="lg" />Lưu
                            </Button>
                            {/* </Link> */}
                        </Form>
                    </Col>
                </Row>
            </Container >
        )
    }

}
var mapStateToProps = (state) => {
    return {
        exchange: state.exchange,
        billInfo: state.billInfo,
    };
};
var mapDispatchToProps = (dispatch, props) => {
    return {
        onAddItemExchange: (exchange) => {
            return dispatch(actions.onAddExchangeResquest(exchange));
        },
        fetchBillInfo: () => {
            return dispatch(actionsBill.fetchBillInfoExchangeResquest());
        },
        onEditItemExchange: (id) => {
            return dispatch(actions.onEditExchangeResquest(id));
        },
        onUpdateItemExchange: (exchange) => {
            return dispatch(actions.onUpdateExchangeResquest(exchange));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddCategory)