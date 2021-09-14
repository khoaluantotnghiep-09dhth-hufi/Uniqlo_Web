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
import { Link } from "react-router-dom";
import usersData from '../User/UserData';
import axios from "axios";
import CallAPI from "../../utils/Callapi";
// const getBadge = status => {
//     switch (status) {
//         case 'Active': return 'success'
//         case 'Inactive': return 'secondary'
//         case 'Pending': return 'warning'
//         case 'Banned': return 'danger'
//         default: return 'primary'
//     }
// }
const fields = [ { key: 'id', label: 'Mã Đối Tượng' },,  { key: 'name', label: 'Tên Đối Tượng' },, 'Hành Động']

class ListNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            objects: []
        };
    }
    componentDidMount() {
        // CallAPI('object', 'GET', null).then(res => {
        //     this.setState({
        //         objects: res.data
        //     })
        // });
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:8000/objects',
            data: null
          }).then(res => {
              this.setState({
                  objects: res.data
              })
          });
    }
    render() {
        var { objects } = this.state;
        return (
            <>
                <Link to="/admin/system/news/add">
                    <CButton type="button" className="btn btn-danger">
                        <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />Thêm Mới
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
                                    items={objects}
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
                                                            <FontAwesomeIcon icon={faTools} className="mr-2" size="lg" />Sửa
                                                        </CButton>
                                                    </Link>
                                                    <Link to="/admin/system/discount/../delete">
                                                        <CButton type="button" className="btn btn-warning">
                                                            <FontAwesomeIcon icon={faTimes} className="mr-2" size="lg" />Xóa
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

export default ListNews
