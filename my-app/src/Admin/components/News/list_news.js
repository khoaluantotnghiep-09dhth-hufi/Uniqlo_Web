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
import CIcon from '@coreui/icons-react';

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
const fields = ['Tên', 'registered', 'role', 'status', 'Hành Động']

class List_News extends React.Component {
    render() {
        return (
            <>
                <Link to="/admin/system/news/add">
                    <CButton type="button" className="btn btn-danger">
                        Thêm Mới
                    </CButton>
                </Link>
                <CRow>
                    <CCol xs="12" lg="24">
                        <CCard>
                            <CCardHeader>
                                Danh Sách Tin Tức
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
                                                            Sửa
                                                        </CButton>
                                                    </Link>
                                                    <Link to="/admin/system/discount/../delete">
                                                        <CButton type="button" className="btn btn-warning">
                                                            Xóa
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

export default List_News
