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
import * as actionsProductInfo from "./../../../actions/product_infoActions";
import * as actionsImport from "./../../../actions/importActions";
import * as actionsImportInfo from "./../../../actions/importInfoActions";
import { toast } from 'react-toastify';
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
            txtQuantity: "",
            txtDateImport: "",
            id_product_info: "",
            billArr: [],
            productInfoArr: [],
        };

    }
    componentDidMount() {
        var { match } = this.props;

        this.props.onEditItemExchange(match.params.id_category);
        isLoadingExternally = true;
        this.setState({
            // productInfoArr: this.props.fetchProductsInfo(this.state.id_bill_info),
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
        if (prevProps.productInfo !== this.props.productInfo) {
            let arrProductInfo = this.props.productInfo;
            this.setState({
                productInfoArr: arrProductInfo,
                id_product_info: arrProductInfo && arrProductInfo.length > 0 ? arrProductInfo[0].id : ''
            })
        }
    }
    componentWillReceiveProps(NextProps) {
        var { match } = this.props;
        if (NextProps && NextProps.exchange) {
            var { exchange } = NextProps;
            if (match.params.id_exchange) {
                
                this.setState({
                    idItem: exchange.id,
                    txtName: exchange.name,
                    id_sector: exchange.id_sector,
                });
            }
        }
    }
    onChange = (e, id) => {
        let coppyState = { ...this.state };
        coppyState[id] = e.target.value;
        this.setState({
            ...coppyState,
            productInfoArr: this.props.fetchProductsInfo(this.state.id_bill_info),
        }, () => {
            console.log(this.state)
        })

    };
    checkValidate = () => {
        let check = ['txtReason', 'txtDateImport', 'txtQuantity'];
        let isValid = true;

        for (let i = 0; i <= check.length; i++) {
            if (!this.state[check[0]]) {
                isValid = false;
                toast.error("Vui lòng nhập và chọn đủ các thông tin !");
                break;
            }
        }
        return isValid;
    }
    onSubmitForm = (event) => {
        var { billInfo } = this.props;
        let isValid = this.checkValidate();
        var { match } = this.props;
        if (isValid === false) return;
        event.preventDefault();
        var { history } = this.props;
        var { id_bill_info, txtReason, txtDateImport, txtQuantity,id_product_info } = this.state;

        var exchange = {
            id: uniqid("exchange-"),
            id_bill_info: id_bill_info,
            id_staff_change: sessionUser.id_user,
            reason: txtReason,
        };
        var importProduct = {
            id: uniqid("import-change-"),
            date_import: txtDateImport,
        };
        var importInfoProduct = {
            id: uniqid("import-change-"),
            id_import: importProduct.id,
            quantity: txtQuantity,
            id_product_info :id_product_info
        };
        var billInfo={
            id_product_info :id_product_info,
            quantity: txtQuantity,
        }
        this.props.onAddItemExchange(exchange);
        this.props.onAddItemImport(importProduct);
        this.props.onAddItemImportInfo(importInfoProduct);
        this.props.onUpdateItemBillInfo(billInfo);
        history.goBack();
    };
    render() {
        var { billInfo } = this.props;
        var { productInfo } = this.props;
        var data = productInfo.map((item, index) => {
            return item;
        })
        console.log("data", data);
        let { txtReason, txtDateImport, txtQuantity, id_product_info } = this.state;
        return (
            <Container fluid>
                <Link to="/admin/system/order/exchange">
                    <Button type="button" className="btn btn-primary" size="sm">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />Trở về
                    </Button>
                </Link>
                <Row>
                    <Form action="" method="post" onSubmit={this.onSubmitForm}>
                        <Row sm="12">
                            <Form.Group className="mb-3">
                                <Form.Label>Hóa Đơn</Form.Label>
                                <Form.Select name="form-field-name"
                                    value={this.setState.id_bill_info}
                                    onChange={(e) => { this.onChange(e, 'id_bill_info') }}
                                    labelKey={'Tên'}
                                    valueKey={'Mã'}
                                    isLoading={isLoadingExternally}
                                    options={this.setState.id_bill_info}
                                >
                                    <option value="order-1">Chọn</option>
                                    {billInfo && billInfo.length > 0 &&
                                        billInfo.map((option, index) => (

                                            <option value={option.id} key={index}>Tên khách hàng: {option.name} | Tên sản phẩm: {option.nameProduct} | Số lượng: {option.quantity} | Giá: {option.into_money}</option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row sm="12">
                            <Col sm="2">
                                <Form.Group className="mb-3">
                                    <Form.Label>Chọn Ngày Đổi</Form.Label>
                                    <Form.Control
                                        required
                                        type="date"
                                        placeholder="Nhập tên đối tượng cần thêm..."
                                        name="txtDateImport"
                                        id="txtDateImport"
                                        value={txtDateImport}
                                        onChange={(e) => { this.onChange(e, 'txtDateImport') }} />
                                    <Form.Control.Feedback
                                        type="invalid" >
                                        Vui lòng chọn ngày nhập !
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col sm="2">
                                <Form.Group >
                                    <Form.Label htmlFor="exampleFormControlTextarea1">Số Lượng</Form.Label>
                                    <Form.Control
                                        type="number"
                                        id="txtQuantity"
                                        name="txtQuantity"
                                        placeholder="Số Lượng..."
                                        value={txtQuantity}
                                        onChange={(e) => { this.onChange(e, 'txtQuantity') }}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm="8">
                                <Form.Group className="mb-3" >
                                    <Form.Label>Chi Tiết Sản Phẩm</Form.Label>
                                    <Form.Select name="form-field-name"
                                        value={id_product_info}
                                        onChange={(e) => { this.onChange(e, 'id_product_info') }}
                                        labelKey={'Tên'}
                                        valueKey={'Mã'}
                                        isLoading={isLoadingExternally}
                                    >
                                        <option value="order-1">Chọn</option>
                                        {productInfo && productInfo.length > 0 &&
                                            productInfo.map((option, index) => (
                                                <option selected={option.id} value={option.id} key={index}>Tên: {option.nameProduct} | Màu: {option.nameColor} | Kích Cỡ: {option.nameSize} </option>
                                            ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row sm="12">
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
                        </Row>
                        <Row sm="12">
                            <Col sm="6">
                                <Button type="button"
                                    className="btn btn-danger"
                                    onClick={this.onSubmitForm}
                                >
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className="mr-2"
                                        size="lg" />Lưu
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
            </Container >
        )
    }

}
var mapStateToProps = (state) => {
    return {
        exchange: state.exchange,
        billInfo: state.billInfo,
        productInfo: state.productInfo,
    };
};
var mapDispatchToProps = (dispatch, props) => {
    return {
        onAddItemExchange: (exchange) => {
            return dispatch(actions.onAddExchangeResquest(exchange));
        },
        onAddItemImport: (exchange) => {
            return dispatch(actionsImport.onAddImportResquest(exchange));
        },
        onAddItemImportInfo: (exchange) => {
            return dispatch(actionsImportInfo.onAddImportInfoResquest(exchange));
        },
        fetchBillInfo: () => {
            return dispatch(actionsBill.fetchBillInfoExchangeResquest());
        },
        fetchProductsInfo: (id) => {
            return dispatch(actionsProductInfo.fetchProductInfoExchangeResquest(id));
        },
        onEditItemExchange: (id) => {
            return dispatch(actions.onEditExchangeResquest(id));
        },
        onUpdateItemExchange: (exchange) => {
            return dispatch(actions.onUpdateExchangeResquest(exchange));
        },
        onUpdateItemBillInfo: (exchange) => {
            return dispatch(actionsBill.onUpdateBillInfoResquest(exchange));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddCategory)