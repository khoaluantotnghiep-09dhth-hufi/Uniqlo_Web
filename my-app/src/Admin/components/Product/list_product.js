import React from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faTimes,
    faTools,
    faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "./../../../actions/productAdminActions";
import { Image } from 'react-bootstrap';
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
    {
        key: 'price',
        label: 'Giá',
        _style: { width: '1%' },
    },
    {
        key: 'description',
        label: 'Mô Tả',
        _style: { width: '11%' },
        sorter: false,
        filter: false
    },
    {
        key: 'like_product',
        label: 'Lượt Thích',
        _style: { width: '1%' },
        filter: false
    },
    {
        key: 'dislike_product',
        label: 'Không Thích',
        _style: { width: '1%' },
        filter: false
    },
    {
        key: 'nameCategory',
        label: 'Danh Mục',
        _style: { width: '1%' },
    },
    {
        key: 'namePromotion',
        label: 'Khuyến Mãi',
        _style: { width: '1%' },
    },
    {
        key: 'image',
        label: 'Ảnh',
        filter: false
    },
    {
        key: 'Thao Tác',
        label: 'Thao Tác',
        _style: { width: '1%' },
        sorter: false,
        filter: false
    }
]
class ListProducts extends React.Component {
    componentDidMount() {
        this.props.fetchProducts();
    }
    onDeleteProduct = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa không ?")) {
            this.props.onDeleteItemProduct(id);
        }
    };
    render() {
        var { products } = this.props;
        var data = products.map((item, index) => {
            return item;
        });
        return (
            <>
                <Link to="/admin/manage/product/add">
                    <CButton type="button" className="btn btn-danger">
                        <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />Thêm Mới
                    </CButton>
                </Link>
                <CRow>
                    <CCol xs="12" lg="24">
                        <CCard>
                            <CCardHeader>
                                Danh Sách Sản Phẩm
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    items={data}
                                    fields={fields}
                                    itemsPerPage={5}
                                    pagination
                                    sorter
                                    columnFilter
                                    scopedSlots={{
                                        'Thao Tác':
                                            (item) => (
                                                <td>
                                                    <Link to={`/admin/manage/product/${item.id}/edit`}>
                                                        <CButton type="button" className="btn btn-primary">
                                                            <FontAwesomeIcon icon={faTools} className="mr-2" size="lg" />Sửa
                                                        </CButton>
                                                    </Link>
                                                    <Link to={`/admin/manage/product-info/add/${item.id}`}>
                                                        <CButton
                                                            type="button"
                                                            className="btn btn-danger"
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faInfo}
                                                                className="mr-2"
                                                                size="lg"
                                                            />
                                                            Xem Chi Tiết
                                                        </CButton>
                                                    </Link>
                                                    <CButton
                                                        type="button"
                                                        className="btn btn-warning"
                                                        onClick={() => {
                                                            this.onDeleteProduct(item.id);
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTimes}
                                                            className="mr-2"
                                                            size="lg"
                                                        />
                                                        Xóa
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
                                                    <Image style={{ width: "200px", height: "200px" }} src={item.image} thumbnail />
                                                </td>
                                            ),
                                    }}
                                />
                            </CCardBody>
                        </CCard>
                    </CCol>


                </CRow>


            </>
        )
    }
}

var mapStateToProps = (state) => {
    return {
        products: state.products,
    };
};
var mapDispatchToProps = (dispatch, props) => {
    return {
        fetchProducts: () => {
            return dispatch(actions.fetchProductResquest());
        },
        onDeleteItemProduct: (id) => {
            return dispatch(actions.onDeleteProductResquest(id))
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListProducts);
