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
import CallAPI from "../../utils/Callapi";
import { Button, Form, Col, Container, Row, FormGroup, Label, InputGroup, Modal, Alert, Table } from 'react-bootstrap';
const fields = ['STT', { key: 'id', label: 'Mã Đối Tượng' }, , { key: 'name', label: 'Tên Đối Tượng' }, , 'Thao Tác']

class ListObject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            objects: []
        };
    }
    componentDidMount() {
        CallAPI('objects', 'GET', null).then(res => {
            this.setState({
                objects: res.data
            });
        });
    }
    onDelete = (id) => {
        var { objects } = this.state;
        if (window.confirm('Bạn có chắc muốn xóa không ?')) {
            CallAPI(`objects/${id}`, 'DELETE', null).then(res => {
                if (res.status === 200) {
                    var index = this.findIndex(objects, id);
                    if (index !== 1) {
                        objects.splice(index, 1);
                        this.setState({ objects: objects });
                    }
                }
            });
        }
    }
    findIndex = (objects, id) => {
        var rss = -1;
        objects.forEach((objects, index) => {
            if (objects.id === id) {
                rss = index;
            }
        });
        return rss;
    }
    render() {
        var { objects } = this.state;
        return (
            <>
                <Link to="/admin/manage/object/add">
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
                                        'Thao Tác':
                                            (item) => (
                                                <td>
                                                    <Link to={`/admin/manage/object/${item.id}/edit`}>
                                                        <CButton type="button" className="btn btn-primary">
                                                            <FontAwesomeIcon icon={faTools} className="mr-2" size="lg" />Sửa
                                                        </CButton>
                                                    </Link>
                                                    {/* <Link to="/admin/system/discount/../delete"> */}
                                                    <CButton type="button" className="btn btn-warning" onClick={() => this.onDelete(item.id)} >
                                                        <FontAwesomeIcon icon={faTimes} className="mr-2" size="lg" />Xóa
                                                    </CButton>
                                                    {/* </Link> */}

                                                </td>
                                            ),
                                        'STT':
                                            (item, index) => (
                                                <td>
                                                    {index + 1}
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

export default ListObject
