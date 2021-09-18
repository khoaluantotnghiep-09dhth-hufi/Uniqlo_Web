import React from 'react'
import {
    CBadge,
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
} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "./../../../actions/index";
import { Image } from 'react-bootstrap';
const getBadge = status => {
    switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: return 'primary'
    }
}
const fields = [
    'STT',
    { key: 'id', label: 'Mã' },
    { key: 'name', label: 'Tên' },
    { key: 'price', label: 'Giá' },
    { key: 'description', label: 'Mô Tả' },
    { key: 'like_product', label: 'Lượt Thích' },
    { key: 'dislike_product', label: 'Không Thích' },
    { key: 'nameCategory', label: 'Danh Mục' },
    { key: 'image', label: 'Ảnh' },
    { key: 'namePromotion', label: 'Khuyến Mãi' },
    { key: 'quantity', label: 'Số Lượng' },
    { key: 'nameColor', label: 'Màu' },
    { key: 'nameSize', label: 'Kích Cỡ' },
    'Thao Tác',
]

class ListProducts extends React.Component {
    componentDidMount() {
        this.props.fetchProducts();
    }
    onDeleteProduct = (id) => {
        this.props.onDeleteItemProduct(id);
    };
    render() {
        var { products } = this.props;
        var data = products.map((item, index) => {

            return item;
        });
        return (
            <>
                {/* <Route to="/admin/system/discount/add"><CButton className="btn btn-danger" >Thêm Khuyến Mãi Mới</CButton></Route> */}
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
                                    itemsPerPage={8}
                                    pagination
                                    scopedSlots={{
                                        'status':
                                            (item) => (
                                                <td>
                                                    <CBadge color={getBadge(item.status)}>
                                                        {item.status}
                                                    </CBadge>
                                                </td>
                                            )

                                    }}
                                    scopedSlots={{
                                        'Thao Tác':
                                            (item) => (
                                                <td>
                                                    <Link to="/admin/manage/product/../edit">
                                                        <CButton type="button" className="btn btn-primary">
                                                            <FontAwesomeIcon icon={faTools} className="mr-2" size="lg" />Sửa
                                                        </CButton>
                                                    </Link>
                                                    <Link to="/admin/manage/product/../delete">
                                                        <CButton type="button" className="btn btn-warning">
                                                            <FontAwesomeIcon icon={faTimes} className="mr-2" size="lg" />Xóa
                                                        </CButton>
                                                    </Link>

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
                                                    <Image src={item.image} thumbnail />
                                                </td>
                                            )
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
