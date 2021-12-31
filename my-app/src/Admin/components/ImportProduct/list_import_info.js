import React from 'react';
import { toast } from 'react-toastify';
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CDataTable,
    CButton,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faTimes,
    faArrowLeft,
    faTools,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button, Form, Col, Container, Row, Image, Alert } from 'react-bootstrap';
import * as actionsProductInfo from "../../../actions/product_infoActions";
import * as actionsOrderInfo from "../../../actions/orderInfoActions";
import * as actionsImportInfo from "../../../actions/importInfoActions";

import { connect } from "react-redux";
import uniqid from 'uniqid';
const fields = [
    {
        key: 'STT',
        label: 'STT',
        _style: { width: '1%' },
        sorter: false,
        filter: false
    },
    {
        key: 'id',
        label: 'Mã',
        _style: { width: '1%' },
        sorter: false,
        filter: false
    },
    { key: 'name', label: 'Tên', _style: { width: '30%' }, },
    { key: 'nameColor', label: 'Màu', _style: { width: '1%' }, },
    { key: 'nameSize', label: 'Kích Cỡ', _style: { width: '8%' }, },
    { key: 'quantity', label: 'Số Lượng', _style: { width: '10%' }, },
    { key: 'image', label: 'Ảnh', filter: false, sorter: false, },
    {
        key: 'Thao Tác',
        label: 'Thao Tác',
        _style: { width: '1%' },
        sorter: false,
        filter: false
    },
]
//Thư viện img 
let isLoadingExternally = false;
const getBadge = status => {
    switch (status) {
        case 1: return 'success'
        case 0: return 'warning'
        default: return 'primary'
    }
}
class addProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            txtQuantity: "",
            id_product_info: "",
            id_order_info: "",
            productArr: [],
            orderInfoArr: [],
            quantityArr: [],
        };
    }
    componentDidMount() {
        var { match } = this.props;
        this.props.fetchImportInfo(match.params.id_import);
        isLoadingExternally = true;
        this.setState({

            orderInfoArr: this.props.fetchOrderInfoToImport(match.params.id_order),
        })
    }
    onDeleteOrderInfo = (item) => {
        if (window.confirm("Bạn có chắc muốn xóa không ?")) {
            this.props.onDeleteItemOrderInfo(item);
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.productInfo !== this.props.productInfo) {
            let arrProductInfo = this.props.productInfo;
            this.setState({
                productArr: arrProductInfo,
                id_product_info: arrProductInfo && arrProductInfo.length > 0 ? arrProductInfo[0].id : ''
            })
        }
        if (prevProps.orderInfo !== this.props.orderInfo) {
            let arrOrderInfo = this.props.orderInfo;
            this.setState({
                orderInfoArr: arrOrderInfo,
                id_order_info: arrOrderInfo && arrOrderInfo.length > 0 ? arrOrderInfo[0].id : ''
            })
        }
    }
    onChange = (e, id) => {
        let coppyState = { ...this.state };
        coppyState[id] = e.target.value;
        this.setState({
            ...coppyState,
            productArr: this.props.fetchProductsInfo(this.state.id_order_info),
        }, () => {

        })
    }
    onChangeHandle = (e) => {
        this.setState({
            id_order_info: e.target.value,
            productArr: this.props.fetchProductsInfo(this.state.id_order_info),
            id_product_info: this.state.productArr.id_product_info,
        })

    }
    checkValidate = () => {
        let check = ['txtQuantity', 'id_order_info', 'id_product_info'];
        let isValid = true;
        if (!this.state[check[0]]) {
            isValid = false;
            toast.error("Vui lòng nhập số lượng !");
        }
        if (!this.state[check[1]]) {
            isValid = false;
            toast.error("Vui lòng chọn chi tiết đơn đặt hàng !");
        }
        if (!this.state[check[2]]) {
            isValid = false;
            toast.error("Vui lòng chọn lại chi tiết đơn đặt hàng !");
        }
        return isValid;
    }
    onSubmitForm = (event) => {
        let isValid = this.checkValidate();
        if (isValid === false) return;
        event.preventDefault();
        var { match } = this.props;
        var { history } = this.props;
        var { txtQuantity, id_product_info, id_order_info } = this.state;
        var ImportInfo = {
            id: uniqid("import-info-"),
            id_order_info: id_order_info,
            id_product_info: id_product_info,
            quantity: txtQuantity,
            id_import: match.params.id_import,

        };
        this.props.onAddItemImportInfo(ImportInfo);
        history.goBack();
    };
    render() {
        var { productInfo } = this.props;
        var { orderInfo } = this.props;
        var { match } = this.props;
        var { importInfo } = this.props;
        let { txtQuantity, id_product_info, id_order_info } = this.state;
        var dataImportInfo = importInfo.map((item, index) => {
            return { ...item, index };
        })
        if (match.params.status === "1") {
            return (
                <>
                    <Container fluid>
                        <Link to="/admin/manage/import-product">
                            <Button type="button" className="btn btn-primary" size="sm">
                                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />
                                Trở về
                            </Button>
                        </Link>
                        <CRow>
                            <CCol xs="12" lg="24">
                                <CCard>
                                    <CCardHeader>
                                        Danh Sách Chi Tiết Nhập Hàng
                                    </CCardHeader>
                                    <CCardBody>
                                        <CDataTable
                                            items={dataImportInfo}
                                            fields={fields}
                                            itemsPerPage={8}
                                            pagination
                                            sorter
                                            columnFilter
                                            itemsPerPageSelect
                                            scopedSlots={{
                                                'Thao Tác':
                                                    (item) => (
                                                        <td>
                                                            {/* {item.status === 1 ?
                                                                <Alert variant={getBadge(item.status)}>
                                                                    {item.status === 0 ? 'Chưa Giao' : 'Đã Giao'}
                                                                </Alert>
    
                                                                :
                                                                <CButton type="button" className="btn btn-warning"
                                                                    onClick={() => { this.onDeleteOrderInfo(item.id) }}
                                                                >
                                                                    <FontAwesomeIcon icon={faTimes} className="mr-2" size="lg" />Xóa
                                                                </CButton>
                                                            } */}
                                                            {item.status === 0 ?
                                                                <Link to={`/admin/manage/order-info/${item.id}/edit`}>
                                                                    <CButton type="button" className="btn btn-primary">
                                                                        <FontAwesomeIcon icon={faTools} className="mr-2" size="lg" />Sửa
                                                                    </CButton>
                                                                </Link>
                                                                : ""
                                                            }

                                                            {/* <CButton type="button" className="btn btn-warning"
                                                            onClick={() => { this.onDeleteOrderInfo(item.id) }}
                                                        >
                                                            <FontAwesomeIcon icon={faTimes} className="mr-2" size="lg" />Xóa
                                                        </CButton> */}


                                                        </td>

                                                    ),
                                                'STT':
                                                    (item, index) => (
                                                        <td>
                                                            {index + 1}
                                                        </td>
                                                    ),
                                                'image':
                                                    (item, index) => (
                                                        <td xs={6} md={4}>
                                                            <Image style={{ width: "200px", height: "200px" }} src={item.image} thumbnail />
                                                        </td>
                                                    ),
                                                // "nameColor": (item) => (
                                                //     <td>
                                                //         <Alert variant={getBadge(item.nameColor)}>
                                                //             {/* {item.status === 0 ? 'Chưa Giao' : 'Đã Giao'} */}
                                                //         </Alert>


                                                //     </td>
                                                // ),
                                            }}
                                        />
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    </Container >
                </>
            )
        }
        else {
            return (
                <>
                    <Container fluid>
                        <CRow>
                            <Link to="/admin/manage/import-product">
                                <Button type="button" className="btn btn-primary" size="sm">
                                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />
                                    Trở về
                                </Button>
                            </Link>
                            <Col sm="12">
                                <Form action="" method="post" onSubmit={() => this.onSubmitForm()}>
                                    <Row sm="12">
                                        <Col sm="10">
                                            <Form.Group className="mb-3" controlId="formBasicObject">
                                                <Form.Label>Chi Tiết Đơn Đặt Hàng</Form.Label>
                                                <Form.Select name="form-field-name"
                                                    value={id_order_info}
                                                    onChange={(e) => { this.onChange(e, 'id_order_info') }}
                                                    // onChange={(e) => { this.onChangeHandle(e) }}
                                                    labelKey={'Tên'}
                                                    valueKey={'Mã'}
                                                    isLoading={isLoadingExternally}
                                                >
                                                    <option>Chọn</option>
                                                    {orderInfo && orderInfo.length > 0 &&
                                                        orderInfo.map((option, index) => (
                                                            <option value={option.id} key={index}>Tên: {option.name} | Màu: {option.nameColor} | Kích Cỡ: {option.nameSize} | Số Lượng: {option.quantity}</option>
                                                        ))}
                                                </Form.Select>
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
                                    </Row>
                                    <Row sm="12">
                                        <Col sm="12">
                                            <Form.Group className="mb-3" controlId="formBasicObject">
                                                <Form.Label>Chi Tiết Sản Phẩm</Form.Label>
                                                <Form.Select name="form-field-name"
                                                    value={id_product_info}
                                                    onChange={(e) => { this.onChange(e, 'id_product_info') }}
                                                    labelKey={'Tên'}
                                                    valueKey={'Mã'}
                                                    hidden
                                                    isLoading={isLoadingExternally}
                                                >
                                                    {productInfo && productInfo.length > 0 &&
                                                        productInfo.map((option, index) => (
                                                            <option selected={option.id} value={option.id} key={index}>Tên: {option.name} | Màu: {option.nameColor} | Kích Cỡ: {option.nameSize} | Số Lượng: {option.quantity}</option>
                                                        ))}

                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row sm="12">

                                        <Col sm="10">
                                            <Form.Group className="d-flex justify-content-center">
                                                <Button type="button" className="btn btn-danger"
                                                    onClick={this.onSubmitForm}
                                                > <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg"
                                                    />Lưu
                                                </Button>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </CRow>
                        <CRow>
                            {/* <Col sm="12">
                                <Link to="/admin/manage/order-product">
                                    <Button type="button" className="btn btn-primary" size="sm">
                                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />
                                        Trở về
                                    </Button>
                                </Link>
                            </Col> */}
                            <CCol xs="12" lg="24">
                                <CCard>
                                    <CCardHeader>
                                        Danh Sách Chi Tiết Nhập Hàng
                                    </CCardHeader>
                                    <CCardBody>
                                        <CDataTable
                                            items={dataImportInfo}
                                            fields={fields}
                                            itemsPerPage={5}
                                            pagination
                                            sorter
                                            columnFilter
                                            itemsPerPageSelect
                                            scopedSlots={{
                                                'Thao Tác':
                                                    (item) => (
                                                        <td>
                                                            {/* {item.status === 1 ?
                                                                <Alert variant={getBadge(item.status)}>
                                                                    {item.status === 0 ? 'Chưa Giao' : 'Đã Giao'}
                                                                </Alert>
    
                                                                :
                                                                <CButton type="button" className="btn btn-warning"
                                                                    onClick={() => { this.onDeleteOrderInfo(item.id) }}
                                                                >
                                                                    <FontAwesomeIcon icon={faTimes} className="mr-2" size="lg" />Xóa
                                                                </CButton>
                                                            } */}
                                                            {item.status === 0 ?
                                                                <Link to={`/admin/manage/order-info/${item.id}/edit`}>
                                                                    <CButton type="button" className="btn btn-primary">
                                                                        <FontAwesomeIcon icon={faTools} className="mr-2" size="lg" />Sửa
                                                                    </CButton>
                                                                </Link>
                                                                : ""
                                                            }

                                                            {/* <CButton type="button" className="btn btn-warning"
                                                            onClick={() => { this.onDeleteOrderInfo(item.id) }}
                                                        >
                                                            <FontAwesomeIcon icon={faTimes} className="mr-2" size="lg" />Xóa
                                                        </CButton> */}


                                                        </td>

                                                    ),
                                                'STT':
                                                    (item, index) => (
                                                        <td>
                                                            {index + 1}
                                                        </td>
                                                    ),
                                                'image':
                                                    (item, index) => (
                                                        <td xs={6} md={4}>
                                                            <Image style={{ width: "200px", height: "200px" }} src={item.image} thumbnail />
                                                        </td>
                                                    ),
                                                // "nameColor": (item) => (
                                                //     <td>
                                                //         <Alert variant={getBadge(item.nameColor)}>
                                                //             {/* {item.status === 0 ? 'Chưa Giao' : 'Đã Giao'} */}
                                                //         </Alert>


                                                //     </td>
                                                // ),
                                            }}
                                        />
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    </Container >
                </>
            )
        }

    }
}
var mapStateToProps = (state) => {
    return {
        productInfo: state.productInfo,
        orderInfo: state.orderInfo,
        importInfo: state.importInfo,
    };
};
var mapDispatchToProps = (dispatch, props) => {
    return {
        onAddItemImportInfo: (importInfo) => {
            return dispatch(actionsImportInfo.onAddImportInfoResquest(importInfo));
        },
        fetchProductsInfo: (id) => {
            return dispatch(actionsProductInfo.fetchProductInfoImportResquest(id));
        },
        fetchOrderInfoToImport: (id) => {
            return dispatch(actionsOrderInfo.fetchOrderInfoToImportResquest(id));
        },
        fetchOrderInfoQuantity: (id) => {
            return dispatch(actionsOrderInfo.fetchOrderInfoQuantity(id));
        },
        fetchImportInfo: (id) => {
            return dispatch(actionsImportInfo.fetchImportInfoResquest(id));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(addProduct)