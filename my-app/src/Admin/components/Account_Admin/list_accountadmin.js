import React from 'react'
import {
    
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow
} from '@coreui/react'


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
const fields = ['name', 'registered', 'role', 'status']

class List_Customers extends React.Component {
    render() {
        return (
            <>

                <CRow>
                    <CCol xs="12" lg="24">
                        <CCard>
                            <CCardHeader>
                                Danh Sách Tài Khoản Admin
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
                                />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </>
        )
    }
}

export default List_Customers
