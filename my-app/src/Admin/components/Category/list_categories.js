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
import { Image } from 'react-bootstrap';
import * as actions from "./../../../actions/index";
const fields = [
    {
        key: 'STT',
        label: 'STT',
        _style: { width: '1%' },
        sorter: false,
        filter: false
    },
    {
        key: 'id',
        label: 'Mã',
        _style: { width: '15%' },
        sorter: false,
        filter: false
    },
    { key: 'name', label: 'Tên Danh Mục' },
    { key: 'nameSector', label: 'Loại' },
    { key: 'image', label: 'Ảnh' },
    {
        key: 'Thao Tác',
        label: 'Thao Tác',
        _style: { width: '25%' },
        sorter: false,
        filter: false
    },
]

class ListCategory extends React.Component {
    componentDidMount() {
        this.props.fetchCategories();
    }
    onDeleteCategory = (id) => {
        if (window.confirm("Bạn chắc chắn muốn xóa ?")) {
            this.props.onDeleteItemCategory(id);
        }
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
                                    itemsPerPage={5}
                                    sorter
                                    columnFilter
                                    itemsPerPageSelect
                                    pagination
                                    footer
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
                                            ),
                                        'image':
                                            (item, index) => (
                                                <td>
                                                    <Image style={{ width: "200px", height: "200px" }} src={item.image} thumbnail />
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
