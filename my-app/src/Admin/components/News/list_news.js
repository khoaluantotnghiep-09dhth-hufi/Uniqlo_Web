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
const fields = ['STT',
 { key: 'id', label: 'Mã' } , 
 { key: 'title', label: 'Tiêu Đề' }, 
 { key: 'date', label: 'Ngày Đăng' }, 
 { key: 'description', label: 'Nội Dung' } , 
 { key: 'id_staff', label: 'Nhân Viên' }, 
 { key: 'image', label: 'Ảnh' }, 
 { key: 'sub_title', label: '??' }, 
 'Thao Tác']

class ListSectors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: []
        };
    }
    componentDidMount() {
        CallAPI('news', 'GET', null).then(res => {
            this.setState({ 
               news : res.data 
            });
        });
    }
    onDelete = (id) => {
        var { news } = this.state;
        if (window.confirm('Bạn có chắc muốn xóa không ?')) {
            CallAPI(`news/${id}`, 'DELETE', null).then(res => {
                if (res.status === 200) {
                    var index = this.findIndex(news, id);
                    if (index !== 1) {
                        news.splice(index, 1);
                        this.setState({ news: news });
                    }
                }
            });
        }
    }
    findIndex = (news, id) => {
        var rss = -1;
        news.forEach((news, index) => {
            if (news.id === id) {
                rss = index;
            }
        });
        return rss;
    }
    render() {
        var { news } = this.state;
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
                                Danh Sách Loại Sản Phẩm
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    items={news}
                                    fields={fields}
                                    itemsPerPage={8}
                                    pagination
                                    scopedSlots={{
                                        'Thao Tác':
                                            (item) => (
                                                <td>
                                                    <Link to={`/admin/manage/news/${item.id}/edit`}>
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

export default ListSectors
