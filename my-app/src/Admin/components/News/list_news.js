import React, { useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CCollapse,
} from '@coreui/react';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faTimes,
    faTools,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import * as actions from "./../../../actions/index";
import { Image } from 'react-bootstrap';

const fields =
    ["STT",
        { key: "id", label: "Mã Tin Tức" },
        { key: "title", label: "Tiêu Đề" },
        { key: "date", label: "Ngày Đăng" },
        { key: "desciption", label: "Nội Dung" },
        { key: "name", label: "Nhân Viên" },
        { key: "image", label: "Ảnh" },
        { key: "image_banner", label: "Ảnh Banner" },
        "Thao Tác",
    ]
class ListNews extends React.Component {
    componentDidMount() {
        this.props.fetchNews();

    }
    onDeleteNews = (item) => {
        if (window.confirm("Bạn có chắc muốn xóa không ?")) {
            this.props.onDeleteItemNews(item);
        }
    };

    render() {

        var { news } = this.props;
        var data = news.map((item, index) => {
           return {...item, index};
        });
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
                                Danh Sách Tin Tức
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    items={data}
                                    fields={fields}
                                    itemsPerPage={8}
                                    pagination
                                    scopedSlots={{
                                        "Thao Tác":
                                            (item) => (
                                                <td>
                                                    <Link to={`/admin/system/news/${item.id}/edit`}>
                                                        <CButton type="button" className="btn btn-primary">
                                                            <FontAwesomeIcon icon={faTools} className="mr-2" size="lg" />Sửa
                                                        </CButton>
                                                    </Link>
                                                    <CButton type="button"
                                                        className="btn btn-warning"
                                                        onClick={() => { this.onDeleteNews(item.id) }}
                                                    >
                                                        <FontAwesomeIcon icon={faTimes} className="mr-2" size="lg" />Xóa
                                                    </CButton>

                                                </td>
                                            ),
                                        "STT":
                                            (item, index) => (
                                                <td>
                                                    {index + 1}
                                                </td>
                                            ),
                                        "image":
                                            (item, index) => (
                                                <td>
                                                    <Image src={item.image} thumbnail />
                                                </td>
                                            ),
                                            "image_banner":
                                            (item, index) => (
                                                <td>
                                                    <Image src={item.image_banner} thumbnail />
                                                </td>
                                            ),
                                        "desciption":
                                            (item, index) => (
                                                <td>
                                                    <textarea
                                                        className="form-control"
                                                        rows="6"
                                                        value={item.desciption}
                                                    />


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
        news: state.news,
    };
};
var mapDispatchToProps = (dispatch, props) => {
    return {
        fetchNews: () => {
            return dispatch(actions.fetchNewsResquest());
        },
        onDeleteItemNews: (id) => {
            return dispatch(actions.onDeleteNewsResquest(id))
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListNews);
