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
import * as actions from "./../../../actions/index";
import { Image } from 'react-bootstrap';

const fields = 
["STT",
    { key: "id", label: "Mã Tin Tức" },
    { key: "title", label: "Tiêu Đề" },
    { key: "date", label: "Ngày Đăng" },
    { key: "description", label: "Nội Dung" },
    { key: "nameStaff", label: "Nhân Viên" },
    { key: "image", label: "Ảnh" },
    "Thao Tác",
]

class ListNews extends React.Component {
  componentDidMount() {
      this.props.fetchNews();
  }
  onDeleteNews = (item) => {
      this.props.onDeleteItemNews(item);
  };
  render() {
      var { news } = this.props;
      var dataNews = news.map((item, index) => {
          return item;
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
                                  items={dataNews}
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
                                                  {/* <Link to="/admin/system/discount/../delete"> */}
                                                  <CButton type="button"
                                                      className="btn btn-warning"
                                                      onClick={() => { this.onDeleteNews(item.id) }}
                                                  >
                                                      <FontAwesomeIcon icon={faTimes} className="mr-2" size="lg" />Xóa
                                                  </CButton>
                                                  {/* </Link> */}

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
