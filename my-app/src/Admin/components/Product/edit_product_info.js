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
import { Button, Form, Col, Container, Row, Image } from 'react-bootstrap';
import * as actions from "./../../../actions/index";
import * as actionsProduct from "./../../../actions/productAdminActions";
import * as actionsProductInfo from "./../../../actions/product_infoActions";
import { connect } from "react-redux";
import uniqid from 'uniqid';
const fields = [
    'STT',
    { key: 'id', label: 'Mã' },
    { key: 'name', label: 'Tên' },
    { key: 'nameColor', label: 'Màu' },
    { key: 'nameSize', label: 'Kích Cỡ' },
    { key: 'quantity', label: 'Số Lượng' },
    { key: 'image', label: 'Ảnh' },
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
            idItem: "",
            txtQuantity: "",
            id_size: "",
            id_color: "",
            sizeArr: [],
            colorArr: [],
        };
    }
    componentDidMount() {
        var { match } = this.props;

        this.props.onEditItemProductInfo(match.params.id_product_info);

        isLoadingExternally = true;
        this.setState({
            sizeArr: this.props.fetchSizes(),
            colorArr: this.props.fetchColors(),
        })
        var { productInfo } = this.props;
        if (match.params.id_product_info) {
            const result = productInfo.find(
                (o) => o.id === match.params.id_product_info
            );
            console.log("result nè", result);
            this.setState({
                txtQuantity: result.quantity,
                id_size: result.id_size,
                id_color: result.id_color,
            });
        }
    }
    componentWillReceiveProps(NextProps) {
        var { match } = this.props;
        if (NextProps && NextProps.productInfo) {
            var { productInfo } = NextProps;
            if (match.params.id_product_info) {
                const result = productInfo.find((o) => o.id === match.params.id_product_info);
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
        }, () => {

        })


    }

    checkValidate = () => {
        let check = ['txtQuantity'];
        let isValid = true;
        for (let i = 0; i <= check.length; i++) {
            if (!this.state[check[0]]) {
                isValid = false;
                alert("Vui lòng nhập: Số Lượng");
                break;
            }
        }

        return isValid;
    }
    onSubmitForm = (event) => {
        let isValid = this.checkValidate();
        if (isValid === false) return;
        event.preventDefault();
        var { match } = this.props;
        var { history } = this.props;
        var { idItem, txtQuantity, id_size, id_color } = this.state;
        var updatepropductinfo = {
            idItem: match.params.id_product_info,
            id_size: id_size,
            id_color: id_color,
            quantity: txtQuantity
        };
        this.props.onUpdateItemProductInfo(updatepropductinfo);
        history.push('/admin/manage/products');
    };
    render() {
        var { size } = this.props;
        var { color } = this.props;
        var { productInfo } = this.props;
        let { txtQuantity } = this.state;
        console.log(this.state);
        return (
            <Container fluid>
                <Link to="/admin/manage/products">
                    <Button type="button" className="btn btn-primary" size="sm">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />
                        Trở về
                    </Button>
                </Link>
                <CRow>
                    <Col sm="12">
                        <Form action="" method="post" onSubmit={() => this.onSubmitForm()}>
                            <Row sm="12">
                                <Col sm="2">
                                    <Form.Group className="mb-3" controlId="formBasicObject">
                                        <Form.Label>Kích Cỡ</Form.Label>
                                        <Form.Select name="form-field-name"
                                            value={this.state.id_size}
                                            onChange={(e) => { this.onChange(e, 'id_size') }}
                                            labelKey={'Tên'}
                                            valueKey={'Mã'}
                                            isLoading={isLoadingExternally}

                                        >
                                            {size && size.length > 0 &&
                                                size.map((option, index) => (
                                                    <option value={option.id} key={index}>{option.name}</option>
                                                ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col sm="2">
                                    <Form.Group className="mb-3" controlId="formBasicObject">
                                        <Form.Label>Màu</Form.Label>
                                        <Form.Select name="form-field-name"
                                            value={this.state.id_color}
                                            onChange={(e) => { this.onChange(e, 'id_color') }}
                                            labelKey={'Tên'}
                                            valueKey={'Mã'}
                                            isLoading={isLoadingExternally}
                                        >
                                            {color && color.length > 0 &&
                                                color.map((option, index) => (
                                                    <option value={option.id} key={index}>{option.name}</option>
                                                ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col sm="4">
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
                                        <Form.Control.Feedback
                                            type="invalid" >
                                            Vui lòng nhập tên cần thêm !
                                        </Form.Control.Feedback>

                                    </Form.Group>
                                </Col>
                                <Col sm="10">
                                    <Form.Group className="d-flex justify-content-center">

                                        <Button type="button" className="btn btn-danger"
                                            onClick={this.onSubmitForm}
                                        > <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg"
                                            />Lưu</Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Col>

                </CRow>

            </Container>
        )
    }
}
var mapStateToProps = (state) => {
    return {
        size: state.size,
        color: state.color,
        productInfo: state.productInfo,
    };
};
var mapDispatchToProps = (dispatch, props) => {
    return {
        onAddItemProductInfo: (productInfo) => {
            return dispatch(actionsProductInfo.onAddProductInfoResquest(productInfo));
        },
        fetchSizes: () => {
            return dispatch(actions.fetchSizeResquest());
        },
        fetchProductInfo: (id) => {
            return dispatch(actionsProductInfo.fetchProductInfoResquest(id));
        },
        fetchColors: () => {
            return dispatch(actions.fetchColorResquest());
        },
        onEditItemProductInfo: (id) => {
            return dispatch(actionsProductInfo.onEditProductInfoResquest(id));
        },
        onUpdateItemProductInfo: (productInfo) => {
            return dispatch(actionsProductInfo.onUpdateProductInfoResquest(productInfo));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(addProduct)