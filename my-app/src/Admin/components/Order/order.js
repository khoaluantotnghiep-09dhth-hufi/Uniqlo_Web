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
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import usersData from '../User/UserData';

// const getBadge = status => {
//     switch (status) {
//         case 'Active': return 'success'
//         case 'Inactive': return 'secondary'
//         case 'Pending': return 'warning'
//         case 'Banned': return 'danger'
//         default: return 'primary'
//     }
// }
const fields = ['Tên', 'registered', 'role', 'Trạng Thái', 'Hành Động']

class ListOrder extends React.Component {
    render() {
        return (
            <>
                {/* <Link to="/admin/system/news/add">
                    <CButton type="button" className="btn btn-danger">
                        Thêm Mới
                    </CButton>
                </Link> */}
                <CRow>
                    <CCol xs="12" lg="24">
                        <CCard>
                            <CCardHeader>
                                Danh Sách Đơn Hàng
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
                                                    {/* <CBadge color={getBadge(item.status)}>
                                                        {item.status}
                                                    </CBadge> */}
                                                </td>
                                            )

                                    }}
                                    scopedSlots={{
                                        'Hành Động':
                                            (item) => (
                                                <td>
                                                    <Link to="/admin/system/discount/../edit">
                                                        <CButton type="button" className="btn btn-primary">
                                                            <FontAwesomeIcon icon={faCheck} className="mr-2" size="lg"/>Xác Nhận Đơn
                                                        </CButton>
                                                    </Link>
                                                    <Link to="/admin/system/discount/../delete">
                                                        <CButton type="button" className="btn btn-warning">
                                                        <FontAwesomeIcon icon={faTimes} className="mr-2" size="lg"/>Hủy Đơn
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

export default ListOrder
