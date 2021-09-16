import React from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton,
} from '@coreui/react';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faTimes,
    faTools,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CallAPI from "../../utils/Callapi";
import { Button, Form, Col, Container, Row, FormGroup, Label, InputGroup, Modal, Alert, Table } from 'react-bootstrap';
import * as actions from "./../../../actions/categoryActions";
const fields = ['STT',
    { key: 'id', label: 'Mã Danh Mục' },
    { key: 'name', label: 'Tên Danh Mục' },
    { key: 'nameSector', label: 'Loại' },
    'Thao Tác',
]

class ListCategory extends React.Component {
    componentDidMount() {
        this.props.fetchCategories();
    }
    onDeleteCategory = (id) => {
        this.props.onDeleteItemCategory(id);
    };
    render() {
        var { category } = this.props;
        var data = category.map((item, index) => {

            return { ...item, index };
        });
        return (
            <>
                <Link to="/admin/manage/category/add">
                    <CButton type="button" className="btn btn-danger">
                        <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />Thêm Mới
                    </CButton>
                </Link>
                <CRow>
                    <CCol xs="12" lg="24">
                        <CCard>
                            <CCardHeader>
                                Danh Sách Danh Mục
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    items={data}
                                    fields={fields}
                                    itemsPerPage={8}
                                    pagination
                                    scopedSlots={{
                                        'Thao Tác':
                                            (item) => (
                                                <td>
                                                    <Link to={`/admin/manage/category/${item.id}/edit`}>
                                                        <CButton type="button" className="btn btn-primary">
                                                            <FontAwesomeIcon icon={faTools} className="mr-2" size="lg" />Sửa
                                                        </CButton>
                                                    </Link>
                                                    {/* <Link to="/admin/system/discount/../delete"> */}
                                                    <CButton type="button"
                                                        className="btn btn-warning"
                                                        onClick={() => { this.onDeleteCategory(item.id) }}
                                                    >
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
var mapStateToProps = (state) => {
    return {
        category: state.category,
    };
};
var mapDispatchToProps = (dispatch, props) => {
    return {
        fetchCategories: () => {
            return dispatch(actions.fetchCategoryResquest());
        },
        onDeleteItemCategory: (id) => {
            return dispatch(actions.onDeleteCategoryResquest(id))
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListCategory);
