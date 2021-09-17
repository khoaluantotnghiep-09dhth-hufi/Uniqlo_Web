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
    faInfo,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "./../../../actions/orderInfoActions";
import { Image } from 'react-bootstrap';

const getBadge = status => {
    switch (status) {
        case 1: return 'success'
        case 0: return 'warning'
        default: return 'primary'
    }
}
const fields = [
    'STT',
    { key: 'id', label: 'Mã' },
    { key: 'nameProduct', label: 'Tên Sản Phẩm' },
    { key: 'image', label: 'Ảnh' },
    { key: 'retail_price', label: 'Giá Bán' },
    { key: 'quantity', label: 'Số Lượng' },
    { key: 'nameColor', label: 'Màu' },
    { key: 'nameSize', label: 'Kích Cỡ' },
    'Thao Tác'
]

class ListOrderProducts extends React.Component {

    componentDidMount() {
        this.props.fetchOrdersInfo();
    }

    render() {
        var { orderInfo } = this.props;

        var dataOrderInfo = orderInfo.map((item, index) => {
            return { ...item, index };
        });
        return (
            <>
                <Link to="/admin/manage/order-product">
                    <CButton type="button" className="btn btn-danger">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />Trở Về
                    </CButton>
                </Link>
                <CRow>
                    <CCol xs="12" lg="24">
                        <CCard>
                            <CCardHeader>
                                Danh Sách Chi Tiết Đơn Đặt Hàng
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    items={dataOrderInfo}
                                    fields={fields}
                                    itemsPerPage={8}
                                    pagination
                                    scopedSlots={{
                                        // 'Thao Tác':
                                        //     (item) => (

                                        //         <td>
                                        //             {item.status === 0 ? <Link to="/admin/manage/staf/../edit">
                                        //                 <CButton type="button" className="btn btn-primary">
                                        //                     <FontAwesomeIcon icon={faTools} className="mr-2" size="lg" />Sửa
                                        //                 </CButton>
                                        //             </Link> : ''}

                                        //         </td>

                                        //     ),
                                        "STT":
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
        orderInfo: state.orderInfo,
    };
};
var mapDispatchToProps = (dispatch, props) => {
    return {
        fetchOrdersInfo: () => {
            return dispatch(actions.fetchOrderInfoResquest());
        },

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListOrderProducts);
