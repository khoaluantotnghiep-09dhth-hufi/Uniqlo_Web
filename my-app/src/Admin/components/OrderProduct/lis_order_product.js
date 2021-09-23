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
} from "@fortawesome/free-solid-svg-icons";
import usersData from '../User/UserData';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "./../../../actions/index";
import { Alert } from 'react-bootstrap'
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
    { key: 'date_order', label: 'Ngày Đặt' },
    { key: 'name_warehouse', label: 'Kho' },
    { key: 'status', label: 'Trạng Thái' },
    'Thao Tác',
    ''
]

class ListOrderProducts extends React.Component {

    componentDidMount() {
        this.props.fetchOrders();
    }
    onDeleteOrder = (item) => {
        if (window.confirm("Bạn có chắc muốn xóa không ?")) {
            this.props.onDeleteItemOrder(item);
        }

    };
    render() {
        var { order } = this.props;

        var dataOrder = order.map((item, index) => {
            return item;
        });
        return (
            <>
                <Link to="/admin/manage/order-product/add">
                    <CButton type="button" className="btn btn-danger">
                        <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />Lập Đơn Đặt Hàng
                    </CButton>
                </Link>
                <CRow>
                    <CCol xs="12" lg="24">
                        <CCard>
                            <CCardHeader>
                                Danh Sách Đơn Đặt Hàng
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    items={dataOrder}
                                    fields={fields}
                                    itemsPerPage={8}
                                    pagination
                                    scopedSlots={{
                                        'Thao Tác':
                                            (item) => (
                                                <td>
                                                    {item.status === 1 ?
                                                        <Link to={`/admin/manage/order-info/${item.id}`}>
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

                                                        :
                                                        <Link to={`/admin/manage/order-product/${item.id}/edit`}>
                                                            <CButton type="button" className="btn btn-primary">
                                                                <FontAwesomeIcon icon={faTools} className="mr-2" size="lg" />Sửa
                                                            </CButton>
                                                        </Link>
                                                        // <Link to={`/admin/manage/order-product/${item.id}/edit`}>
                                                        //     <CButton type="button" className="btn btn-warning">
                                                        //         <FontAwesomeIcon icon={faTools} className="mr-2" size="lg" />Xóa
                                                        //     </CButton>
                                                        // </Link>
                                                    }
                                                    {item.status === 0 ?
                                                        <Link to={`/admin/manage/order-info/${item.id}`}>
                                                            <CButton
                                                                type="button"
                                                                className="btn btn-danger"
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={faInfo}
                                                                    className="mr-2"
                                                                    size="lg"
                                                                />
                                                                Xem Chi Tiết Đơn và Đặt Hàng
                                                            </CButton>
                                                        </Link>
                                                        : ""
                                                    }
                                                </td>

                                            ),
                                        "STT":
                                            (item, index) => (
                                                <td>
                                                    {index + 1}
                                                </td>
                                            ),
                                        "status": (item) => (
                                            <td>
                                                <Alert variant={getBadge(item.status)}>
                                                    {item.status === 0 ? 'Chưa Giao' : 'Đã Giao'}
                                                </Alert>


                                            </td>
                                        ),
                                        '': (item) => (
                                            <td>
                                                {item.status === 0 ?
                                                    <CButton type="button" className="btn btn-warning"
                                                        onClick={() => {
                                                            this.onDeleteOrder(item.id);
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faTools} className="mr-2" size="lg" />Xóa
                                                    </CButton>
                                                    : ""
                                                }
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
        order: state.order,
    };
};
var mapDispatchToProps = (dispatch, props) => {
    return {
        fetchOrders: () => {
            return dispatch(actions.fetchOrderResquest());
        },
        onDeleteItemOrder: (id) => {
            return dispatch(actions.onDeleteOrderResquest(id));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListOrderProducts);
