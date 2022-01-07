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
    faFileExcel
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import * as actions from "./../../../actions/index";
import { Image } from 'react-bootstrap';
import { CSVLink } from "react-csv";
import Moment from "react-moment";
const headers = [
    { label: "Mã", key: "id" },
    { key: "title", label: "Tiêu Đề" },
    { key: "date", label: "Ngày Đăng" },
    { key: "descriptionText", label: "Nội Dung" },
    { key: "name", label: "Nhân Viên Đăng" },
];
const fields =
    ["STT",
        { key: "title", label: "Tiêu Đề" },
        { key: "date", label: "Ngày Đăng" },
        { key: "descriptionText", label: "Nội Dung" },
        { key: "name", label: "Nhân Viên" },
        { key: "image", label: "Ảnh" },
        "Thao Tác",
    ]
class ListNews extends React.Component {

    componentDidMount() {
        // var { news } = this.props;
        this.props.fetchNews();
        // this.setState({
        //     data: news
        // })

    }
    onDeleteNews = (item) => {
        if (window.confirm("Bạn có chắc muốn xóa không ?")) {
            this.props.onDeleteItemNews(item);
        }
    };

    render() {
        var { news } = this.props;
        console.log("News :" + news)
        // debugger
        // Sai Duong Dan Route
        var dataNews = news.map((item, index) => {
            return { ...item, index };

        });
        // const propertyValues = Object.values(news);
        return (
            <>
                <Link to="/admin/manage/news/add">
                    <CButton type="button" className="btn btn-danger">
                        <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />Thêm Mới
                    </CButton>
                </Link>
                <CSVLink
                    className="btn btn-success"
                    data={news} headers={headers}>
                    <FontAwesomeIcon icon={faFileExcel} className="mr-2" size="lg" />
                    Xuất Excel
                </CSVLink>
                <CRow>
                    <CCol xs="12" lg="24">
                        <CCard>
                            <CCardHeader>
                                Danh Sách Tin Tức
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    items={news}
                                    fields={fields}
                                    itemsPerPage={5}
                                    sorter
                                    pagination
                                    scopedSlots={{
                                        "Thao Tác":
                                            (item) => (
                                                <td>
                                                    <Link to={`/admin/manage/news/${item.id}/edit`}>
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
                                            ), "date": (item) => (
                                                <td>
                                                    <Moment format="DD/MM/YYYY">
                                                        {item.date}
                                                    </Moment>
                                                </td>
                                            ),
                                        // "description":
                                        //     (item, index) => (
                                        //         <td>
                                        //             <textarea
                                        //                 className="form-control"
                                        //                 rows="6"
                                        //                 value={item.description}
                                        //             />


                                        //         </td>
                                        //     ),
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
