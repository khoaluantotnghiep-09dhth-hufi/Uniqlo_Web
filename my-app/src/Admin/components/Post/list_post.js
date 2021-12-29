import React from 'react'
import { connect } from "react-redux";
import * as actions from "./../../../actions/postAction";
import { Image } from 'react-bootstrap';

import {
  CBadge,
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
  faFileExcel
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
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
class ListPost extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  onDeletePost = (item) => {
    if (window.confirm('Bạn có chắc muốn xóa không ?')) {
      this.props.onDeleteItemPost(item);
    }
  };
  render() {
    var { post } = this.props;

    var dataPost = post.map((item, index) => {
      return { ...item, index };
    });
    return (
      <>
          <Link to="/admin/manage/post/add">
              <CButton type="button" className="btn btn-danger">
                  <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />Thêm Mới
              </CButton>
          </Link>
          <CSVLink
              className="btn btn-success"
              data={dataPost} headers={headers}>
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
                              items={dataPost}
                              fields={fields}
                              itemsPerPage={5}
                              sorter
                              pagination
                              scopedSlots={{
                                  "Thao Tác":
                                      (item) => (
                                          <td>
                                              <Link to={`/admin/manage/post/${item.id}/edit`}>
                                                  <CButton type="button" className="btn btn-primary">
                                                      <FontAwesomeIcon icon={faTools} className="mr-2" size="lg" />Sửa
                                                  </CButton>
                                              </Link>
                                              <CButton type="button"
                                                  className="btn btn-warning"
                                                  onClick={() => { this.onDeletePost(item.id) }}
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
    post: state.post,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    fetchPosts: () => {
      return dispatch(actions.fetchPostResquest());
    },
    onDeleteItemPost: (id) => {
      return dispatch(actions.onDeletePostResquest(id))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListPost);
