import React from 'react';
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
import { toast } from 'react-toastify';
import { connect } from "react-redux";
import uniqid from 'uniqid';
const fields = [
    'STT',
    { key: 'id', label: 'Mã' },
    { key: 'nameProduct', label: 'Tên' },
    { key: 'nameColor', label: 'Màu' },
    { key: 'nameSize', label: 'Kích Cỡ' },
    { key: 'quantity', label: 'Số Lượng' },
    { key: 'retail_price', label: 'Giá Bán' },
    { key: 'image', label: 'Ảnh' },
    { key: 'status', label: 'status' },
    'Thao Tác',
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
            productArr: [],
        };
    }
    componentDidMount() {
        var { match } = this.props;

        this.props.onEditItemOrderInfo(match.params.id_order_info);
        isLoadingExternally = true;
        this.setState({
            productArr: this.props.fetchProductsInfo(),
        })
    }
    onDeleteOrderInfo = (item) => {
        if (window.confirm("Bạn có chắc muốn xóa không ?")) {
            this.props.onDeleteItemOrderInfo(item);
        }
    }
    componentWillReceiveProps(NextProps) {
        var { match } = this.props;
        if (NextProps && NextProps.orderInfo) {
            var { orderInfo } = NextProps;
            if (match.params.id_order_info) {
                const result = orderInfo.find((o) => o.id === match.params.id_order_info);
                this.setState({
                    txtQuantity: result.quantity,
                    id_size: result.id_size,
                    id_color: result.id_color,
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

    checkValidate = () => {
        let check = ['txtQuantity', 'txtRetal_price'];
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
        let isValid = this.checkValidate();
        if (isValid === false) return;
        event.preventDefault();
        if (this.state.txtQuantity !== 0 && this.state.txtQuantity > '0') {
            var { match } = this.props;
            var { history } = this.props;
            var { txtQuantity, id_product_info, txtRetal_price } = this.state;
            var orderInfo = {
                id: match.params.id_order_info,
                id_product_info: id_product_info,
                quantity: txtQuantity,
            };
            this.props.onUpdateItemOrderInfo(orderInfo);
            history.goBack();
        }
        else {
            toast.error("Số lượng phải lớn hơn 0");
        }

    };
    render() {
        var { productInfo } = this.props;
        var { orderInfo } = this.props;
        let { txtQuantity, id_product_info } = this.state;
        return (
            <>
                <Container fluid>
                    <CRow>
                        <Link to="/admin/manage/order-product">
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
                                            <Form.Label>Sản Phẩm</Form.Label>
                                            <Form.Select name="form-field-name"
                                                value={id_product_info}
                                                onChange={(e) => { this.onChange(e, 'id_product_info') }}
                                                labelKey={'Tên'}
                                                valueKey={'Mã'}
                                                isLoading={isLoadingExternally}
                                            >
                                                <option value="product-info-2">Chọn</option>
                                                {productInfo && productInfo.length > 0 &&
                                                    productInfo.map((option, index) => (
                                                        <option value={option.id} key={index}>Tên: {option.name}, Kích Cỡ: {option.nameSize}, Màu: {option.nameColor}</option>
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
                </Container>
            </>
        )
    }
}
var mapStateToProps = (state) => {
    return {
        productInfo: state.productInfo,
        orderInfo: state.orderInfo,
    };
};
var mapDispatchToProps = (dispatch, props) => {
    return {
        fetchProductsInfo: () => {
            return dispatch(actionsProductInfo.fetchProductInfoResquestNoID());
        },
        fetchOrderInfo: (id) => {
            return dispatch(actionsOrderInfo.fetchOrderInfoResquest(id));
        },
        onDeleteItemOrderInfo: (id) => {
            return dispatch(actionsOrderInfo.onDeleteOrderInfoResquest(id));
        },
        onEditItemOrderInfo: (id) => {
            dispatch(actionsOrderInfo.onEditOrderInfoResquest(id));
        },
        onUpdateItemOrderInfo: (order) => {
            dispatch(actionsOrderInfo.onUpdateOrderInfoResquest(order));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(addProduct)