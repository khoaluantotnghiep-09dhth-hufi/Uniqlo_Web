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
import { toast } from 'react-toastify';
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
    {
        key: 'name',
        label: 'Tên',
        _style: { width: '15%' },
    },
    { key: 'nameColor', label: 'Màu', _style: { width: '1%' }, },
    { key: 'nameSize', label: 'Kích Cỡ', _style: { width: '1%' }, },
    { key: 'quantity', label: 'Số Lượng', _style: { width: '1%' }, },
    {
        key: 'image',
        label: 'Ảnh',
        filter: false
    },
    {
        key: 'Thao Tác',
        label: 'Thao Tác',
        _style: { width: '25%' },
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
            id_size: "",
            id_color: "",
            sizeArr: [],
            colorArr: [],
        };
    }
    componentDidMount() {
        var { match } = this.props;

        this.props.onEditItemProductInfo(match.params.id_product);
        this.props.fetchProductInfo(match.params.id_product);
        isLoadingExternally = true;
        this.setState({
            sizeArr: this.props.fetchSizes(),
            colorArr: this.props.fetchColors(),
        })

    }
    onDeleteProductInfo = (item) => {
        if (window.confirm("Bạn có chắc muốn xóa không ?")) {
            this.props.onDeleteItemProductInfo(item);
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        var { match } = this.props;
        if (prevProps.size !== this.props.size) {
            let arrSize = this.props.size;
            this.setState({
                sizeArr: arrSize,
                id_size: arrSize && arrSize.length > 0 ? arrSize[0].id : ''
            })
        }
        if (prevProps.color !== this.props.color) {
            let arrColor = this.props.color;
            this.setState({
                colorArr: arrColor,
                id_color: arrColor && arrColor.length > 0 ? arrColor[0].id : ''
            })
        }
    }
    componentWillReceiveProps(NextProps) {
        var { match } = this.props;
        if (NextProps && NextProps.productInfo) {
            var { productInfo } = NextProps;
            if (match.params.id_product) {
                const result = productInfo.find((o) => o.id_product === match.params.id_product);
                // this.setState({
                //     txtQuantity: result.quantity,
                //     id_size: result.id_size,
                //     id_color: result.id_color,
                // });
            }
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

    checkValidate = () => {
        let check = ['txtQuantity'];
        let isValid = true;
        for (let i = 0; i <= check.length; i++) {
            if (!this.state[check[0]]) {
                isValid = false;
                toast.error("Vui lòng nhập số lượng !");
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
        var { txtQuantity, id_size, id_color } = this.state;
        var propductinfo = {
            id: uniqid("product-info-"),
            id_product: match.params.id_product,
            id_size: id_size,
            id_color: id_color,
            quantity: txtQuantity
        };
        this.props.onAddItemProductInfo(propductinfo);
        //Không quay lại khi add thông tin sản phẩm
        //history.goBack();
    };
    // onEditHandle = (item) => {

    //     var { match } = this.props;
    //     this.setState({
    //         txtQuantity: item.quantity,
    //     }, () => {
    //         console.log("item", item);
    //     })
    //     var updateProductInfo = {
    //         id: item.id,
    //         id_product: match.params.id_product,
    //         id_color: this.state.id_color,
    //         id_size: this.state.id_size,
    //     }
    //     console.log("update",updateProductInfo)
    //     // this.props.onUpdateItemProduct();

    // }
    render() {
        var { size } = this.props;
        var { color } = this.props;
        var { productInfo } = this.props;
        var dataProductInfo = productInfo.map((item, index) => {
            return item;
        })
        var { match } = this.props;
        let { txtQuantity } = this.state;
        if (match.params.status === "0") {
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
                    <CRow>
                        <CCol xs="12" lg="24">
                            <CCard>
                                <CCardHeader>
                                    Danh Sách Chi Tiết Sản Phẩm
                                </CCardHeader>
                                <CCardBody>
                                    <CDataTable
                                        items={dataProductInfo}
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
                                                        <Link to={`/admin/manage/product-info/${item.id}/edit`}>
                                                            <CButton type="button" className="btn btn-primary"
                                                            >
                                                                <FontAwesomeIcon icon={faTools} className="mr-2" size="lg" />Sửa
                                                            </CButton>
                                                        </Link>
                                                        <CButton type="button" className="btn btn-warning"
                                                            onClick={() => { this.onDeleteProductInfo(item.id) }}
                                                        >
                                                            <FontAwesomeIcon icon={faTimes} className="mr-2" size="lg" />Xóa
                                                        </CButton>
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
                                                    <td>
                                                        <Image style={{ width: "300px", height: "300px" }} src={item.image} thumbnail />
                                                    </td>
                                                ),
                                        }}
                                    />
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </Container>
            )
        }
        else {
            return (
                <Container fluid>
                    <Link to="/admin/manage/products">
                        <Button type="button" className="btn btn-primary" size="sm">
                            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />
                            Trở về
                        </Button>
                    </Link>
                    <CRow>
                        <CCol xs="12" lg="24">
                            <CCard>
                                <CCardHeader>
                                    Danh Sách Chi Tiết Sản Phẩm
                                </CCardHeader>
                                <CCardBody>
                                    <CDataTable
                                        items={dataProductInfo}
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
                                                        <Link to={`/admin/manage/product-info/${item.id}/edit`}>
                                                            <CButton type="button" className="btn btn-primary"
                                                            >
                                                                <FontAwesomeIcon icon={faTools} className="mr-2" size="lg" />Sửa
                                                            </CButton>
                                                        </Link>
                                                        <CButton type="button" className="btn btn-warning"
                                                            onClick={() => { this.onDeleteProductInfo(item.id) }}
                                                        >
                                                            <FontAwesomeIcon icon={faTimes} className="mr-2" size="lg" />Xóa
                                                        </CButton>
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
                                                    <td>
                                                        <Image style={{ width: "300px", height: "300px" }} src={item.image} thumbnail />
                                                    </td>
                                                ),
                                        }}
                                    />
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </Container>
            )
        }
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
        onDeleteItemProductInfo: (id) => {
            return dispatch(actionsProductInfo.onDeleteProductInfoResquest(id));
        },
        onUpdateItemProduct: (product) => {
            return dispatch(actionsProduct.onUpdateProductResquest(product));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(addProduct)