import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes, faTools, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import * as actions from "./../../../actions/index";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Image } from 'react-bootstrap';
import { CSVLink } from "react-csv";
const headers = [
  { label: "Mã", key: "id" },
  { label: "Tên Nhân Viên", key: "name" },
  { label: "Email", key: "email" },
  { label: "Số Điện Thoại", key: "phone" },
  { label: "Địa Chỉ", key: "address" },
  { label: "Chức Vụ", key: "role" },
];
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
    _style: { width: '1%' },
    sorter: false,
    filter: false
  },
  {
    key: 'name',
    label: 'Tên',
    _style: { width: '15%' },
  },
  {
    key: "email",
    label: "Gmail",
    _style: { width: '15%' }
  },
  { key: "phone", label: "SĐT", _style: { width: '8%' } },
  { key: "address", label: "Địa Chỉ", filter: false },
  { key: "image", label: "Ảnh", filter: false, sorter: false, },

  { key: "role", label: "Chức Vụ" },
  {
    key: 'Thao Tác',
    label: 'Thao Tác',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  },
];
class ListStaffs extends React.Component {
  componentDidMount() {
    this.props.fetchStaffs();
  }
  onDeleteStaff = (item) => {
    if (window.confirm('Bạn có chắc muốn xóa không ?')) {
      this.props.onDeleteItemStaff(item);
    }
  };
  render() {
    var { staff } = this.props;
    var dataStaff = staff.map((item, index) => {
      return { ...item, index };
    });
    return (
      <>
        {/* <Route to="/admin/system/discount/add"><CButton className="btn btn-danger" >Thêm Khuyến Mãi Mới</CButton></Route> */}
        <Link to="/admin/manage/staff/add">
          <CButton type="button" className="btn btn-danger">
            <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />
            Thêm Mới
          </CButton>
        </Link>
        <CSVLink
          className="btn btn-success"
          data={dataStaff} headers={headers}>
          <FontAwesomeIcon icon={faFileExcel} className="mr-2" size="lg" />
          Xuất Excel
        </CSVLink>
        <CRow>
          <CCol xs="12" lg="24">
            <CCard>
              <CCardHeader>Danh Sách Nhân Viên</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={dataStaff}
                  fields={fields}
                  itemsPerPage={5}
                  sorter
                  columnFilter
                  itemsPerPageSelect
                  pagination
                  scopedSlots={{
                    "Thao Tác": (item) => (
                      <td>
                        <Link to={`/admin/manage/staff/${item.id}/edit`}>
                          <CButton type="button" className="btn btn-primary">
                            <FontAwesomeIcon
                              icon={faTools}
                              className="mr-2"
                              size="lg"
                            />
                            Sửa
                          </CButton>
                        </Link>
                        <CButton
                          type="button"
                          className="btn btn-warning"
                          onClick={() => {
                            this.onDeleteStaff(item.id);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="mr-2"
                            size="lg"
                          />
                          Xóa
                        </CButton>
                      </td>
                    ),
                    "STT": (item, index) => (<td>{index + 1}</td>),
                    "role": (item) => (
                      <td>
                        {item.role === 0 ? "Quản Lý" : "Nhân Viên Bán Hàng"}
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
    );
  }
}
var mapStateToProps = (state) => {
  return {
    staff: state.staff,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    fetchStaffs: () => {
      return dispatch(actions.fetchStaffsResquest());
    },
    onDeleteItemStaff: (id) => {
      return dispatch(actions.onDeleteStaffsResquest(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListStaffs);
