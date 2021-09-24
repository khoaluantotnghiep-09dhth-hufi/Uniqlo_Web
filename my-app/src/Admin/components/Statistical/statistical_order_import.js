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
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import usersData from '../User/UserData';

const fields = ['Tên', 'registered', 'role', 'status', 'Hành Động']

class ListStatisticalOrderImport extends React.Component {
    render() {
        return (
            <>
                <Link to="/admin/manage/sector/add">
                    <CButton type="button" className="btn btn-danger">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg"/>Thêm Mới
                    </CButton>
                </Link>
                <CRow>
                    <CCol xs="12" lg="24">
                        <CCard>
                            <CCardHeader>
                                Danh Sách Đối Tượng
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    items={usersData}
                                    fields={fields}
                                    itemsPerPage={8}
                                    pagination 
                                    scopedSlots={{
                                        'Hành Động':
                                            (item) => (
                                                <td>
                                                    <Link to="/admin/system/discount/../edit">
                                                        <CButton type="button" className="btn btn-primary">
                                                        <FontAwesomeIcon icon={faTools} className="mr-2" size="lg"/>Sửa
                                                        </CButton>
                                                    </Link>
                                                    <Link to="/admin/system/discount/../delete">
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

export default ListStatisticalOrderImport
