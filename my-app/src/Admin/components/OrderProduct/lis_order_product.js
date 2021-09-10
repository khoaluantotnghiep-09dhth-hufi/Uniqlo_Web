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

import usersData from '../User/UserData';
import CIcon from '@coreui/icons-react';
import { Route, Link } from 'react-router-dom';
const getBadge = status => {
    switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: return 'primary'
    }
}
const fields = ['Tên', 'registered', 'role', 'status', 'Hành Động']

class List_Discount extends React.Component {
    render() {
        return (
            <>
                {/* <Route to="/admin/system/discount/add"><CButton className="btn btn-danger" >Thêm Khuyến Mãi Mới</CButton></Route> */}
                <Link to="/admin/manage/order-product/add">
                    <CButton type="button" className="btn btn-danger">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg"/>Lập Đơn Đặt Hàng
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
                                    items={usersData}
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
                                        'Hành Động':
                                            (item) => (
                                                <td>
                                                <Link to="/admin/manage/staf/../edit">
                                                    <CButton type="button" className="btn btn-primary">
                                                    <FontAwesomeIcon icon={faTools} className="mr-2" size="lg"/>Sửa
                                                    </CButton>
                                                </Link>
                                                <Link to="/admin/manage/staf/../delete">
                                                    <CButton type="button" className="btn btn-warning">
                                                    <FontAwesomeIcon icon={faTimes} className="mr-2" size="lg"/>Xóa
                                                    </CButton>
                                                </Link>

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

export default List_Discount
